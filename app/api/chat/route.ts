import Anthropic from "@anthropic-ai/sdk";
import {
  awards,
  certifications,
  education,
  experience,
  profile,
  projects,
  roles,
  skills,
  spokenLanguages,
  talks,
  volunteering,
  type Lang,
} from "@/content/profile";

export const runtime = "nodejs";

const MAX_TURNS = 12;
const MAX_CHARS = 1000;

/** Everything the assistant may say about the portfolio owner, built once from content/profile.ts. */
const SYSTEM_PROMPT = `You are the assistant on the portfolio website of ${profile.name.en}. Visitors are mostly recruiters, hiring managers and potential collaborators.

Answer questions about ${profile.name.en}'s skills, projects, experience, education, certifications and availability, using only the profile below. If the profile does not say, say you don't know and suggest contacting ${profile.email}. Never invent employers, dates, numbers or links. Values in [BRACKETS] are placeholders not yet filled in: treat them as unknown.

Keep replies short: two to four sentences, plain text, no markdown headings or tables. Reply in the visitor's language (English or French). Latency-sensitive; begin your visible answer immediately.

If the visitor wants to send a job offer or propose a collaboration, tell them to click the "Job offer" or "Collaboration" button below the chat: the assistant will ask four quick questions and draft the email for them.

Politely decline requests unrelated to this portfolio.

<profile>
${JSON.stringify(
  {
    name: profile.name.en,
    email: profile.email,
    city: profile.city.en,
    links: profile.links,
    availability: profile.availability.en,
    roles: roles.map((r) => ({ role: r.label.en, pitch: r.pitch.en, facts: r.facts.map((f) => f.en), stack: r.stack.map((t) => t.en) })),
    projects: projects.map((p) => ({ title: p.title.en, category: p.category.en, summary: p.summary.en, tech: p.tech, github: p.githubUrl })),
    experience: experience.map((e) => ({ title: e.title.en, company: typeof e.company === "string" ? e.company : e.company.en, city: e.city, dates: e.dates.en, summary: e.summary.en })),
    education: education.map((d) => ({ degree: d.degree.en, school: d.school.en, dates: d.dates.en, details: d.details.en })),
    certifications: certifications.map((c) => ({ name: c.name, issuer: c.issuer, year: c.year })),
    languages: spokenLanguages.map((l) => `${l.name.en}: ${l.level.en}`),
    awards: awards.map((a) => `${a.year}: ${a.text.en}`),
    talks: talks.map((t) => t.en),
    volunteering: volunteering.map((v) => v.en),
    skills: skills.map((s) => `${s.name.en} (${s.keywords})`),
  },
  null,
  1,
)}
</profile>`;

type ChatMessage = { role: "user" | "assistant"; content: string };

function parse(body: unknown): { messages: ChatMessage[]; lang: Lang } | null {
  if (!body || typeof body !== "object") return null;
  const { messages, lang } = body as { messages?: unknown; lang?: unknown };
  if (!Array.isArray(messages) || messages.length === 0) return null;
  const clean: ChatMessage[] = [];
  for (const m of messages.slice(-MAX_TURNS)) {
    if (!m || typeof m !== "object") return null;
    const { role, content } = m as { role?: unknown; content?: unknown };
    if ((role !== "user" && role !== "assistant") || typeof content !== "string" || !content.trim()) return null;
    clean.push({ role, content: content.slice(0, MAX_CHARS) });
  }
  while (clean.length && clean[0].role !== "user") clean.shift();
  if (!clean.length || clean[clean.length - 1].role !== "user") return null;
  return { messages: clean, lang: lang === "fr" ? "fr" : "en" };
}

export async function POST(req: Request) {
  // Without a key the client falls back to its scripted answers.
  if (!process.env.ANTHROPIC_API_KEY) {
    return Response.json({ error: "assistant_unavailable" }, { status: 503 });
  }

  const input = parse(await req.json().catch(() => null));
  if (!input) return Response.json({ error: "invalid_request" }, { status: 400 });

  const client = new Anthropic();
  try {
    const response = await client.beta.messages.create({
      model: "claude-opus-5-5",
      max_tokens: 1024,
      output_config: { effort: "low" },
      betas: ["server-side-fallback-2026-07-01"],
      fallbacks: "default",
      system: [
        { type: "text", text: SYSTEM_PROMPT, cache_control: { type: "ephemeral" } },
        { type: "text", text: `The visitor's interface language is ${input.lang === "fr" ? "French" : "English"}.` },
      ],
      messages: input.messages,
    });

    if (response.stop_reason === "refusal") {
      return Response.json({ error: "refused" }, { status: 422 });
    }
    const reply = response.content
      .flatMap((block) => (block.type === "text" ? [block.text] : []))
      .join("")
      .trim();
    if (!reply) return Response.json({ error: "empty_reply" }, { status: 502 });
    return Response.json({ reply });
  } catch (err) {
    if (err instanceof Anthropic.RateLimitError) {
      return Response.json({ error: "rate_limited" }, { status: 429 });
    }
    if (err instanceof Anthropic.APIError) {
      console.error("Claude API error", err.status, err.message);
      return Response.json({ error: "upstream_error" }, { status: 502 });
    }
    throw err;
  }
}

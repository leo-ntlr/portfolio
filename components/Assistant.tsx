"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { profile, projects } from "@/content/profile";
import { useApp } from "@/lib/app-state";
import { Icon, icons } from "./Icon";

type Kind = "offer" | "collab";
type Msg =
  | { from: "me" | "bot"; text: string }
  | { from: "draft"; subject: string; body: string; mailto: string };

const STEPS = ["name", "org", "details", "email"] as const;
type Step = (typeof STEPS)[number];
type Draft = Partial<Record<Step, string>> & { kind: Kind };

const OFFER_RE = /offre|offer|job|poste|emploi|hire|hiring|recrut|stage|intern|cdi|cdd/;
const COLLAB_RE = /collab|partenariat|partner|freelance|ensemble|together/;
const PROJECTS_RE = /projet|project|portfolio|realisation|work/;
const AVAIL_RE = /dispo|avail|quand|when|start|commencer/;

const fold = (t: string) => t.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

export function Assistant() {
  const { s, tr, lang, draftRequest } = useApp();
  const c = s.chat;
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [step, setStep] = useState(0);
  const [copied, setCopied] = useState<number | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  const botSay = (items: Msg[], delay = 600) => {
    setTyping(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setTyping(false);
      setMsgs((m) => [...m, ...items]);
    }, delay);
  };

  const startDraft = (kind: Kind) => {
    setDraft({ kind });
    setStep(0);
    botSay([{ from: "bot", text: c.intro[kind] }, { from: "bot", text: c.ask.name }]);
  };

  // A section elsewhere on the page (Contact, search) asked to start a draft.
  useEffect(() => {
    if (draftRequest) startDraft(draftRequest.kind);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [draftRequest?.at]);

  const buildEmail = (d: Draft): Msg => {
    const fill = (tpl: string) =>
      tpl
        .replace(/\{owner\}/g, tr(profile.name))
        .replace(/\{name\}/g, d.name ?? "")
        .replace(/\{org\}/g, d.org ?? "")
        .replace(/\{details\}/g, d.details ?? "")
        .replace(/\{email\}/g, d.email ?? "");
    const subject = fill(c.emailSubject[d.kind]);
    const body = fill(c.emailBody[d.kind]);
    return {
      from: "draft",
      subject,
      body,
      mailto: `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
    };
  };

  const askModel = async (history: Msg[]) => {
    setTyping(true);
    const messages = history
      .filter((m): m is { from: "me" | "bot"; text: string } => m.from !== "draft")
      .slice(-12)
      .map((m) => ({ role: m.from === "me" ? "user" : "assistant", content: m.text }));
    // The API conversation must open with the visitor's message.
    while (messages.length && messages[0].role !== "user") messages.shift();
    // Scripted answers for the common questions when the AI is offline.
    const last = history[history.length - 1];
    const q = last && last.from === "me" ? fold(last.text) : "";
    let reply = c.fallback;
    if (AVAIL_RE.test(q)) reply = tr(profile.availability);
    else if (PROJECTS_RE.test(q)) reply = `${c.projectsIntro} ${projects.slice(0, 3).map((p) => tr(p.title)).join(", ")}.`;
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages, lang }),
      });
      if (res.ok) {
        const data = (await res.json()) as { reply?: string };
        if (data.reply) reply = data.reply;
      }
    } catch {}
    setTyping(false);
    setMsgs((m) => [...m, { from: "bot", text: reply }]);
  };

  const send = (raw: string) => {
    const text = raw.trim();
    if (!text || typing) return;
    const next: Msg[] = [...msgs, { from: "me", text }];
    setMsgs(next);
    setInput("");

    if (draft) {
      const d: Draft = { ...draft, [STEPS[step]]: text };
      const nextStep = step + 1;
      if (nextStep < STEPS.length) {
        const key = STEPS[nextStep] === "details" ? (`details_${d.kind}` as const) : STEPS[nextStep];
        setDraft(d);
        setStep(nextStep);
        botSay([{ from: "bot", text: c.ask[key as keyof typeof c.ask] }]);
      } else {
        setDraft(null);
        setStep(0);
        botSay([{ from: "bot", text: c.done }, buildEmail(d)]);
      }
      return;
    }

    const n = fold(text);
    if (COLLAB_RE.test(n)) return startDraft("collab");
    if (OFFER_RE.test(n)) return startDraft("offer");
    void askModel(next);
  };

  const runChip = (id: keyof typeof c.chips) => {
    if (id === "offer" || id === "collab") {
      setMsgs((m) => [...m, { from: "me", text: c.chips[id] }]);
      return startDraft(id);
    }
    if (id === "cancel") {
      setMsgs((m) => [...m, { from: "me", text: c.chips.cancel }]);
      setDraft(null);
      setStep(0);
      return botSay([{ from: "bot", text: c.cancelled }]);
    }
    send(c.chips[id]);
  };

  const reset = () => {
    if (timer.current) clearTimeout(timer.current);
    setMsgs([]);
    setTyping(false);
    setDraft(null);
    setStep(0);
    setInput("");
    setCopied(null);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    send(input);
  };

  const all: Msg[] = [{ from: "bot", text: c.greet }, ...msgs];
  const chips: (keyof typeof c.chips)[] = draft ? ["cancel"] : ["offer", "collab", "projects", "avail"];

  return (
    <section id="assistant" className="section card assistant">
      <div className="assistant-intro">
        <p className="label" style={{ margin: 0 }}>{s.nav.assistant}</p>
        <h2 className="h2" style={{ fontSize: "clamp(32px, 4vw, 42px)" }}>
          {s.assistantTitle} <span className="accent">{s.assistantTitle2}</span>
        </h2>
        <p>{s.assistantSub}</p>
        <p className="small-caps" style={{ marginTop: 8 }}>{s.capsTitle}</p>
        <ul className="caps">
          {s.caps.map((cap) => (
            <li key={cap}><Icon d={icons.check} size={18} stroke={2} />{cap}</li>
          ))}
        </ul>
      </div>

      <div className="chat">
        <div className="chat-head">
          <span className="monogram">{profile.initials}</span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontWeight: 600, fontSize: 15 }}>{c.botName} · {tr(profile.name)}</div>
            <small><span className="dot" />{typing ? c.typing : c.online}</small>
          </div>
          <button type="button" className="icon-btn" onClick={reset} aria-label={c.restart}>
            <Icon d={icons.restart} size={18} />
          </button>
        </div>

        <div className="chat-log" aria-live="polite">
          {typing && (
            <div className="typing" aria-label={c.typing}><span /><span /><span /></div>
          )}
          {all.map((m, i) => ({ m, i })).reverse().map(({ m, i }) =>
            m.from === "draft" ? (
              <div key={i} className="draft">
                <div className="draft-head"><Icon d={icons.mail} />{c.draftLabel}</div>
                <div className="draft-body">
                  <div>{c.to} <span>{profile.email}</span></div>
                  <div>{c.subject} <span style={{ fontWeight: 600 }}>{m.subject}</span></div>
                  <div className="draft-text">{m.body}</div>
                  <div className="draft-actions">
                    <a className="btn btn-solid" href={m.mailto}>{c.openMail}<Icon d={icons.arrow} size={14} stroke={2} /></a>
                    <button
                      type="button"
                      className="btn btn-ghost"
                      onClick={() => {
                        navigator.clipboard?.writeText(`${c.subject} ${m.subject}\n\n${m.body}`).catch(() => {});
                        setCopied(i);
                      }}
                    >
                      {copied === i ? c.copied : c.copy}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div key={i} className={`msg ${m.from}`}>{m.text}</div>
            ),
          )}
        </div>

        <div className="quick">
          {chips.map((id) => (
            <button key={id} type="button" onClick={() => runChip(id)}>{c.chips[id]}</button>
          ))}
        </div>

        <form className="chat-form" onSubmit={onSubmit}>
          <label htmlFor="chat-input" className="sr-only">{draft ? c.placeholderDraft : c.placeholder}</label>
          <input
            id="chat-input"
            type="text"
            autoComplete="off"
            maxLength={1000}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={draft ? c.placeholderDraft : c.placeholder}
          />
          <button type="submit" aria-label={c.send} disabled={typing || !input.trim()}>
            <Icon d={icons.arrow} stroke={2} />
          </button>
        </form>
        <p className="chat-note">{c.note}</p>
      </div>
    </section>
  );
}

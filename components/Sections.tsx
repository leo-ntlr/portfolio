"use client";

import {
  awards,
  certifications,
  education,
  experience,
  profile,
  projects,
  roles,
  spokenLanguages,
  stats,
  talks,
  volunteering,
} from "@/content/profile";
import { useApp } from "@/lib/app-state";
import { Icon, icons } from "./Icon";

/** Items tagged with the selected role first, keeping their original order otherwise. */
function byRole<T extends { roles: string[] }>(items: T[], role: string) {
  return items
    .map((item, i) => ({ item, i, match: item.roles.includes(role) }))
    .sort((a, b) => Number(b.match) - Number(a.match) || a.i - b.i);
}

export function ProfileStats() {
  const { s, tr, role } = useApp();
  const cur = roles.find((r) => r.id === role)!;
  return (
    <section className="profile-row section">
      <div className="card profile-card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12, flexWrap: "wrap" }}>
          <h2>{s.profile}</h2>
          <span className="accent" style={{ fontSize: 13, fontWeight: 600 }}>{tr(cur.label)}</span>
        </div>
        <dl className="facts">
          {cur.facts.map((fact, i) => (
            <div key={i}>
              <dt>{s.factKeys[i]}</dt>
              <dd>{tr(fact)}</dd>
            </div>
          ))}
        </dl>
        <div className="stack">
          <h3 className="small-caps">{s.stackTitle}</h3>
          <div className="chips">
            {cur.stack.map((t, i) => (
              <span key={i} className="chip">{tr(t)}</span>
            ))}
          </div>
        </div>
      </div>
      <div className="stats">
        {stats.map((st, i) => (
          <div key={i} className="card stat">
            <b>{st.value}</b>
            <span>{tr(st.label)}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Projects() {
  const { s, tr, role } = useApp();
  const cur = roles.find((r) => r.id === role)!;
  return (
    <section id="projects" className="section">
      <div className="section-head">
        <div>
          <p className="label">{s.nav.projects}</p>
          <h2 className="h2">{s.projectsTitle}</h2>
        </div>
        <p>
          {s.sortedFor} <strong style={{ color: "var(--ink)" }}>{tr(cur.label)}</strong>. {s.sortedHint}
        </p>
      </div>
      <div className="grid">
        {byRole(projects, role).map(({ item: p, i, match }) => (
          <article key={i} className={`card project lift${match ? "" : " dim"}`}>
            <div className="shot">
              {p.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={p.image} alt={tr(p.title)} />
              ) : (
                <div className="shot-placeholder">{s.screenshot}</div>
              )}
            </div>
            <div className="project-meta">
              <span className="small-caps">{tr(p.category)}</span>
              {match && <span className="badge">{s.relevant}</span>}
            </div>
            <h3>{tr(p.title)}</h3>
            <p>{tr(p.summary)}</p>
            <div className="chips">
              {p.tech.map((t, j) => (
                <span key={j} className="chip">{t}</span>
              ))}
            </div>
            <div className="card-links">
              <a className="link" href={p.caseStudyUrl}>{s.caseStudy} →</a>
              <a className="link" href={p.githubUrl} target="_blank" rel="noreferrer">GitHub</a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function ExperienceSection() {
  const { s, tr } = useApp();
  return (
    <section id="experience" className="section split">
      <div className="split-intro">
        <p className="label">{s.nav.experience}</p>
        <h2 className="h2" style={{ marginBottom: 16 }}>{s.experienceTitle}</h2>
        <p>{s.experienceSub}</p>
      </div>
      <ol className="timeline">
        {experience.map((job, i) => (
          <li key={i}>
            <span className="node" />
            <div className="mono">{tr(job.dates)}</div>
            <h3>{tr(job.title)}</h3>
            {(job.company || job.city) && (
              <div style={{ fontWeight: 500 }}>
                {[typeof job.company === "string" ? job.company : tr(job.company), job.city].filter(Boolean).join(" · ")}
              </div>
            )}
            <p>{tr(job.summary)}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function EducationSection() {
  const { s, tr, role } = useApp();
  const cur = roles.find((r) => r.id === role)!;
  return (
    <section id="education" className="section">
      <div className="section-head">
        <div>
          <p className="label">{s.nav.education}</p>
          <h2 className="h2">{s.educationTitle}</h2>
        </div>
        <p>{s.educationSub}</p>
      </div>
      <div className="edu-cols">
        <div className="edu-list">
          <h3 className="small-caps">{s.degrees}</h3>
          {education.map((d, i) => (
            <article key={i} className="card degree lift">
              <span className="degree-icon"><Icon d={icons.cap} size={22} stroke={1.6} /></span>
              <div style={{ minWidth: 0 }}>
                <div className="mono">{tr(d.dates)}</div>
                <h3>{tr(d.degree)}</h3>
                <div style={{ fontWeight: 500 }}>{tr(d.school)}</div>
                <p style={{ paddingTop: 4 }}>{tr(d.details)}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="cert-col">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12, flexWrap: "wrap" }}>
            <h3 className="small-caps">{s.certifications}</h3>
            <span style={{ fontSize: 13, color: "var(--ink2)" }}>
              {s.sortedFor} <strong style={{ color: "var(--ink)" }}>{tr(cur.label)}</strong>
            </span>
          </div>
          <div className="cert-grid">
            {byRole(certifications, role).map(({ item: c, i, match }) => (
              <article key={i} className={`card cert lift${match ? "" : " dim"}`}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                  <span className="cert-icon"><Icon d={icons.award} size={20} stroke={1.6} /></span>
                  {match && <span className="badge" style={{ fontSize: 11 }}>{s.relevant}</span>}
                </div>
                <b>{c.name}</b>
                <small>{c.issuer} · {c.year}</small>
                <a className="link accent" href={c.url} target="_blank" rel="noreferrer" style={{ marginTop: "auto", fontSize: 13, fontWeight: 500, alignSelf: "flex-start" }}>
                  {s.verify} →
                </a>
              </article>
            ))}
          </div>
        </div>
      </div>
      <div className="extras">
        <div className="card extra" style={{ flex: "1 1 300px" }}>
          <h3 className="small-caps">{s.languages}</h3>
          {spokenLanguages.map((l, i) => (
            <div key={i} className="extra-row">
              <span style={{ fontWeight: 500 }}>{tr(l.name)}</span>
              <span style={{ color: "var(--ink2)", textAlign: "right" }}>{tr(l.level)}</span>
            </div>
          ))}
        </div>
        <div className="card extra" style={{ flex: "999 1 460px" }}>
          <h3 className="small-caps">{s.awards}</h3>
          {awards.map((a, i) => (
            <div key={i} className="extra-row" style={{ justifyContent: "flex-start", gap: 16 }}>
              <span className="mono" style={{ minWidth: 48 }}>{a.year}</span>
              <span>{tr(a.text)}</span>
            </div>
          ))}
        </div>
        <div className="card extra" style={{ flex: "1 1 380px" }}>
          <h3 className="small-caps">{s.talks}</h3>
          {talks.map((t, i) => (
            <div key={i} className="extra-row" style={{ justifyContent: "flex-start" }}>
              <span>{tr(t)}</span>
            </div>
          ))}
        </div>
        <div className="card extra" style={{ flex: "1 1 380px" }}>
          <h3 className="small-caps">{s.volunteering}</h3>
          <ul className="extra-list">
            {volunteering.map((v, i) => (
              <li key={i}>{tr(v)}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  const { s, tr, requestDraft } = useApp();
  return (
    <>
      <section id="contact" className="contact">
        <p className="label" style={{ color: "rgba(255,255,255,0.8)", margin: 0 }}>{s.nav.contact}</p>
        <h2>{s.contactTitle} {s.contactTitle2}</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
          <a className="btn btn-white" href={`mailto:${profile.email}`}>
            {profile.email}
            <Icon d={icons.arrow} stroke={2} />
          </a>
          <a className="btn btn-line" href={profile.links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <a className="btn btn-line" href={profile.links.github} target="_blank" rel="noreferrer">GitHub</a>
          <a className="btn btn-line" href={profile.links.cv} download>{s.downloadCv}</a>
        </div>
        <a className="link" href="#assistant" onClick={() => requestDraft("offer")} style={{ fontSize: 15 }}>
          {s.letAssistant} →
        </a>
      </section>
      <p className="footer">© {new Date().getFullYear()} {tr(profile.name)}</p>
    </>
  );
}

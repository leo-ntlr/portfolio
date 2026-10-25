"use client";

import { profile, roles } from "@/content/profile";
import { useApp } from "@/lib/app-state";
import { Icon, icons } from "./Icon";

// Six cube faces; with more than six roles, a face shows whichever role is active on it.
const FACES = [
  { cls: "translateZ(100px)", rot: "rotateX(0deg) rotateY(0deg)" },
  { cls: "rotateY(90deg) translateZ(100px)", rot: "rotateX(0deg) rotateY(-90deg)" },
  { cls: "rotateY(180deg) translateZ(100px)", rot: "rotateX(0deg) rotateY(-180deg)" },
  { cls: "rotateY(-90deg) translateZ(100px)", rot: "rotateX(0deg) rotateY(90deg)" },
  { cls: "rotateX(90deg) translateZ(100px)", rot: "rotateX(-90deg) rotateY(0deg)" },
  { cls: "rotateX(-90deg) translateZ(100px)", rot: "rotateX(90deg) rotateY(0deg)" },
];

export function Hero() {
  const { s, tr, lang, role, setRole, nextRole } = useApp();
  const curIdx = roles.findIndex((r) => r.id === role);
  const cur = roles[curIdx];
  const curFace = curIdx % FACES.length;
  const [line1, line2] = profile.headline[lang];

  return (
    <section className="hero">
      <div className="hero-text">
        <p className="status rise">
          <span className="dot" />
          {s.open} · {tr(profile.city)}
        </p>
        <h1 className="headline">
          <span className="rise" style={{ animationDelay: "0.08s" }}>{line1}</span>
          <span className="rise accent" style={{ animationDelay: "0.17s" }}>{line2}</span>
        </h1>
        <p className="pitch rise" style={{ animationDelay: "0.25s" }}>{tr(cur.pitch)}</p>
        <div className="rise" style={{ animationDelay: "0.32s", display: "flex", flexDirection: "column", gap: 12 }}>
          <p className="small-caps">{s.viewProfileFor}</p>
          <div className="role-tabs" role="group" aria-label={s.viewProfileFor}>
            {roles.map((r) => (
              <button key={r.id} type="button" className="tab" aria-pressed={r.id === role} onClick={() => setRole(r.id)}>
                {tr(r.label)}
              </button>
            ))}
          </div>
        </div>
        <div className="hero-ctas rise" style={{ animationDelay: "0.4s" }}>
          <a className="btn btn-solid" href="#projects">
            {s.seeProjects} {tr(cur.short)}
            <Icon d={icons.arrow} stroke={2} />
          </a>
          <a className="btn btn-ghost" href={profile.links.cv} download>
            {s.downloadCv}
          </a>
        </div>
      </div>

      <div className="hero-visual rise" style={{ animationDelay: "0.2s" }}>
        <div className="portrait">
          <div className="photo">
            {profile.photo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={profile.photo} alt={`${s.photoAlt} — ${tr(profile.name)}`} />
            ) : (
              <div className="photo-placeholder">
                <Icon d={icons.person} size={96} stroke={1} />
                {s.photoPlaceholder}
              </div>
            )}
          </div>
          <div className="caption">
            <div style={{ minWidth: 0 }}>
              <strong>{tr(profile.name)}</strong>
              <small>{tr(cur.label)}</small>
            </div>
            <span className="avail">
              <span className="dot" />
              {s.available}
            </span>
          </div>
          <div className="cube-scene">
            <button type="button" className="cube-btn" onClick={nextRole} aria-label={s.cubeLabel}>
              <div className="cube-float">
                <div className="cube" style={{ transform: FACES[curFace].rot }}>
                  {FACES.map((face, fi) => {
                    const shown = fi === curFace ? cur : roles[fi];
                    return (
                      <div key={fi} className={`face${fi === curFace ? " on" : ""}`} style={{ transform: face.cls }}>
                        <Icon d={shown.icon} size={40} stroke={1.4} />
                        <span>{tr(shown.label)}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

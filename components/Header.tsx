"use client";

import { useState } from "react";
import { profile } from "@/content/profile";
import { useApp } from "@/lib/app-state";
import { Icon, icons } from "./Icon";

const SECTIONS = ["projects", "experience", "education", "assistant", "contact"] as const;

export function Header() {
  const { s, tr, lang, setLang, setPaletteOpen } = useApp();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="container header-inner">
        <a className="brand" href="#top">
          <span className="monogram">{profile.initials}</span>
          <span className="brand-name">{tr(profile.name)}</span>
        </a>
        <nav className="nav" aria-label="Main">
          <div className={`nav-links${menuOpen ? " open" : ""}`}>
            {SECTIONS.map((id) => (
              <a key={id} className="link" href={`#${id}`} onClick={() => setMenuOpen(false)}>
                {s.nav[id]}
              </a>
            ))}
          </div>
          <div className="lang-switch" role="group" aria-label={s.language}>
            {(["en", "fr"] as const).map((l) => (
              <button key={l} type="button" aria-pressed={lang === l} onClick={() => setLang(l)}>
                {l.toUpperCase()}
              </button>
            ))}
          </div>
          <button type="button" className="search-btn" onClick={() => setPaletteOpen(true)} aria-label={s.search}>
            <Icon d={icons.search} />
            <span className="search-label">{s.search}</span>
            <span className="kbd">Ctrl K</span>
          </button>
          <button
            type="button"
            className="icon-btn menu-btn"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? s.closeMenu : s.menu}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <Icon d={menuOpen ? icons.close : icons.menu} size={20} />
          </button>
        </nav>
      </div>
    </header>
  );
}

"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { projects, roles, skills, type Lang, type RoleId } from "@/content/profile";
import { useApp } from "@/lib/app-state";
import { Icon, icons } from "./Icon";

type Group = "roles" | "sections" | "projects" | "skills" | "assistant" | "langs";
interface Item {
  group: Group;
  title: string;
  keywords: string;
  run: () => void;
}

const GROUP_ICON: Record<Group, string> = {
  roles: icons.role,
  sections: icons.section,
  projects: icons.project,
  skills: icons.skill,
  assistant: icons.chat,
  langs: icons.globe,
};
const ORDER: Group[] = ["roles", "sections", "projects", "skills", "assistant", "langs"];

/** Lowercase, accent-free text so "donnees" finds "Données". */
const fold = (t: string) => t.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

/** Wraps the first match of `q` in a <mark>, comparing accent-free text. */
function highlight(title: string, q: string): ReactNode {
  if (!q) return title;
  const at = fold(title).indexOf(q);
  if (at < 0) return title;
  return (
    <>
      {title.slice(0, at)}
      <mark>{title.slice(at, at + q.length)}</mark>
      {title.slice(at + q.length)}
    </>
  );
}

export function CommandPalette() {
  const { s, tr, setLang, setRole, paletteOpen, setPaletteOpen, requestDraft } = useApp();
  const p = s.palette;
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Ctrl/Cmd+K toggles the palette from anywhere.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen(!paletteOpen);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [paletteOpen, setPaletteOpen]);

  useEffect(() => {
    if (!paletteOpen) return;
    setQuery("");
    setActive(0);
    const t = setTimeout(() => inputRef.current?.focus(), 0);
    document.body.style.overflow = "hidden";
    return () => {
      clearTimeout(t);
      document.body.style.overflow = "";
    };
  }, [paletteOpen]);

  const index = useMemo<Item[]>(() => {
    const pickRole = (id: RoleId) => () => {
      setRole(id);
      scrollTo("top");
    };
    const sections = (["projects", "experience", "education", "assistant", "contact"] as const).map((id) => ({
      group: "sections" as const,
      title: s.nav[id],
      keywords: id,
      run: () => scrollTo(id),
    }));
    const langs: Item[] = (["en", "fr"] as Lang[]).map((l) => ({
      group: "langs",
      title: l === "en" ? "English" : "Français",
      keywords: `${l} language langue`,
      run: () => setLang(l),
    }));
    return [
      ...roles.map((r) => ({
        group: "roles" as const,
        title: `${p.viewAs} ${tr(r.label)}`,
        keywords: `${r.label.en} ${r.label.fr} ${r.short.en} ${r.short.fr}`,
        run: pickRole(r.id),
      })),
      ...sections,
      ...projects.map((pr) => ({
        group: "projects" as const,
        title: tr(pr.title),
        keywords: `${pr.title.en} ${pr.title.fr} ${pr.category.en} ${pr.category.fr} ${pr.tech.join(" ")}`,
        run: () => {
          setRole(pr.roles[0]);
          scrollTo("projects");
        },
      })),
      ...skills.map((sk) => ({
        group: "skills" as const,
        title: tr(sk.name),
        keywords: `${sk.name.en} ${sk.name.fr} ${sk.keywords}`,
        run: pickRole(sk.role),
      })),
      { group: "assistant", title: s.chat.chips.offer, keywords: "offer offre job emploi email courriel", run: () => requestDraft("offer") },
      { group: "assistant", title: s.chat.chips.collab, keywords: "collab collaboration partner partenariat email", run: () => requestDraft("collab") },
      ...langs,
    ];
  }, [s, p.viewAs, tr, setRole, setLang, requestDraft]);

  const q = fold(query.trim());
  const results = useMemo(() => {
    const hits = q ? index.filter((it) => fold(`${it.title} ${it.keywords}`).includes(q)) : index.filter((it) => it.group !== "skills");
    return [...hits].sort((a, b) => ORDER.indexOf(a.group) - ORDER.indexOf(b.group)).slice(0, 30);
  }, [index, q]);

  useEffect(() => setActive(0), [q]);

  if (!paletteOpen) return null;

  const choose = (it: Item) => {
    setPaletteOpen(false);
    if (it.group === "assistant") scrollTo("assistant");
    // Let the overlay unmount before scrolling.
    setTimeout(it.run, 0);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") setPaletteOpen(false);
    else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter" && results[active]) {
      e.preventDefault();
      choose(results[active]);
    }
  };

  return (
    <div className="palette-overlay" onMouseDown={() => setPaletteOpen(false)}>
      <div className="palette" role="dialog" aria-modal="true" aria-label={s.search} onMouseDown={(e) => e.stopPropagation()} onKeyDown={onKeyDown}>
        <div className="palette-top">
          <Icon d={icons.search} size={18} />
          <input
            ref={inputRef}
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={p.placeholder}
            aria-label={p.placeholder}
            aria-activedescendant={results[active] ? `pi-${active}` : undefined}
            aria-controls="palette-list"
            role="combobox"
            aria-expanded="true"
          />
          <button type="button" className="icon-btn" onClick={() => setPaletteOpen(false)} aria-label={p.close}>
            <Icon d={icons.close} size={18} />
          </button>
        </div>
        <div className="palette-list" id="palette-list" role="listbox">
          {results.length === 0 ? (
            <div className="palette-empty">
              <p style={{ fontWeight: 600 }}>{p.noResults} “{query}”</p>
              <p style={{ color: "var(--muted)", fontSize: 14 }}>{p.tryHint}</p>
            </div>
          ) : (
            results.map((it, i) => (
              <div key={`${it.group}-${i}`}>
                {(i === 0 || results[i - 1].group !== it.group) && <div className="palette-group">{p.groups[it.group]}</div>}
                <button
                  id={`pi-${i}`}
                  type="button"
                  role="option"
                  aria-selected={i === active}
                  className={`palette-item${i === active ? " active" : ""}`}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => choose(it)}
                >
                  <Icon d={GROUP_ICON[it.group]} size={16} />
                  <span className="title">{highlight(it.title, q)}</span>
                  <span className="kind">{p.kinds[it.group]}</span>
                  <span className="go"><Icon d={icons.arrow} size={14} stroke={2} /></span>
                </button>
              </div>
            ))
          )}
        </div>
        <div className="palette-foot">
          {results.length} {results.length === 1 ? p.result : p.results} · {p.footer}
        </div>
      </div>
    </div>
  );
}

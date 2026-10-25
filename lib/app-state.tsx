"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { roles, type Lang, type RoleId, type Text } from "@/content/profile";
import { strings, type Strings } from "@/lib/strings";

interface AppState {
  lang: Lang;
  setLang: (lang: Lang) => void;
  role: RoleId;
  setRole: (role: RoleId) => void;
  nextRole: () => void;
  paletteOpen: boolean;
  setPaletteOpen: (open: boolean) => void;
  /** Lets other sections start an email draft in the assistant. */
  draftRequest: { kind: "offer" | "collab"; at: number } | null;
  requestDraft: (kind: "offer" | "collab") => void;
  s: Strings;
  tr: (text: Text) => string;
}

const Ctx = createContext<AppState | null>(null);
const LANG_KEY = "portfolio-lang";

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  const [role, setRole] = useState<RoleId>(roles[0].id);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [draftRequest, setDraftRequest] = useState<AppState["draftRequest"]>(null);

  // Saved choice first, then the visitor's browser language.
  useEffect(() => {
    let initial: Lang | null = null;
    try {
      const saved = localStorage.getItem(LANG_KEY);
      if (saved === "en" || saved === "fr") initial = saved;
    } catch {}
    if (!initial) {
      const nav = navigator.languages?.[0] || navigator.language || "en";
      initial = nav.toLowerCase().startsWith("fr") ? "fr" : "en";
    }
    setLangState(initial);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      localStorage.setItem(LANG_KEY, next);
    } catch {}
  }, []);

  const nextRole = useCallback(() => {
    setRole((cur) => roles[(roles.findIndex((r) => r.id === cur) + 1) % roles.length].id);
  }, []);

  const requestDraft = useCallback((kind: "offer" | "collab") => {
    setDraftRequest({ kind, at: Date.now() });
  }, []);

  const value = useMemo<AppState>(
    () => ({
      lang,
      setLang,
      role,
      setRole,
      nextRole,
      paletteOpen,
      setPaletteOpen,
      draftRequest,
      requestDraft,
      s: strings[lang],
      tr: (text: Text) => text[lang],
    }),
    [lang, setLang, role, nextRole, paletteOpen, draftRequest, requestDraft],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useApp(): AppState {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useApp must be used inside AppStateProvider");
  return ctx;
}

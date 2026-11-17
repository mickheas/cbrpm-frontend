import React, { createContext, useState } from "react";
import type { LucideIcon } from "lucide-react";
import { User } from "lucide-react";
import { AppShell, SubNav } from "../AppShell";
import { MeScreen } from "../MeScreen";

export interface ModTab { id: string; icon: LucideIcon; am: string; en: string; node?: React.ReactNode; screens?: { id: string; am: string; en: string; node: React.ReactNode }[] }
export const ModNav = createContext<(tab: string, screen?: string) => void>(() => {});

/** Tabs that each hold several screens; nav stays at five items or fewer. */
export const ModuleApp: React.FC<{ tabs: ModTab[] }> = ({ tabs }) => {
  const all: ModTab[] = [...tabs, { id: "me", icon: User, am: "እኔ", en: "Me", node: <MeScreen /> }];
  const [tab, setTab] = useState(all[0].id);
  const [sc, setSc] = useState<Record<string, string>>({});
  const cur = all.find((t) => t.id === tab) ?? all[0];
  const screen = cur.screens?.find((s) => s.id === sc[cur.id]) ?? cur.screens?.[0];
  const go = (t: string, s?: string) => { setTab(t); if (s) setSc((p) => ({ ...p, [t]: s })); };
  return (
    <ModNav.Provider value={go}>
      <AppShell nav={all.map(({ id, icon, am, en }) => ({ id, icon, am, en }))} tab={cur.id} setTab={(t) => go(t)}>
        {cur.screens && screen && <SubNav items={cur.screens} value={screen.id} onChange={(id) => go(cur.id, id)} />}
        {screen ? screen.node : cur.node}
      </AppShell>
    </ModNav.Provider>
  );
};

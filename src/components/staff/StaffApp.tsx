import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { Home, User } from "lucide-react";
import { AppShell, ROLE_LABEL } from "../AppShell";
import type { ShellNav } from "../AppShell";
import { MeScreen } from "../MeScreen";
import { PropertyManagerApp } from "./PropertyManagerApp";
import { ItAdminApp } from "./ItAdminApp";
import { RoleHome, DeskPage, DESKS, ROLE_DESKS } from "./RoleViews";
import type { MaintenanceTicket } from "../dashboard/DashboardMaintenanceTab";

interface Props {
  tickets?: MaintenanceTicket[];
  onCreateTicket?: (t: Partial<MaintenanceTicket>) => void;
  maintDialogOpen?: boolean;
  setMaintDialogOpen?: (o: boolean) => void;
}

const GenericStaffApp: React.FC = () => {
  const { currentUser: u, language } = useApp();
  const L = (am: string, en: string) => (language === "am" ? am : en);
  const [tab, setTab] = useState("home");
  if (!u) return null;

  const desks = ROLE_DESKS[u.role] ?? [];
  const nav: ShellNav[] = [
    { id: "home", icon: Home, am: "ዋና", en: "Home" },
    ...desks.map((d) => ({ id: d, icon: DESKS[d].icon, am: DESKS[d].am, en: DESKS[d].en })),
    { id: "me", icon: User, am: "እኔ", en: "Me" },
  ];
  const active = nav.some((n) => n.id === tab) ? tab : "home";
  const first = u.name.replace(/^(Dr|Eng|Mr|Ms)\.\s*/, "").split(" ")[0];
  const role = ROLE_LABEL[u.role] ?? ["", ""];

  return (
    <AppShell nav={nav} tab={active} setTab={setTab}>
      {active === "home" && (
        <>
          <div>
            <h1 className="text-3xl font-extrabold leading-tight">{L(`ሰላም፣ ${first}`, `Hello, ${first}`)}</h1>
            <p className="text-lg text-[var(--color-slate)] mt-1">{L(role[0], role[1])}</p>
          </div>
          <RoleHome role={u.role} onOpen={setTab} />
        </>
      )}
      {active === "me" && <MeScreen />}
      {active !== "home" && active !== "me" && <DeskPage id={active} />}
    </AppShell>
  );
};

/** Property Manager and IT Administrator have full module apps; other roles still use the briefs. */
export const StaffApp: React.FC<Props> = () => {
  const { currentUser: u } = useApp();
  if (u?.role === "property_manager") return <PropertyManagerApp />;
  if (u?.role === "admin") return <ItAdminApp />;
  return <GenericStaffApp />;
};

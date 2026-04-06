import { Link, useLocation } from "wouter";
import { ReactNode } from "react";

interface AppLayoutProps {
  children: ReactNode;
  title?: string;
  showSubTabs?: boolean;
}

export function AppLayout({ children }: AppLayoutProps) {
  const [location] = useLocation();

  const navItems = [
    { name: "Dashboard", href: "/", icon: "dashboard" },
    { name: "Courses", href: "/course-outlines", icon: "school" },
    { name: "Research", href: "/market-research", icon: "query_stats" },
    { name: "Create", href: "/ai-studio", icon: "auto_awesome" },
    { name: "Edit & Import", href: "/cc360", icon: "edit_note" },
    { name: "Billing", href: "/courses", icon: "account_balance_wallet" },
    { name: "Connections", href: "/affiliate", icon: "link" },
  ];

  const bottomItems = [
    { name: "Walkthrough", href: "/templates", icon: "slideshow" },
  ];

  return (
    <div className="flex h-screen w-full bg-cc-background text-white">
      <aside className="fixed left-0 top-0 h-screen w-[220px] flex flex-col border-r border-white/5 bg-cc-background z-50">
        <Link href="/">
          <div className="flex cursor-pointer items-center gap-2.5 px-5 py-5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cc-primary">
              <span className="material-symbols-outlined text-base text-white" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
            </div>
            <div>
              <p className="text-sm font-extrabold text-white leading-none">CC360 Studio</p>
              <p className="text-[9px] uppercase tracking-widest text-white/25 mt-0.5">Companion</p>
            </div>
          </div>
        </Link>

        <nav className="mt-2 flex-1 px-3 space-y-0.5">
          {navItems.map((item) => {
            const isActive = location === item.href || (item.href !== "/" && location.startsWith(item.href));
            return (
              <Link key={item.name} href={item.href}>
                <span className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] font-medium transition cursor-pointer ${
                  isActive
                    ? "bg-white/[0.06] text-white"
                    : "text-white/40 hover:bg-white/[0.03] hover:text-white/60"
                }`}>
                  <span className={`material-symbols-outlined text-lg ${isActive ? "text-cc-primary" : ""}`}
                    style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}>
                    {item.icon}
                  </span>
                  {item.name}
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="px-3 pb-2">
          {bottomItems.map((item) => {
            const isActive = location === item.href;
            return (
              <Link key={item.name} href={item.href}>
                <span className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] font-medium transition cursor-pointer ${
                  isActive
                    ? "bg-white/[0.06] text-white"
                    : "text-white/40 hover:bg-white/[0.03] hover:text-white/60"
                }`}>
                  <span className={`material-symbols-outlined text-lg ${isActive ? "text-cc-primary" : ""}`}>{item.icon}</span>
                  {item.name}
                </span>
              </Link>
            );
          })}
        </div>

        <div className="border-t border-white/5 px-3 py-3">
          <div className="flex items-center gap-2.5 rounded-lg px-3 py-2">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cc-primary to-blue-600 text-[10px] font-bold text-white">
              CS
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-semibold text-white leading-none">Canyon Smith</p>
              <p className="text-[10px] text-white/25 mt-0.5">Pro plan</p>
            </div>
            <span className="material-symbols-outlined text-sm text-white/20">more_horiz</span>
          </div>
        </div>
      </aside>

      <main className="ml-[220px] h-screen flex flex-col overflow-y-auto w-full">
        {children}
      </main>
    </div>
  );
}

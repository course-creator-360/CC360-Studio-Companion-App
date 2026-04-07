import { Link, useLocation } from "wouter";
import { ReactNode, useState } from "react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";

interface AppLayoutProps {
  children: ReactNode;
}

const navItems = [
  { name: "Dashboard", href: "/", icon: "dashboard" },
  { name: "AI Studio", href: "/studio", icon: "auto_awesome" },
  { name: "Resources", href: "/resources", icon: "folder_special" },
  { name: "Community", href: "/community", icon: "groups" },
  { name: "Billing", href: "/billing", icon: "account_balance_wallet" },
] as const;

export function AppLayout({ children }: AppLayoutProps) {
  const [location] = useLocation();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const closeMobileNav = () => setMobileNavOpen(false);

  const sidebarBody = (onNavigate?: () => void) => (
    <>
      <Link href="/">
        <div
          onClick={onNavigate}
          className="flex cursor-pointer items-center gap-2.5 px-5 py-5"
        >
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
              <span
                onClick={onNavigate}
                className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] font-medium transition cursor-pointer ${
                  isActive
                    ? "bg-white/[0.06] text-white"
                    : "text-white/40 hover:bg-white/[0.03] hover:text-white/60"
                }`}
              >
                <span
                  className={`material-symbols-outlined text-lg ${isActive ? "text-cc-primary" : ""}`}
                  style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
                >
                  {item.icon}
                </span>
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>

      <div className="px-3 pb-2">
        <a
          href="https://app.gohighlevel.com"
          target="_blank"
          rel="noopener noreferrer"
          onClick={onNavigate}
          className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] font-medium text-white/40 transition cursor-pointer hover:bg-white/[0.03] hover:text-white/60"
        >
          <span className="material-symbols-outlined text-lg">open_in_new</span>
          Back to GHL
        </a>
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
    </>
  );

  return (
    <div className="flex min-h-screen w-full min-w-0 bg-cc-background text-white">
      <aside className="fixed left-0 top-0 z-50 hidden h-screen w-[220px] flex-col border-r border-white/5 bg-cc-background md:flex">
        {sidebarBody()}
      </aside>

      <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
        <SheetContent
          side="left"
          className="w-[min(280px,88vw)] border-white/5 bg-cc-background p-0 text-white [&>button]:text-white/50 [&>button]:hover:text-white"
        >
          <SheetHeader className="sr-only">
            <SheetTitle>Main navigation</SheetTitle>
            <SheetDescription>Open sections of the CC360 Studio companion app.</SheetDescription>
          </SheetHeader>
          <div className="flex h-full flex-col overflow-y-auto">{sidebarBody(closeMobileNav)}</div>
        </SheetContent>
      </Sheet>

      <main className="flex h-screen min-h-0 w-full min-w-0 flex-col overflow-y-auto md:ml-[220px]">
        <div className="flex shrink-0 items-center justify-between gap-2 px-4 pt-3 pb-0 sm:px-6 md:px-8 md:pt-4">
          <button
            type="button"
            onClick={() => setMobileNavOpen(true)}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-cc-surface text-white/70 transition hover:border-white/20 hover:text-white md:hidden"
            aria-label="Open menu"
          >
            <span className="material-symbols-outlined text-xl">menu</span>
          </button>
          <div className="flex min-w-0 flex-1 items-center justify-end">
            <Link href="/billing">
              <span className="inline-flex max-w-full cursor-pointer items-center gap-1.5 overflow-hidden rounded-full border border-white/8 bg-cc-surface px-2.5 py-1.5 text-[11px] font-semibold text-white/60 transition hover:border-white/15 hover:text-white sm:gap-2 sm:px-3.5 sm:text-xs">
                <span className="material-symbols-outlined shrink-0 text-sm text-emerald-400">toll</span>
                <span className="truncate">232 credits</span>
                <span className="hidden h-3 w-px shrink-0 bg-white/10 sm:block" />
                <span className="hidden shrink-0 text-white/30 sm:inline">Pro</span>
              </span>
            </Link>
          </div>
        </div>
        {children}
      </main>
    </div>
  );
}

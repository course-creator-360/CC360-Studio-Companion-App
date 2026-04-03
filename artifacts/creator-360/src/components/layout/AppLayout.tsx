import { Link, useLocation } from "wouter";
import { ReactNode } from "react";

interface AppLayoutProps {
  children: ReactNode;
  title?: string;
  showSubTabs?: boolean;
}

export function AppLayout({ children, title, showSubTabs }: AppLayoutProps) {
  const [location] = useLocation();

  const navItems = [
    { name: "Home", href: "/", icon: "home", filled: true },
    { name: "AI Studio", href: "/ai-studio", icon: "psychology", filled: false },
    { name: "CC360", href: "/cc360", icon: "hub", filled: false },
    { name: "Affiliate", href: "/affiliate", icon: "handshake", filled: false },
    { name: "Courses", href: "/courses", icon: "auto_stories", filled: false },
    { name: "Templates", href: "/templates", icon: "dashboard_customize", filled: false },
  ];

  return (
    <div className="flex h-screen w-full bg-haze text-cc-on-background dark">
      <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-cc-primary/20 rounded-full blur-[120px] pointer-events-none z-0 opacity-40" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cc-primary/10 rounded-full blur-[100px] pointer-events-none z-0 opacity-30" />

      <aside className="fixed left-0 top-0 h-screen w-64 border-r border-cc-outline-variant/20 bg-cc-background flex flex-col z-50">
        <div className="p-8">
          <h1 className="text-lg font-extrabold text-white tracking-tight" data-testid="app-logo">Course Creator 360</h1>
          <p className="text-[10px] uppercase tracking-[0.2em] text-cc-on-surface-variant/60 font-medium mt-1">Workspace</p>
        </div>
        <nav className="flex-1 mt-4 px-3 space-y-1" data-testid="sidebar-nav">
          {navItems.map((item) => {
            const isActive = location === item.href || (item.href !== "/" && location.startsWith(item.href));
            return (
              <Link key={item.name} href={item.href}>
                <span
                  data-testid={`nav-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className={`flex items-center gap-3 px-4 py-3 transition-all cursor-pointer ${
                    isActive
                      ? "text-white font-bold border-l-4 border-cc-primary bg-cc-primary/10"
                      : "text-white hover:bg-cc-surface-container group"
                  }`}
                >
                  <span
                    className={`material-symbols-outlined ${isActive ? "text-cc-primary" : "text-white group-hover:text-cc-primary"}`}
                    style={isActive && item.filled ? { fontVariationSettings: "'FILL' 1" } : undefined}
                  >
                    {item.icon}
                  </span>
                  <span className="text-sm">{item.name}</span>
                </span>
              </Link>
            );
          })}
        </nav>
        <div className="p-6 mt-auto">
          <div className="bg-cc-surface-container rounded-xl p-4 border border-cc-outline-variant/10">
            <p className="text-xs text-cc-on-surface-variant/70 mb-2">Current Plan</p>
            <div className="flex justify-between items-center">
              <span className="font-bold text-white tracking-tight text-sm">Pro Creator</span>
              <span className="text-[10px] bg-cc-primary/20 text-cc-primary px-2 py-0.5 rounded-full font-bold">ACTIVE</span>
            </div>
          </div>
        </div>
      </aside>

      <header className="fixed top-0 right-0 left-64 h-16 flex justify-between items-center px-8 z-40 bg-cc-background/80 backdrop-blur-xl border-b border-cc-outline-variant/10">
        <div className="relative w-96">
          <label htmlFor="global-search" className="sr-only">Search</label>
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-cc-on-surface-variant text-sm">search</span>
          <input
            id="global-search"
            data-testid="search-input"
            className="bg-cc-surface border-none w-full pl-10 pr-4 py-2 rounded-lg text-sm text-white focus:ring-2 focus:ring-cc-primary/50 placeholder:text-cc-on-surface-variant/50 outline-none"
            placeholder="Search templates, projects, or assets..."
            type="text"
          />
        </div>
        <div className="flex items-center gap-6">
          <button className="relative text-cc-on-surface-variant hover:text-white transition-colors" data-testid="btn-notifications" aria-label="Notifications">
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute top-0 right-0 w-2 h-2 bg-cc-primary rounded-full border-2 border-cc-background"></span>
          </button>
          <button className="text-cc-on-surface-variant hover:text-white transition-colors" data-testid="btn-settings" aria-label="Settings">
            <span className="material-symbols-outlined">settings</span>
          </button>
          <div className="flex items-center gap-3 ml-2 pl-6 border-l border-cc-outline-variant/20">
            <div className="text-right">
              <p className="text-sm font-semibold text-white leading-none">Alex Rivera</p>
              <p className="text-[10px] text-cc-on-surface-variant/70">Owner</p>
            </div>
            <div className="w-8 h-8 rounded-full border border-cc-primary/30 bg-cc-surface-container flex items-center justify-center text-xs font-bold text-cc-primary" data-testid="user-avatar">
              AR
            </div>
          </div>
        </div>
      </header>

      <main className="ml-64 pt-16 h-screen flex flex-col relative overflow-y-auto w-full">
        <div className="relative z-10 flex-1">
          {children}
        </div>
      </main>

      <button
        data-testid="fab-add"
        aria-label="Create new"
        className="fixed bottom-8 right-8 h-16 w-16 bg-cc-primary text-white rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(4,117,255,0.4)] hover:scale-110 active:scale-95 transition-all z-50"
      >
        <span className="material-symbols-outlined text-3xl">add</span>
      </button>
    </div>
  );
}

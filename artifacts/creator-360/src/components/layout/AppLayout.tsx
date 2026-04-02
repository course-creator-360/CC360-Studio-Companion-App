import { Link, useLocation } from "wouter";
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";

interface AppLayoutProps {
  children: ReactNode;
  title: string;
}

export function AppLayout({ children, title }: AppLayoutProps) {
  const [location] = useLocation();

  const navItems = [
    { name: "Dashboard", href: "/", icon: "dashboard" },
    { name: "Curriculum", href: "/curriculum", icon: "account_tree" },
    { name: "Analytics", href: "/analytics", icon: "monitoring" },
    { name: "Community", href: "/community", icon: "groups" },
    { name: "Settings", href: "/settings", icon: "settings" },
  ];

  return (
    <div className="flex h-screen w-full bg-background text-foreground dark">
      {/* Sidebar: The White Monolith Anchor */}
      <aside className="h-screen w-64 fixed left-0 top-0 bg-white z-50 monolith-sidebar flex flex-col py-8">
        <div className="px-8 mb-12">
          <h1 className="text-xl font-black text-slate-900 tracking-tighter">Creator 360</h1>
          <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mt-1">Command Center</p>
        </div>
        <nav className="flex-1 space-y-1">
          {navItems.map((item) => {
            const isActive = location === item.href || (item.href !== "/" && location.startsWith(item.href));
            return (
              <Link key={item.name} href={item.href}>
                <span
                  className={`flex items-center px-8 py-4 transition-colors duration-200 group cursor-pointer ${
                    isActive
                      ? "text-slate-900 border-l-4 border-brand-blue bg-slate-50"
                      : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  <span
                    className={`material-symbols-outlined mr-4 ${isActive ? "text-brand-blue" : ""}`}
                  >
                    {item.icon}
                  </span>
                  <span className="text-sm font-semibold tracking-tight">{item.name}</span>
                </span>
              </Link>
            );
          })}
        </nav>
        <div className="px-6 mt-auto">
          <button className="w-full bg-slate-900 text-white py-3 rounded-lg text-sm font-bold active:scale-95 transition-transform flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-sm">add</span>
            New Project
          </button>
        </div>
      </aside>

      {/* Top AppBar */}
      <header className="fixed top-0 right-0 left-64 h-16 z-40 bg-background/80 backdrop-blur-xl flex justify-between items-center px-12 border-b border-white/5">
        <div className="flex items-center gap-8">
          <span className="text-lg font-bold text-white">{title}</span>
          {title === "Course Architect" && (
            <div className="flex items-center gap-6">
              <span className="text-brand-blue font-bold border-b-2 border-brand-blue py-5 text-sm tracking-tight cursor-pointer">Drafts</span>
              <span className="text-white opacity-70 hover:text-brand-blue hover:opacity-100 transition-all text-sm tracking-tight cursor-pointer">Published</span>
              <span className="text-white opacity-70 hover:text-brand-blue hover:opacity-100 transition-all text-sm tracking-tight cursor-pointer">Archive</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-6">
          <span className="material-symbols-outlined text-white opacity-70 hover:opacity-100 cursor-pointer">notifications</span>
          <span className="material-symbols-outlined text-white opacity-70 hover:opacity-100 cursor-pointer">help_outline</span>
          <button className="bg-brand-blue text-white px-6 py-2 rounded-full text-xs font-bold tracking-widest uppercase hover:scale-105 transition-transform active:scale-98">
            Deploy
          </button>
          <div className="w-8 h-8 rounded-full overflow-hidden border border-white/20 bg-slate-800">
            {/* Avatar placeholder */}
          </div>
        </div>
      </header>

      {/* Main Content Canvas */}
      <main className="ml-64 pt-32 pb-24 px-12 min-h-screen relative overflow-y-auto w-full">
        {/* Background Haze Orbs */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-blue/5 rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-blue/5 rounded-full blur-[100px] -z-10 -translate-x-1/4 translate-y-1/4 pointer-events-none"></div>
        
        {children}
      </main>

      {/* Watermark Logo */}
      <div className="fixed bottom-12 right-12 pointer-events-none opacity-[0.03] select-none z-0">
        <h2 className="text-[120px] font-black tracking-tighter leading-none">C360</h2>
      </div>
    </div>
  );
}

import { Link } from "wouter";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export default function Login() {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    if (isValidEmail(email)) setSent(true);
  };

  return (
    <div className="flex min-h-screen bg-haze">
      <div className="hidden w-[45%] items-center justify-center bg-gradient-to-br from-cc-primary/20 via-cc-background to-cc-background lg:flex">
        <div className="max-w-sm px-12">
          <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl bg-cc-primary">
            <span className="material-symbols-outlined text-2xl text-white" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight text-white">Create content.<br />Import to GHL.<br />All in one place.</h2>
          <p className="mt-4 text-sm leading-relaxed text-white/50">
            CC360 Studio Companion helps you draft, refine, and push marketing assets directly into your GoHighLevel workspace.
          </p>
          <div className="mt-8 space-y-4">
            {["AI-powered email sequences", "One-click GHL import", "Credit-based usage tracking"].map((feature) => (
              <div key={feature} className="flex items-center gap-3">
                <span className="material-symbols-outlined text-sm text-cc-primary">check_circle</span>
                <span className="text-sm text-white/60">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center px-4 sm:px-8">
        <div className="w-full max-w-sm">
          <div className="mb-8 flex items-center gap-3 lg:hidden">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cc-primary">
              <span className="material-symbols-outlined text-lg text-white" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
            </div>
            <span className="text-lg font-extrabold text-white">CC360 Studio</span>
          </div>

          {sent ? (
            <div className="text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10">
                <span className="material-symbols-outlined text-3xl text-emerald-400">mark_email_read</span>
              </div>
              <h1 className="text-2xl font-extrabold text-white">Check your email</h1>
              <p className="mt-3 text-sm text-white/50">
                We sent a sign-in link to <span className="font-semibold text-white">{email}</span>
              </p>
              <button
                onClick={() => setSent(false)}
                className="mt-6 text-sm font-medium text-cc-primary hover:underline"
              >
                Use a different email
              </button>
              <Link href="/">
                <span className="mt-4 block cursor-pointer text-xs text-white/30 hover:text-white/50">
                  Skip to demo &rarr;
                </span>
              </Link>
            </div>
          ) : (
            <>
              <h1 className="text-2xl font-extrabold text-white">Sign in to your workspace</h1>
              <p className="mt-2 text-sm text-white/40">
                Use the same email as your GoHighLevel account.
              </p>

              <div className="mt-8 space-y-4">
                <div>
                  <label htmlFor="email" className="mb-1.5 block text-xs font-semibold text-white/50">
                    Email address
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none transition focus:border-cc-primary/50 focus:ring-1 focus:ring-cc-primary/20"
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  />
                </div>

                <button
                  onClick={handleSend}
                  className="w-full rounded-xl bg-cc-primary py-3 text-sm font-bold text-white transition hover:brightness-110 disabled:opacity-40"
                  disabled={!isValidEmail(email)}
                >
                  Send magic link
                </button>

                <div className="relative py-3">
                  <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5" /></div>
                  <div className="relative flex justify-center"><span className="bg-cc-background px-3 text-[10px] uppercase tracking-widest text-white/20">or</span></div>
                </div>

                <button
                  onClick={() => toast({ title: "SSO coming soon", description: "Shared OIDC login is being validated with the agency." })}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.02] py-3 text-sm font-medium text-white/60 transition hover:bg-white/5 hover:text-white"
                >
                  <span className="material-symbols-outlined text-lg">key</span>
                  Continue with SSO
                </button>
              </div>

              <Link href="/">
                <span className="mt-6 block cursor-pointer text-center text-xs text-white/20 hover:text-white/40">
                  Skip to demo &rarr;
                </span>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

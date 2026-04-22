import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Sparkles, Send, ArrowRight, Bot, User, Code2, Settings2, Loader2 } from "lucide-react";
import { usePersona, type Persona } from "@/lib/persona";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Conversive Copilot — Find your guide" },
      { name: "description", content: "Tell the Conversive Copilot your industry, role and CRM. Get a purpose-built documentation path tailored to your build." },
      { property: "og:title", content: "Conversive Docs · Copilot Home" },
      { property: "og:description", content: "Conversational discovery for the Conversive documentation center." },
    ],
  }),
  component: CopilotHome,
});

type Step = "industry" | "role" | "crm" | "loading" | "done";

const INDUSTRIES = ["Recruitment", "Retail", "Healthcare", "Finance", "Education"];
const ROLES: { label: string; value: Persona; hint: string }[] = [
  { label: "Admin", value: "admin", hint: "Salesforce setup, no code" },
  { label: "Developer", value: "dev", hint: "Apex, REST, webhooks" },
];
const CRMS = ["Salesforce", "Zoho"];

function CopilotHome() {
  const navigate = useNavigate();
  const { setPersona } = usePersona();
  const [step, setStep] = useState<Step>("industry");
  const [industry, setIndustry] = useState<string | null>(null);
  const [role, setRole] = useState<Persona | null>(null);
  const [crm, setCrm] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [step, industry, role, crm]);

  // Loading bar -> redirect
  useEffect(() => {
    if (step !== "loading") return;
    const id = setInterval(() => {
      setProgress((p) => {
        const next = p + 8 + Math.random() * 10;
        if (next >= 100) {
          clearInterval(id);
          setStep("done");
          return 100;
        }
        return next;
      });
    }, 180);
    return () => clearInterval(id);
  }, [step]);

  useEffect(() => {
    if (step !== "done" || !role) return;
    setPersona(role);
    const t = setTimeout(() => {
      navigate({ to: "/workflow/sender-ids" });
    }, 900);
    return () => clearTimeout(t);
  }, [step, role, setPersona, navigate]);

  const pickIndustry = (v: string) => {
    setIndustry(v);
    setTimeout(() => setStep("role"), 250);
  };
  const pickRole = (v: Persona) => {
    setRole(v);
    setPersona(v);
    setTimeout(() => setStep("crm"), 250);
  };
  const pickCrm = (v: string) => {
    setCrm(v);
    setTimeout(() => setStep("loading"), 250);
  };

  const reset = () => {
    setIndustry(null);
    setRole(null);
    setCrm(null);
    setProgress(0);
    setStep("industry");
  };

  return (
    <div className="relative isolate min-h-[calc(100vh-3.5rem)] overflow-hidden">
      <div className="absolute inset-0 -z-10 gradient-hero" />
      <div className="absolute inset-0 -z-10 grid-bg opacity-40" />

      <div className="mx-auto flex max-w-3xl flex-col px-4 pt-12 pb-24 lg:pt-20">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-teal-bright backdrop-blur">
            <Sparkles className="h-3 w-3" /> Conversive Copilot
          </div>
          <h1 className="font-display text-3xl font-bold tracking-tight text-white sm:text-5xl">
            What are you building today?
          </h1>
          <p className="mt-3 text-sm text-white/70 sm:text-base">
            Answer three quick questions and we'll load a purpose-oriented guide
            for your stack. You can keep chatting with the Copilot anytime.
          </p>
        </div>

        {/* Chat */}
        <div
          ref={scrollRef}
          className="mt-8 flex max-h-[60vh] flex-col gap-4 overflow-y-auto rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur"
        >
          <Bubble who="bot">Hi 👋 I'm the Conversive Copilot. Which industry are you in?</Bubble>

          {step === "industry" && (
            <Choices options={INDUSTRIES} onPick={pickIndustry} highlight="Recruitment" />
          )}

          {industry && (
            <>
              <Bubble who="user">{industry}</Bubble>
              <Bubble who="bot">Great — and what's your role?</Bubble>
            </>
          )}

          {step === "role" && (
            <div className="grid gap-2 sm:grid-cols-2">
              {ROLES.map((r) => (
                <button
                  key={r.value}
                  onClick={() => pickRole(r.value)}
                  className="group flex items-center gap-3 rounded-xl border border-white/15 bg-white/5 p-4 text-left transition hover:border-teal-bright/60 hover:bg-white/10"
                >
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${r.value === "admin" ? "bg-admin/20 text-admin" : "bg-dev/20 text-dev"}`}>
                    {r.value === "admin" ? <Settings2 className="h-5 w-5" /> : <Code2 className="h-5 w-5" />}
                  </div>
                  <div>
                    <div className="font-display text-sm font-semibold text-white">{r.label}</div>
                    <div className="text-xs text-white/60">{r.hint}</div>
                  </div>
                  <ArrowRight className="ml-auto h-4 w-4 text-white/40 transition group-hover:translate-x-1 group-hover:text-teal-bright" />
                </button>
              ))}
            </div>
          )}

          {role && (
            <>
              <Bubble who="user">{role === "admin" ? "Admin" : "Developer"}</Bubble>
              <Bubble who="bot">Got it. Which CRM / platform are you on?</Bubble>
            </>
          )}

          {step === "crm" && (
            <Choices options={CRMS} onPick={pickCrm} highlight="Salesforce" disabled={["Zoho"]} />
          )}

          {crm && (
            <>
              <Bubble who="user">{crm}</Bubble>
            </>
          )}

          {(step === "loading" || step === "done") && (
            <Bubble who="bot">
              <div className="space-y-2">
                <div>
                  Here is your purpose-oriented guide loading
                  <span className="inline-flex w-6 overflow-hidden align-bottom"><span className="dot-loop">…</span></span>
                  <br />
                  <span className="text-white/60">You can ask Copilot if you need more.</span>
                </div>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full bg-gradient-to-r from-teal to-teal-bright transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1 text-[11px]">
                  {[
                    `Industry · ${industry}`,
                    `Persona · ${role === "admin" ? "Admin" : "Developer"}`,
                    `CRM · ${crm}`,
                    "Use Case · Wavelength",
                  ].map((t) => (
                    <span key={t} className="rounded-full border border-teal-bright/30 bg-teal-bright/10 px-2 py-0.5 text-teal-bright">
                      {t}
                    </span>
                  ))}
                </div>
                {step === "done" && (
                  <div className="mt-2 inline-flex items-center gap-1 text-xs text-teal-bright">
                    <Loader2 className="h-3 w-3 animate-spin" /> Routing to {role === "admin" ? "Admin" : "Developer"} sidebar…
                  </div>
                )}
              </div>
            </Bubble>
          )}
        </div>

        {/* Composer */}
        <div className="mt-4 flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] p-2 backdrop-blur">
          <input
            disabled
            placeholder={step === "industry" ? "Pick an industry above…" : step === "role" ? "Pick a role above…" : step === "crm" ? "Pick your CRM above…" : "Loading your guide…"}
            className="flex-1 bg-transparent px-3 py-2 text-sm text-white outline-none placeholder:text-white/40"
          />
          <button
            onClick={reset}
            className="rounded-lg border border-white/15 px-3 py-2 text-xs font-medium text-white/70 hover:bg-white/10"
          >
            Restart
          </button>
          <button
            disabled
            className="inline-flex items-center gap-1 rounded-lg bg-teal-bright/80 px-3 py-2 text-xs font-semibold text-navy-deep opacity-60"
          >
            <Send className="h-3.5 w-3.5" /> Ask
          </button>
        </div>
      </div>

      <style>{`
        @keyframes dotLoop { 0%{content:'.'} 33%{content:'..'} 66%{content:'...'} }
        .dot-loop::after { content: '…'; animation: dotLoop 1.2s steps(3,end) infinite; }
      `}</style>
    </div>
  );
}

function Bubble({ who, children }: { who: "bot" | "user"; children: React.ReactNode }) {
  const isBot = who === "bot";
  return (
    <div className={`flex items-start gap-3 ${isBot ? "" : "flex-row-reverse"}`}>
      <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${isBot ? "bg-teal-bright text-navy-deep" : "bg-white/10 text-white"}`}>
        {isBot ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
      </div>
      <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${isBot ? "rounded-tl-sm bg-white/10 text-white" : "rounded-tr-sm bg-teal-bright text-navy-deep font-medium"}`}>
        {children}
      </div>
    </div>
  );
}

function Choices({
  options,
  onPick,
  highlight,
  disabled = [],
}: {
  options: string[];
  onPick: (v: string) => void;
  highlight?: string;
  disabled?: string[];
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => {
        const isHi = o === highlight;
        const isDis = disabled.includes(o);
        return (
          <button
            key={o}
            disabled={isDis}
            onClick={() => onPick(o)}
            className={`group rounded-full border px-3.5 py-1.5 text-sm font-medium transition ${
              isDis
                ? "cursor-not-allowed border-white/10 bg-white/5 text-white/30"
                : isHi
                  ? "border-teal-bright/60 bg-teal-bright/15 text-teal-bright hover:bg-teal-bright/25"
                  : "border-white/15 bg-white/5 text-white/80 hover:border-teal-bright/40 hover:bg-white/10"
            }`}
          >
            {o}
            {isHi && <span className="ml-1.5 text-[10px] uppercase tracking-wider opacity-70">recommended</span>}
            {isDis && <span className="ml-1.5 text-[10px] uppercase tracking-wider">soon</span>}
          </button>
        );
      })}
    </div>
  );
}

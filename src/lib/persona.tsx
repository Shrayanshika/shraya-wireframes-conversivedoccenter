import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Persona = "dev" | "admin";

type Ctx = {
  persona: Persona;
  setPersona: (p: Persona) => void;
};

const PersonaContext = createContext<Ctx | null>(null);

export function PersonaProvider({ children }: { children: ReactNode }) {
  const [persona, setPersonaState] = useState<Persona>("dev");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = window.localStorage.getItem("conversive-persona") as Persona | null;
    if (saved === "dev" || saved === "admin") setPersonaState(saved);
  }, []);

  const setPersona = (p: Persona) => {
    setPersonaState(p);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("conversive-persona", p);
    }
  };

  return (
    <PersonaContext.Provider value={{ persona, setPersona }}>
      {children}
    </PersonaContext.Provider>
  );
}

export function usePersona() {
  const ctx = useContext(PersonaContext);
  if (!ctx) throw new Error("usePersona must be used inside PersonaProvider");
  return ctx;
}

export function PersonaOnly({
  audience,
  children,
}: {
  audience: Persona | "both";
  children: ReactNode;
}) {
  const { persona } = usePersona();
  if (audience === "both") return <>{children}</>;
  if (persona !== audience) return null;
  return <>{children}</>;
}

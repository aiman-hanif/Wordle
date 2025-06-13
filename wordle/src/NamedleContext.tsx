import { createContext, useState } from "react";
import { NamedleContextType } from "./types/Namedle";
export const NamedleContext = createContext<NamedleContextType | null>(null);

export function NamedleProvider({ children }: { children: React.ReactNode }) {
  const [name, setName] = useState<string>("AIMAN");

  return (
    <NamedleContext.Provider value={{ name, setName }}>
      {children}
    </NamedleContext.Provider>
  );
}

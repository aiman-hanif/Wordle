import { createContext, useState } from "react";
import { NamedleContextType } from "./types/Namedle";
import { TEST_NAME } from "./TestConstants";
export const NamedleContext = createContext<NamedleContextType | null>(null);

export function NamedleProvider({ children }: { children: React.ReactNode }) {
  const [name, setName] = useState<string>(TEST_NAME.firstName);

  return (
    <NamedleContext.Provider value={{ name, setName }}>
      {children}
    </NamedleContext.Provider>
  );
}

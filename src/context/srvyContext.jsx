import { createContext, useContext, useState } from "react";

export const SrvyContext = createContext();

export const SrvyContextProvider = ({ children }) => {
  const [active, setActive] = useState('form')
  return <SrvyContext.Provider value={[active, setActive]}>
    {children}
  </SrvyContext.Provider>
}

export const useSrvyContext = () => useContext(SrvyContext)
import React, { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("darkBlue");
  return <ThemeContext.Provider value={[theme, setTheme]}>{children}</ThemeContext.Provider>;
};

export const useColors = () => useContext(ThemeContext);

export default ThemeProvider;

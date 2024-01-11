import { useColors } from "../context/themeContext";

const useTheme = () => {
  const [theme] = useColors();

  const whichTheme = () => {
    return theme === "darkBlue" ? "main-db_layout" : theme === "darkPurple" && "main-dp_layout";
  };

  return { whichTheme };
};

export default useTheme;

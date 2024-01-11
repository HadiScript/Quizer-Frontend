import { useLocation } from "react-router-dom";

const useActive = () => {
  const pathname = useLocation().pathname;

  const isActive = (path) => {
    return pathname.startsWith(`subscribe/quize/`) || pathname === path  ? "_active" : "nav-link";
  };

  console.log(pathname, "here is ")

  return { isActive };
};

export default useActive;

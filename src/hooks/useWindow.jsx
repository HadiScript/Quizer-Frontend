import React, { useEffect, useState } from "react";

export const useWindow = () => {
  const [resize, setResize] = useState({});

  const resizeing = () => {
    setResize({ ...resize, width: window.innerWidth, height: window.innerHeight });
  };

  useEffect(() => {
    window.addEventListener("resize", resizeing);
    return () => {
      window.removeEventListener("resize", resizeing);
    };
  }, []);

  return { resize };
};

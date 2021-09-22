import { useEffect, useState } from "react";

function useDarkMode() {
  // https://tailwindcss.com/docs/dark-mode#toggling-dark-mode-manually

  let defaultTheme;
  if (
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    defaultTheme = "dark";
  } else {
    defaultTheme = "light";
  }

  const [colorTheme, setColorTheme] = useState(defaultTheme);

  useEffect(() => {
    const root = window.document.documentElement;

    if (colorTheme === "dark") {
      root.classList.add("dark");
      localStorage.theme = "dark";
    } else if (colorTheme === "light") {
      root.classList.remove("dark");
      localStorage.theme = "light";
    }
  }, [colorTheme]);

  return [colorTheme, setColorTheme];
}

export default useDarkMode;

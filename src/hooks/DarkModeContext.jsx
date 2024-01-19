import { createContext, useEffect, useState } from "react";

const DarkModeContext = createContext();

const DarkModeProvider = (props) => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.getElementById("root").classList.add("scene-dark");
    } else {
      document.getElementById("root").classList.remove("scene-dark");
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode((darkMode) => !darkMode);

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {props.children}
    </DarkModeContext.Provider>
  );
};

export { DarkModeContext, DarkModeProvider };

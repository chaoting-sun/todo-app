import { useEffect, useState } from "react";
import ModeContext from "./ModeContext";

const ModeProvider = (props) => {
  const [darkMode, setDarkMode] = useState(
    false || JSON.parse(window.localStorage.getItem("modeOfView"))
  );

  useEffect(() => {
    if (darkMode) {
      document.querySelector("html").classList.add("background-dark");
      // document.getElementById("root").classList.add("scene-dark");
    } else {
      document.querySelector("html").classList.remove("background-dark");
      // document.getElementById("root").classList.remove("scene-dark");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    window.localStorage.setItem("modeOfView", JSON.stringify(!darkMode));
    setDarkMode((darkMode) => !darkMode);
  };

  return (
    <ModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {props.children}
    </ModeContext.Provider>
  );
};

export default ModeProvider;

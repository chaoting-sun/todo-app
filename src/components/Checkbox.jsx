import React, { useContext, useState } from "react";
import { DarkModeContext } from "../hooks/DarkModeContext";
import styled from "styled-components";
import "../App.css";

const getBackgroundImage = (props) =>
  props.$darkMode ? "var(--card-dark)" : "#ffffff";

const CheckLabel = styled.label`
  height: 23px;
  width: 23px;
  box-sizing: border-box;
  border-radius: 50%;
  border: 1.2px solid ${(props) => (props.$darkMode ? "#46464d" : "#e5e5e5")};
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:hover {
    border: 1.2px solid transparent;
    border-color: transparent;
    background-image: linear-gradient(
        ${getBackgroundImage},
        ${getBackgroundImage}
      ),
      var(--checkbox-border-gradient);
    background-origin: border-box;
    background-clip: content-box, border-box;
  }

  input[type="checkbox"]:checked + & {
    border: 11.5px solid transparent;
    border-color: transparent;
    background-image: linear-gradient(white, white),
      var(--checkbox-border-gradient);
    background-origin: border-box;
    background-clip: content-box, border-box;
  }
`;

const Checkbox = ({ id, isCompleted, toggleTodo }) => {
  const { darkMode } = useContext(DarkModeContext);
  const [onHovered, setOnHovered] = useState(false);

  const handleEnter = () => setOnHovered(true);
  const handleLeave = () => setOnHovered(false);
  const handleCheck = () => {
    toggleTodo(id);
    console.log("handleCheck:", id);
  };

  return (
    <div className="checkbox">
      <input id={id} type="checkbox" onClick={handleCheck} />
      <CheckLabel
        htmlFor={id}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        $darkMode={darkMode}
      >
        {isCompleted && <img src="/src/images/icon-check.svg" />}
      </CheckLabel>
    </div>
  );
};

export default Checkbox;

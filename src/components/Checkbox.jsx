import React, { useContext, useState } from "react";
import { DarkModeContext } from "../hooks/DarkModeContext";
import styled from "styled-components";

const CheckLabel = styled.label`
  height: 23px;
  width: 23px;
  box-sizing: border-box;
  border-radius: 50%;
  border: 1.2px solid rgb(229, 229, 229);
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    cursor: pointer;
    border-color: transparent;
    background: linear-gradient(white, white) padding-box,
      var(--custom-gradient) border-box;  
  }

  input[type="checkbox"]:checked + & {
    border-color: transparent;
    background: var(--custom-gradient) padding-box,
      var(--custom-gradient) border-box;  
  }
`

const labelStyles = `
  height: 23px;
  width: 23px;
  box-sizing: border-box;
  border-radius: 50%;
  border: 1.2px solid rgb(229, 229, 229);
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const UncheckedLabel = styled.label`
  ${labelStyles}
`

const CheckedLabel = styled.label`
  ${labelStyles}
  border-color: transparent;
  background: var(--custom-gradient) padding-box,
    var(--custom-gradient) border-box;
`;

const HoveredLabel = styled.label`
  ${labelStyles}
  border-color: transparent;
//   background: linear-gradient(black, black) padding-box,
//   var(--custom-gradient) border-box;

    background: linear-gradient(white, white) padding-box,
    var(--custom-gradient) border-box !important;
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
      {/* <CheckLabel
        htmlFor={id}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}      
      >
        {isCompleted && <img src="/src/images/icon-check.svg" />}
      </CheckLabel> */}

      {isCompleted ? (
        <CheckedLabel
          htmlFor={id}
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
        >
          {isCompleted && <img src="/src/images/icon-check.svg" />}
        </CheckedLabel>
      ) : onHovered ? (
        <HoveredLabel
          htmlFor={id}
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
        >
          {isCompleted && <img src="/src/images/icon-check.svg" />}
        </HoveredLabel>
      ) : (
        <UncheckedLabel
          htmlFor={id}
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
        >
          {isCompleted && <img src="/src/images/icon-check.svg" />}
        </UncheckedLabel>
      )}
    </div>
  );
};

export default Checkbox;

import React, { useContext, useState } from "react";
import { DarkModeContext } from "../hooks/DarkModeContext";
import styled, { css } from "styled-components";
import "../App.css";

const getBackgroundImage = (props) =>
  props.$darkMode ? "var(--card-dark)" : "#ffffff";

const Box = styled.div`
  height: 100%;
  width: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  & img {
    width: 16px;
    position: absolute;
    cursor: pointer;
    user-select: none;  
  }

  & input {
    position: absolute;
  }
`

const Label = styled.label`
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

  ${(props) =>
    props.$isCompleted &&
    css`
      border: 12px solid transparent !important;
      border-color: transparent !important;
      background-image: linear-gradient(white, white),
        var(--checkbox-border-gradient) !important;
      background-origin: border-box !important;
      background-clip: content-box, border-box !important;
    `}
`;

const Checkbox = ({ id, isCompleted, toggleTodo }) => {
  const { darkMode } = useContext(DarkModeContext);

  const handleCheck = () => {
    toggleTodo(id);
    console.log("handleCheck:", id);
  };

  return (
    <Box>
      <input id={id} type="checkbox" onClick={handleCheck} />
      <Label
        htmlFor={id}
        $darkMode={darkMode}
        $isCompleted={isCompleted}
      >
        {isCompleted && (
          <img style={{ zIndex: 1 }} src="assets/icon-check.svg" />
        )}
      </Label>
    </Box>
  );
};

export default Checkbox;

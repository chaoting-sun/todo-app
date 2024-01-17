import React, { useContext, useState } from "react";
import styled from "styled-components";
import { DarkModeContext } from "../hooks/DarkModeContext";

const Input = styled.div`
  background-color: ${(props) => props.$darkMode ? "var(--card-dark)" : "var(--card-light)"};
  width: 100%;
  height: 75px;
  margin: 40px;
  border-radius: 6px;

  & > input {
    width: calc(100% - 70px);
    height: 100%;
    font-size: 1.1em;
    font-family: var(--card-fonttype);
    padding: 0;
    margin-left: 70px;
    color: ${(props) => props.$darkMode ? "var(--item-fontcolor-dark)" : "var(--item-fontcolor-light)" };
    background-color: ${(props) => props.$darkMode ? "var(--card-dark)" : "var(--card-light)"};
    border: white;
    border-radius: 6px;
    box-sizing: border-box;
  }
`

const TodoInput = ({ addTodo }) => {
  const { darkMode } = useContext(DarkModeContext);
  const [inputText, setInputText] = useState("");

  const handleKeyPress = (e) => {
    if (inputText !== ""  && e.key === "Enter") {
      addTodo(inputText);
      setInputText("");
    }
  }

  return (
    <Input $darkMode={darkMode}>
      <input
        type="text"
        onChange={(e) => setInputText(e.target.value)}
        value={inputText}
        onKeyDown={handleKeyPress}
        placeholder="Add something"
      />
    </Input>
  );
};

export default TodoInput;

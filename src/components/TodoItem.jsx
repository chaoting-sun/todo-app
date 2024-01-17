import React, { useContext, useState } from "react";
import Checkbox from "./Checkbox";
import styled from "styled-components";
import { DarkModeContext } from "../hooks/DarkModeContext";

const getDetailColor = (isCompleted, darkMode) => {
  if (isCompleted && darkMode) return "var(--item-fontcolor-checked-dark)";
  else if (isCompleted && !darkMode)
    return "var(--item-fontcolor-checked-light)";
  else if (!isCompleted && darkMode) return "var(--item-fontcolor-dark)";
  else return "var(--item-fontcolor-light)";
};

const Item = styled.div`
  width: 100%;
  height: 75px;
  box-sizing: border-box;
  border-bottom: 1.6px solid
    ${(props) => (props.$darkMode ? "#46464d" : "#dfdfdf")};
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  border-radius: ${(props) => (props.$id === 0 ? "6px 6px 0px 0px" : "")};
  background-color: ${(props) =>
    props.$darkMode ? "var(--card-dark)" : "var(--card-light)"};
`;

const Detail = styled.p`
  // color: ${(props) => (props.$isCompleted ? "#b5b5b5" : "#5f5f5f")};
  color: ${(props) => getDetailColor(props.$isCompleted, props.$darkMode)};
  text-decoration: ${(props) => (props.$isCompleted ? "line-through" : "none")};
  text-decoration-thickness: ${(props) => (props.$isCompleted ? "1px" : "0")};
  font-size: 1.1em;
  font-family: var(--card-fonttype);
  margin: 0;
`;

const TodoItem = ({ id, item, toggleTodo, removeTodo }) => {
  const { darkMode } = useContext(DarkModeContext);

  console.log("dark mode:", darkMode);
  return (
    <Item $id={id} $darkMode={darkMode}>
      <Checkbox
        id={item.id}
        isCompleted={item.isCompleted}
        toggleTodo={toggleTodo}
      />
      <Detail $isCompleted={item.isCompleted} $darkMode={darkMode}>
        {item.detail}
      </Detail>
      <div className="remove-icon">
        <img
          src="/src/images/icon-cross.svg"
          onClick={() => removeTodo(item.id)}
        />
      </div>
    </Item>
  );
};

export default TodoItem;

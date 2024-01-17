import React, { useContext } from "react";
import TodoItem from "./TodoItem";
import styled from "styled-components";
import { DarkModeContext } from "../hooks/DarkModeContext";

const Main = styled.div`
  background-color: ${(props) =>
    props.$darkMode ? "var(--todo-card-dark)" : "var(--todo-card-light)"};
  width: 100%;
  border-radius: 6px 6px 0px 0px;
  box-shadow: var(--custom-shadow);
`;

const TodoMain = ({ todos, toggleTodo, todoFilter, removeTodo }) => {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <Main $darkMode={darkMode}>
      <ul className="item-list">
        {todos.filter(todoFilter).map((item, index) => (
          <TodoItem
            id={index}
            key={item.id}
            item={item}
            toggleTodo={toggleTodo}
            removeTodo={removeTodo}
          />
        ))}
      </ul>
    </Main>
  );
};

export default TodoMain;

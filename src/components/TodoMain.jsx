import { useContext } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import styled from "styled-components";
import TodoItem from "./TodoItem";
import ModeContext from "../hooks/ModeContext";

const getBackgroundColor = (darkMode) =>
  darkMode ? "var(--card-dark)" : "var(--card-light)";

const Main = styled.div`
  box-sizing: border-box;
  background-color: ${(props) => getBackgroundColor(props.$darkMode)};
  border-top: 6px solid ${(props) => getBackgroundColor(props.$darkMode)};
  width: 100%;
  border-radius: 6px 6px 0px 0px;
  box-shadow: var(--custom-shadow);
`;

const ItemList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const TodoMain = ({ todos, toggleTodo, todoFilter, removeTodo, moveTodo }) => {
  const { darkMode } = useContext(ModeContext);

  const itemList = todos
    .filter(todoFilter)
    .map((todo, index) => (
      <TodoItem
        key={todo.id}
        id={todo.id}
        index={index}
        detail={todo.detail}
        isCompleted={todo.isCompleted}
        toggleTodo={toggleTodo}
        removeTodo={removeTodo}
        moveTodo={moveTodo}
      />
    ));

  return (
    <DndProvider backend={HTML5Backend}>
      <Main $darkMode={darkMode}>
        <ItemList>{itemList}</ItemList>
      </Main>
    </DndProvider>
  );
};

export default TodoMain;

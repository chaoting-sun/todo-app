import React, { useContext, useState } from "react";
import Scenery from "../components/Scenery";
import TodoHeader from "../components/TodoHeader";
import TodoInput from "../components/TodoInput";
import TodoMain from "../components/TodoMain";
import TodoFooter from "../components/TodoFooter";
import CurrentTodos from "../database/currentTodos";
import { DarkModeContext } from "../hooks/DarkModeContext";
import styled from "styled-components";

let nextTodoId = 2;

const Reminder = styled.div`
  color: #a4a4a4;
  width: 100%;
  margin-top: 35px;
  font-family: var(--card-fonttype);
  text-align: center;
`

const statusFilter = {
  All: () => true,
  Active: (todo) => !todo.isCompleted,
  Completed: (todo) => todo.isCompleted,
};

const Root = () => {
  const { darkMode } = useContext(DarkModeContext);
  const [todos, setTodos] = useState(() => CurrentTodos);
  const [currentView, setCurrentView] = useState("All");

  const toggleTodo = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
    );
    setTodos(updatedTodos);
  };

  const removeTodo = (removeId) => {
    const newTodos = todos.filter(({ id }) => id !== removeId);
    setTodos(newTodos);
  };

  const addTodo = (todoDetail) => {
    setTodos((todos) =>
      todos.concat({
        id: nextTodoId,
        detail: todoDetail,
        isCompleted: false,
      })
    );
    nextTodoId += 1;
  };

  const clearCompleted = () => {
    setTodos((todos) => todos.filter(({ isCompleted }) => !isCompleted));
    console.log(
      "clear completed:",
      todos.filter(({ isCompleted }) => !isCompleted)
    );
  };

  const selectView = (selectedView) => setCurrentView(selectedView);

  const moveTodo = (dragId, hoverId) => {
    const newTodos = [...todos];
    newTodos.splice(dragId, 1);
    newTodos.splice(hoverId, 0, todos[dragId]);
    setTodos(newTodos);
  };

  return (
    <>
      <Scenery />
      <div id="todo-card">
        <TodoHeader />
        <TodoInput addTodo={addTodo} />
        <TodoMain
          todos={todos}
          toggleTodo={toggleTodo}
          todoFilter={statusFilter[currentView]}
          removeTodo={removeTodo}
          moveTodo={moveTodo}
        />
        <TodoFooter
          nLeftItems={todos.filter(({ isCompleted }) => !isCompleted).length}
          currentView={currentView}
          selectView={selectView}
          clearCompleted={clearCompleted}
        />
        <Reminder>
          Drag and drop to reorder list
        </Reminder>
      </div>
    </>
  );
};

export default Root;

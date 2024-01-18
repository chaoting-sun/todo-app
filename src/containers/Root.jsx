import React, { useContext, useState } from "react";
import Scenery from "../components/Scenery";
import TodoHeader from "../components/TodoHeader";
import TodoInput from "../components/TodoInput";
import TodoMain from "../components/TodoMain";
import TodoFooter from "../components/TodoFooter";
import { DarkModeContext } from "../hooks/DarkModeContext";

const currentTodos = [
  { id: 0, detail: "this is 1.", isCompleted: false },
  { id: 1, detail: "this is 2.", isCompleted: false },
];
let nextTodoId = 2;

const statusFilter = {
  All: () => true,
  Active: (todo) => !todo.isCompleted,
  Completed: (todo) => todo.isCompleted,
};

const Root = () => {
  const { darkMode } = useContext(DarkModeContext);
  const [todos, setTodos] = useState(() => currentTodos);
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
      </div>
    </>
  );
};

export default Root;

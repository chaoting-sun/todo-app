import React, { useContext, useState } from "react";
import Scenery from "../components/Scenery";
import Header from "../components/Header";
import TodoInput from "../components/TodoInput";
import TodoMain from "../components/TodoMain";
import TodoFooter from "../components/TodoFooter";
import { DarkModeContext } from "../hooks/DarkModeContext";

const statusFilter = {
  All: () => true,
  Active: (todo) => !todo.isCompleted,
  Completed: (todo) => todo.isCompleted,
};

const currentTodos = [
  { id: 0, detail: "this is 1.", isCompleted: false },
  { id: 1, detail: "this is 2.", isCompleted: false },
];

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
    const newId = todos.length ? todos[todos.length - 1].id + 1 : 0;
    setTodos((todos) =>
      todos.concat({ id: newId, detail: todoDetail, isCompleted: false })
    );
  };

  const clearCompleted = () => {
    setTodos((todos) => todos.filter(({ isCompleted }) => !isCompleted));
    console.log(
      "clear completed:",
      todos.filter(({ isCompleted }) => !isCompleted)
    );
  };

  const selectView = (selectedView) => setCurrentView(selectedView);

  return (
    <>
      <Scenery />
      <div id="todo-card">
        <Header />
        <TodoInput addTodo={addTodo} />
        <TodoMain
          todos={todos}
          toggleTodo={toggleTodo}
          todoFilter={statusFilter[currentView]}
          removeTodo={removeTodo}
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

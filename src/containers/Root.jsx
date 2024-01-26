import { useEffect, useState } from "react";
// import todoService from "../services/jsonServerTodos";
import todoService from "../services/todos";
import Scenery from "../components/Scenery";
import TodoHeader from "../components/TodoHeader";
import TodoInput from "../components/TodoInput";
import TodoMain from "../components/TodoMain";
import TodoFooter from "../components/TodoFooter";
import styled from "styled-components";

const Reminder = styled.div`
  color: #a4a4a4;
  width: 100%;
  margin-top: 35px;
  font-family: var(--card-fonttype);
  text-align: center;
`;

const statusFilter = {
  All: () => true,
  Active: (todo) => !todo.isCompleted,
  Completed: (todo) => todo.isCompleted,
};

const Root = () => {
  const [todos, setTodos] = useState([]);
  const [currentView, setCurrentView] = useState("All");

  // fetch current todos
  useEffect(() => {
    todoService
      .getAll()
      .then((currentTodos) => setTodos(currentTodos))
      .catch((err) => console.log("Error fetching todos:", err));
  }, []);

  const addTodo = (todoDetail) => {
    const newTodo = {
      detail: todoDetail,
      isCompleted: false,
    };
    todoService
      .create(newTodo)
      .then((savedTodo) => {
        setTodos((todos) => todos.concat(savedTodo));
      })
      .catch((err) => {
        console.log("Error adding todos:", err);
      });
  };

  const removeTodo = (removeId) => {
    todoService
      .remove(removeId)
      .then(() => {
        const newTodos = todos.filter(({ id }) => id !== removeId);
        setTodos(newTodos);
      })
      .catch((err) => {
        console.log("Error removing a todo:", err);
      });
  };

  const toggleTodo = (toggleId) => {
    const index = todos.findIndex(({ id }) => id === toggleId);
    todoService
      .update(todos[index].id, { isCompleted: !todos[index].isCompleted })
      .then((savedTodo) => {
        setTodos((prevTodos) =>
          prevTodos.map((todo, id) => (id === index ? savedTodo : todo))
        );
      })
      .catch((err) => console.log("Error toggle todos:", err));
  };

  const clearCompleted = () => {
    const uncompletedTodos = todos.filter(({ isCompleted }) => !isCompleted);
    const idsToDelete = todos
      .filter(({ isCompleted }) => isCompleted)
      .map(({ id }) => id);

    todoService
      .removeCompleted(idsToDelete)
      .then(() => {
        setTodos(uncompletedTodos);
      })
      .catch((err) => console.log("Error clearing all completed todos:", err));
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
        <Reminder>Drag and drop to reorder list</Reminder>
      </div>
    </>
  );
};

export default Root;

import { nanoid } from "nanoid";

const CurrentTodos = [
  {
    id: nanoid(),
    detail: "Clean my room before Chinese new year.",
    isCompleted: false,
  },
  {
    id: nanoid(),
    detail: "Learn to build a todo app in three days.",
    isCompleted: false,
  },
];

export default CurrentTodos;

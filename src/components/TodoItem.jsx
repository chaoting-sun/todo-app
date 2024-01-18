import React, { useContext, useRef, useState } from "react";
import styled from "styled-components";
import { DarkModeContext } from "../hooks/DarkModeContext";
import { useDrag, useDrop } from "react-dnd";
import Checkbox from "./Checkbox";
import ItemTypes from "./ItemTypes";
import CloseIcon from "@mui/icons-material/Close";

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
  background-color: ${(props) =>
    props.$darkMode ? "var(--card-dark)" : "var(--card-light)"};
  cursor: grab;
`;

const Detail = styled.p`
  margin-right: 45px;
  color: ${(props) => getDetailColor(props.$isCompleted, props.$darkMode)};
  text-decoration: ${(props) => (props.$isCompleted ? "line-through" : "none")};
  text-decoration-thickness: ${(props) => (props.$isCompleted ? "1px" : "0")};
  font-size: 1.1em;
  font-family: var(--card-fonttype);
`;

const RemoveIcon = styled.div`
  height: 20px;
  width: 20px;
  box-sizing: border-box;
  position: absolute;
  right: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #bebebe;
  border: 2px solid ${(props) => (props.$onHover ? "#bebebe" : "transparent")};
  border-radius: 50%;
  cursor: pointer;
`;

const TodoItem = ({
  id,
  index,
  detail,
  isCompleted,
  toggleTodo,
  removeTodo,
  moveTodo,
}) => {
  const { darkMode } = useContext(DarkModeContext);
  const [onHover, setOnHover] = useState(false);

  // reference: https://react-dnd.github.io/react-dnd/examples/sortable/simple

  const ref = useRef(null);

  const [{ handlerId }, drop] = useDrop({
    accept: ItemTypes.TODO,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragId = item.index;
      const hoverId = index;
      // Don't replace items with themselves
      if (dragId === hoverId) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragId < hoverId && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragId > hoverId && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action
      moveTodo(dragId, hoverId);
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverId;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.TODO,
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <Item
      ref={ref}
      onMouseEnter={() => setOnHover(true)}
      onMouseLeave={() => setOnHover(false)}
      data-hanlder-id={handlerId}
      $darkMode={darkMode}
    >
      <Checkbox id={id} isCompleted={isCompleted} toggleTodo={toggleTodo} />
      <Detail $isCompleted={isCompleted} $darkMode={darkMode}>
        {detail}
      </Detail>
      <RemoveIcon $onHover={onHover}>
        <CloseIcon onClick={() => removeTodo(id)} ></CloseIcon>
      </RemoveIcon>
    </Item>
  );
};

export default TodoItem;

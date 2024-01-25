import React, { useContext } from "react";
import ViewButton from "./ViewButton";
import ModeContext from "../hooks/ModeContext";
import styled from "styled-components";

const Footer = styled.div`
  background-color: ${(props) =>
    props.$darkMode ? "var(--card-dark)" : "var(--card-light)"};
  width: 100%;
  height: 60px;
  position: relative;
  border-radius: 0px 0px 6px 6px;
  box-shadow: var(--custom-shadow);
  display: flex;
  align-items: center;

  & * {
    color: var(--footer-fontcolor);
    font-family: var(--card-fonttype);
  }
`;

const Count = styled.span`
  font-size: 0.8em;
  display: inline-block;
  width: 25%;
  margin-left: 8px;
  user-select: none;
`;

const Clear = styled.span`
  font-size: 0.9em;
  margin-right: 8px;
  width: 30%;
  text-align: end;
  user-select: none;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  & p:hover {
    cursor: pointer;
    color: ${(props) =>
      props.$darkMode
        ? "var(--footer-fontcolor-hovered-dark)"
        : "var(--footer-fontcolor-hovered-light)"};
  }
`;

const TodoFooter = ({
  nLeftItems,
  currentView,
  selectView,
  clearCompleted,
}) => {
  const { darkMode } = useContext(ModeContext);

  return (
    <Footer $darkMode={darkMode}>
      <Count $darkMode={darkMode}>
        {nLeftItems} item{nLeftItems === 1 ? "" : "s"} left
      </Count>
      <ViewButton currentView={currentView} selectView={selectView} />
      <Clear $darkMode={darkMode}>
        <p onClick={clearCompleted}>Clear Completed</p>
      </Clear>
    </Footer>
  );
};

export default TodoFooter;

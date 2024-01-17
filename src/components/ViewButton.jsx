import React, { useContext, useState } from "react";
import { DarkModeContext } from "../hooks/DarkModeContext";
import styled from "styled-components";

const views = ["All", "Active", "Completed"];

const ButtonList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  width: 45%;
  display: flex;
  justify-content: center;

  & li {
    font-weight: bold;
    display: inline-block;
    margin-left: 6px;
    cursor: pointer;
    user-select: none;
  }

  & li:hover {
    // color: #5f5f5f;
    color: ${(props) =>
      props.$darkMode
        ? "var(--footer-fontcolor-hovered-dark)"
        : "var(--footer-fontcolor-hovered-light)"};
  }
`

const ViewButton = ({ currentView, selectView }) => {
  const { darkMode } = useContext(DarkModeContext);

  const handleSelectView = (selectedView) => {
    if (selectedView !== currentView) {
      selectView(selectedView);
    }
  };

  return (
    <ButtonList $darkMode={darkMode}>
      {views.map((view, index) => {
        return (
          <li
            key={index}
            onClick={() => handleSelectView(view)}
            className={currentView === view ? "view-selected" : ""}
          >
            {view}
          </li>
        );
      })}
    </ButtonList>
  );
};

export default ViewButton;
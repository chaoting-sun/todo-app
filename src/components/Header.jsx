import React, { useContext } from "react";
import { DarkModeContext } from "../hooks/DarkModeContext";
import styled from "styled-components";

const Title = styled.div`
  height: 100%;
  color: white;
  font-size: 3.8em;
  font-family: "Josefin Sans", sans-serif;
  display: inline-block;
`

const Icon = styled.div`
  height: 100%;
  display: inline-block;
`

const IconImg = styled.img`
  height: 45px;
  cursor: pointer;
`

const Header = () => {
  const {darkMode, toggleDarkMode} = useContext(DarkModeContext);

  return (
    <div className="todo-header">
      <Title>TODO</Title>
      <Icon>
        <IconImg
          src={darkMode ? "/src/images/icon-sun.svg" : "/src/images/icon-moon.svg"}
          onClick={toggleDarkMode}        
        />
      </Icon>
    </div>
  );
};

export default Header;

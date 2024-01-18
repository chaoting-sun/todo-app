import React, { useContext } from "react";
import { DarkModeContext } from "../hooks/DarkModeContext";
import styled from "styled-components";

const Header = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  justify-content: space-between;
  margin-top: 80px;
  margin-bottom: 0px;
`

const Title = styled.div`
  height: 100%;
  color: white;
  font-size: 3.2em;
  font-family: "Josefin Sans", sans-serif;
  display: inline-block;
  user-select: none;
`

const Icon = styled.div`
  height: 100%;
  display: inline-block;
`

const IconImg = styled.img`
  height: 40px;
  user-select: none;
  cursor: pointer;
`

const TodoHeader = () => {
  const {darkMode, toggleDarkMode} = useContext(DarkModeContext);

  return (
    <Header>
      <Title>TODO</Title>
      <Icon>
        <IconImg
          src={darkMode ? "/src/images/icon-sun.svg" : "/src/images/icon-moon.svg"}
          onClick={toggleDarkMode}        
        />
      </Icon>
    </Header>
  );
};

export default TodoHeader;

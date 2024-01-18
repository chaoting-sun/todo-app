import React, { useContext } from "react";
import { DarkModeContext } from "../hooks/DarkModeContext";
import styled from "styled-components";

const SceneryImg = styled.img`
  width: 100vw;
  height: 35vh;
  object-fit: cover;
`;

const Scenery = () => {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <SceneryImg
      src={
        darkMode
          ? "src/images/bg-desktop-dark.jpg"
          : "src/images/bg-desktop-light.jpg"
      }
      className="scenery"
    />
  );
};

export default Scenery;

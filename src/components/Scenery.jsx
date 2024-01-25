import { useContext } from "react";
import ModeContext from "../hooks/ModeContext";
import styled from "styled-components";

const SceneryImg = styled.img`
  width: 100vw;
  height: 35vh;
  object-fit: cover;
`;

const Scenery = () => {
  const { darkMode } = useContext(ModeContext);

  return (
    <SceneryImg
      src={
        darkMode
          ? "assets/bg-desktop-dark.jpg"
          : "assets/bg-desktop-light.jpg"
      }
      className="scenery"
    />
  );
};

export default Scenery;

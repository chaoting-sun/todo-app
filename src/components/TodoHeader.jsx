import { useContext } from "react";
import { DarkModeContext } from "../hooks/DarkModeContext";
import styled from "styled-components";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import DarkModeIcon from "@mui/icons-material/DarkMode";

const Header = styled.div`
  width: 100%;
  height: 50px;
  position: relative;
  display: flex;
  justify-content: space-between;
  margin-top: 80px;
  margin-bottom: 0px;
`;

const Title = styled.div`
  height: 100%;
  color: white;
  font-size: 3.2em;
  font-family: var(--card-fonttype);
  display: inline-block;
  user-select: none;
`;

const Icon = styled.div`
  height: 100%;
  display: inline-block;
`;

const IconStyles = {
  height: "100%",
  fontSize: "2.8em",
  color: "#ffffff",
  userSelect: "none",
  cursor: "pointer",
};

const TodoHeader = () => {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);

  return (
    <Header>
      <Title>T O D O</Title>
      <Icon>
        {darkMode ? (
          <WbSunnyIcon
            onClick={toggleDarkMode}
            style={IconStyles}
            sx={{ "&:hover": { color: "#ff0000 !important" } }}
          />
        ) : (
          <DarkModeIcon
            onClick={toggleDarkMode}
            style={IconStyles}
            sx={{ "&:hover": { color: "#ffff00 !important" } }}
          />
        )}
      </Icon>
    </Header>
  );
};

export default TodoHeader;

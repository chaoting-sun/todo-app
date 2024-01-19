import Root from "./containers/Root";
import { DarkModeProvider } from "./hooks/DarkModeContext";
import "./App.css";

const App = () => {
  return (
    <DarkModeProvider>
      <Root />
    </DarkModeProvider>
  )
};

export default App;

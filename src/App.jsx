import Root from "./containers/Root";
import ModeProvider from "./hooks/ModeProvider";
import "./App.css";

const App = () => {
  return (
    <ModeProvider>
      <Root />
    </ModeProvider>
  )
};

export default App;

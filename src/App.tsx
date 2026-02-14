// import { useContext } from "react";
import "./App.css";
import { ThemeProvider } from "./components/context/ThemeProvider";
import Pagination from "./components/pagination/Pagination";
// import CounterApp from "./components/counter-app/CounterApp";
// import TodoApp from "./components/todo-input-app/TodoApp";

function App() {
  return (
    <ThemeProvider>
      {/* <CounterApp /> */}
      {/* <TodoApp /> */}
      <Pagination />
    </ThemeProvider>
  );
}

export default App;

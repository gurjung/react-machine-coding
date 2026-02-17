// import { useContext } from "react";
import "./App.css";
// import { ThemeProvider } from "./components/context/ThemeProvider";
// import Pagination from "./components/pagination/Pagination";
// import ProgressBar from "./components/progress-bar/ProgressBar";
// import Searchbar from "./components/searchbar/Searchbar";
// import StarRating from "./components/star-rating/StarRating";
import TicTacToe from "./components/tic-tac-toe/TicTacToe";
// import CounterApp from "./components/counter-app/CounterApp";
// import TodoApp from "./components/todo-input-app/TodoApp";

function App() {
  return (
    // <ThemeProvider>
    /* <CounterApp /> */
    /* <TodoApp /> */
    // <Pagination />
    // </ThemeProvider>
    <>
      {/* <ProgressBar value={67}/> */}
      {/* <StarRating /> */}
      {/* <Searchbar /> */}
      <TicTacToe />
    </>
  );
}

export default App;

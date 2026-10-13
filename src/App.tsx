// import { useContext } from "react";
import "./App.css";
import Modal from "./components/modal/Modal";
// import { FileUpload } from "./components/file-upload/FileUpload";
// import Accordion from "./components/accordion/Accordion";
// import { ThemeProvider } from "./components/context/ThemeProvider";
// import NewPagination from "./components/pagination/NewPagination";
// import Pagination from "./components/pagination/Pagination";
// import Products from "./components/pagination/Products";
// import ProgressBar from "./components/progress-bar/ProgressBar";
// import Searchbar from "./components/searchbar/Searchbar";
// import StarRating from "./components/star-rating/StarRating";
// import TicTacToe from "./components/tic-tac-toe/TicTacToe";
// import CounterApp from "./components/counter-app/CounterApp";
// import TodoApp from "./components/todo-input-app/TodoApp";
// import KanbanBoard from "./components/drag-drop/KanbanBoard";
// import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
// import LoginPage from "./components/protected-routes/login/LoginPage";
// import HomePage from "./components/protected-routes/home/HomePage";
// import PublicRoute from "./components/protected-routes/routes/PublicRoute";
// import PrivateRoute from "./components/protected-routes/routes/PrivateRoute";

{
  /* <Route element={<PublicRoute />}>
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
  <Route path="/forgot-password" element={<ForgotPassword />} />
</Route> */
}

// can be used like this but with outlet

function App() {
  return (
    // <BrowserRouter>
    //   {/* Routes */}
    //   <Routes>
    //     {/* public route */}

    //     <Route
    //       path="/login"
    //       element={
    //         <PublicRoute>
    //           <LoginPage />
    //         </PublicRoute>
    //       }
    //     />

    //     {/* private route */}
    //     <Route
    //       path="/home"
    //       element={
    //         <PrivateRoute>
    //           <HomePage />
    //         </PrivateRoute>
    //       }
    //     />
    //   </Routes>
    // </BrowserRouter>
    // <FileUpload />
    <Modal />
  );
}

export default App;

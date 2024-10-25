import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FindId from "./pages/login/FindId";
import FindPw from "./pages/login/FindPw";
import LoginForm from "./pages/login/LoginForm";
import SignUpForm from "./pages/login/SignUpForm";
import TodoMain from "./pages/todo/TodoMain";
import "./style.css";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/FindId" element={<FindId />} />
          <Route path="/FindPw" element={<FindPw />} />
          <Route path="/SignUpForm" element={<SignUpForm />} />
          <Route path="/TodoMain" element={<TodoMain />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

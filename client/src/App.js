import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Components/Signup/Login";
import Home from "./Components/Home";

const App = () => {
  return (
    <div className="app">
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  );
};

export default App;

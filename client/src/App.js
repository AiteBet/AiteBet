import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Components/Signup/Login";
import Home from "./Components/Home";
import CreateBet from "./Components/CreateBet"

const App = () => {
  return (
    <div className="app">
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/bets/create" element={<CreateBet />} />
      </Routes>
    </div>
  );
};

export default App;

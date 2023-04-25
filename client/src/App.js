import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Components/Signup/Login";
import Home from "./Components/Home";
import CreateBet from "./Components/CreateBet"
import Signup from "./Components/Signup/Signup"

const App = () => {
  return (
    <div className="app">
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/bets/create" element={<CreateBet />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
};

export default App;

import React, { useState, createContext } from "react";

const StateContext = createContext(null);

const StateProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [usersBets, setUsersBets] = useState([]);

  return (
    <StateContext.Provider value={{ user, setUser, usersBets, setUsersBets }}>
      {children}
    </StateContext.Provider>
  );
};

export { StateContext, StateProvider };

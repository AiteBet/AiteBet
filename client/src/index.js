import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { StateProvider } from "./context/StateContext";
import App from "./App";

const container = document.getElementById("app");
const root = createRoot(container);
root.render(
  // <React.StrictMode>
    <BrowserRouter>
      <StateProvider>
        <App />
      </StateProvider>
    </BrowserRouter>
  // </React.StrictMode>
);

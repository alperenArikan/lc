import Context from "app/store/context";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "./app/router";

const App = () => {
  return (
    <BrowserRouter>
      <Context>
        <Router></Router>
      </Context>
    </BrowserRouter>
  );
};

export default App;

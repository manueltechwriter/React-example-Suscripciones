import React from "react";

import { Router } from "@reach/router";

import Result from "./routes/Result";
import Plans from "./routes/Plans";
import Subscribe from "./routes/Subscribe";

import { AppProvider } from "./context/AppContext";

import "normalize.css";
import "./styles.scss";

export default function App() {
  return (
    <AppProvider>
      <Router>
        <Plans path="/" />
        <Subscribe path="/subscribe/:plan" />
        <Result path="/result" />
      </Router>
    </AppProvider>
  );
}

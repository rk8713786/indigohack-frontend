import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { FlightProvider } from "./Contexts/Flights";

ReactDOM.render(
  <FlightProvider>
    <App />
  </FlightProvider>,

  document.getElementById("root")
);

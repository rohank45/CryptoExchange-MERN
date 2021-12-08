import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import "react-alice-carousel/lib/alice-carousel.css";
import CryptoContext from "./Components/CryptoContext";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// toast.configure();

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <CryptoContext>
        <App />
        <ToastContainer
          className="foo"
          style={{ width: "350px", fontWeight: "bold" }}
        />
      </CryptoContext>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

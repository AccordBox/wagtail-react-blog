import React from "react";
import ReactDOM from "react-dom";
import axios from 'axios';
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.scss";

if (process.env.REACT_APP_API_URL) {
  axios.defaults.baseURL = process.env.REACT_APP_API_URL;
}

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

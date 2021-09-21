import "./index.css";
import React from "react";
import ReactDOM from "react-dom";
import Movie from "./components/movie_comp/movie";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.min.css";

ReactDOM.render(
  <React.StrictMode>
    <Movie />
  </React.StrictMode>,
  document.getElementById("root")
);

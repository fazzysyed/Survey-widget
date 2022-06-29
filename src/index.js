import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
const myScript = window.censuble_survey;
var censuble_survey = {
  device_token: "GFGZ-GFG-ZQD",
  survey_token: "",
  embed_type: "tab",
  embed_location: "survey_div",
  testmode: "true",
};

ReactDOM.render(
  <React.StrictMode>
    <App censuble_survey={censuble_survey} />
  </React.StrictMode>,
  censuble_survey.embed_type === "tab"
    ? document.body.appendChild(document.createElement("DIV"))
    : document.getElementById(censuble_survey.embed_location)
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

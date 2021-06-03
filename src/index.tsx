/*
 * @Descripttion:
 * @Author: Wei
 * @Date: 2021-04-20 21:57:53
 * @LastEditors: Wei
 * @LastEditTime: 2021-05-21 11:20:21
 * @FilePath: /play-back/src/index.tsx
 */
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "antd/dist/antd.dark.css";
import "react-grid-layout/css/styles.css";
import "./style/global.less";

//visit http://127.0.0.1:3000/
ReactDOM.render(
  // <React.StrictMode>
  <App />,
  // </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import "@babel/polyfill";
import React from "react";
import ReactDOM from "react-dom";

import MainContainer from "./components/container/MainContainer";

// eslint-disable-next-line no-undef
ReactDOM.render(<MainContainer />, document.getElementById("root"));

module.hot.accept();

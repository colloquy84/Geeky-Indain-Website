import React from "react";
import { hydrate, render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../vendor/fontawesome-free/css/all.min.css";
import "./css/index.css";

import App from "./components/App";

import configureStore from "./redux/configureStore";
import { Provider as ReduxProvider } from "react-redux";

const store = configureStore();

const rootElement = document.getElementById('mainApp');
if (rootElement.hasChildNodes()) {
    hydrate(
      <ReduxProvider store={store}>
        <Router>
          <App />
        </Router>
      </ReduxProvider>, rootElement);
} else {
    render(
      <ReduxProvider store={store}>
        <Router>
          <App />
        </Router>
      </ReduxProvider>, rootElement);
}

// render(
//   <ReduxProvider store={store}>
//     <Router>
//       <App />
//     </Router>
//   </ReduxProvider>,
//   document.getElementById("mainApp")
// );

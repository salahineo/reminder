// Libraries
import React from "react";
import ReactDom from "react-dom";
import {createStore} from "redux";
import {Provider} from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";

// Reducers
import root from "./reducers/root";

// CSS
import './index.css'

// Components
import App from "./components/App/App";

// Create Store
const store = createStore(root);

ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

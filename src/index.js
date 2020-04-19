import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import index from "./js/index";
import 'font-awesome/css/font-awesome.min.css';

import App from "./App";
import * as serviceWorker from "./serviceWorker";
import ProductStore from "./mobx/store/store";
//redux
import store from "./js/store/index"
// import { Provider } from "react-redux";

import { Provider } from "mobx-react";
// ReactDOM.render(
//     <Provider store={store}>
//       <BrowserRouter>
//         <App />
//       </BrowserRouter>
//     </Provider>,
//   document.getElementById("root")
// );

const productStore = new ProductStore();
//mobx
ReactDOM.render(
    <Provider productStore={productStore} >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
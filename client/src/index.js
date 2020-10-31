import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { ColorReducer } from "./reducers/ColorReducer";
import { UsersReducer } from "./reducers/UsersReducer";
import { MessageReducer } from "./reducers/MessageReducer";
const rootReducer = combineReducers({
  ColorReducer: ColorReducer,
  UsersReducer: UsersReducer,
  MessageReducer: MessageReducer,
});
const store = createStore(rootReducer, applyMiddleware(thunk));
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import { React } from "react";
import ReactDOM from "react-dom/client";

import { Provider } from "react-redux";

import App from "./App";

import {
	legacy_createStore as createStore,
	applyMiddleware,
	compose,
} from "redux";

import thunk from "redux-thunk";

import reducers from "./reducers";

const store = createStore(reducers, compose(applyMiddleware(thunk)));

export default store;

ReactDOM.createRoot(document.getElementById("root")).render(
	<Provider store={store}>
		<App />
	</Provider>
);

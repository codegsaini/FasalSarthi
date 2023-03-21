import React from "react";
import ReactDOM from "react-dom/client";
import "./style/css/Main.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import PassReset from "./components/PassReset";
import Home from "./components/Home";
import { Provider } from "react-redux";
import { store } from "./app/store";
import ManageFarm from "./components/ManageFarm";
import Login from "./components/Login";
import Register from "./components/Register";
import UploadService from "./components/UploadService";

const root = ReactDOM.createRoot(document.getElementById("root-container"));
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<Provider store={store}>
				<Routes>
					<Route path="/" element={<Layout />}>
						<Route index element={<Home />} />
					</Route>
					<Route path="manage-farm" element={<ManageFarm />} />
					<Route path="pass-reset" element={<PassReset />} />
					<Route path="login" element={<Login />} />
					<Route path="register" element={<Register />} />
					<Route path="submit-service" element={<UploadService />} />
				</Routes>
			</Provider>
		</BrowserRouter>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

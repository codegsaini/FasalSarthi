import axios from "axios";
import { API_URL } from "../../components/util/ApiUtil";

const REGISTER_API = API_URL + "signup";
const LOGIN_API = API_URL + "login";

//Register user
const register = async (userData) => {
	const response = await axios.post(REGISTER_API, userData);
	if (response.data) {
		localStorage.setItem("user", JSON.stringify(response.data));
	}

	return response.data;
};

//Login user
const login = async (userData) => {
	const response = await axios.post(LOGIN_API, userData);

	if (response.data) {
		localStorage.setItem("user", JSON.stringify(response.data));
	}

	return response.data;
};

const logout = async () => {
	localStorage.removeItem("user");
};

const authService = {
	register,
	logout,
	login,
};

export default authService;

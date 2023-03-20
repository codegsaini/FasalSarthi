import axios from "axios";
import { API_URL } from "../../components/util/ApiUtil";

const LOGIN_API = API_URL + "login";

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
	logout,
	login,
};

export default authService;

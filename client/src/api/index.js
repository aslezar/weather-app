import axios from "axios";

const API =
	import.meta.env.DEV === true
		? axios.create({ baseURL: "http://localhost:5000" })
		: axios.create({ baseURL: "/" });

API.interceptors.request.use((req) => {
	if (
		localStorage.getItem("user_info") &&
		JSON.parse(localStorage.getItem("user_info")) !== null
	) {
		req.headers.Authorization = `Bearer ${
			JSON.parse(localStorage.getItem("user_info")).token
		}`;
	}

	return req;
});

export const signIn = (data) => API.post("/users/signin", data);
export const signUp = (data) => API.post("/users/signup", data);

export const signInGoogle = (accessToken) =>
	API.post("/users/signin", {
		googleAccessToken: accessToken,
	});

export const signUpGoogle = (accessToken) =>
	API.post("/users/signup", {
		googleAccessToken: accessToken,
	});

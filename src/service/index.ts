import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchTodos = (limit: number, skip: number) => {
	return axios.get(`${API_BASE_URL}/todos?limit=${limit}&skip=${skip}`);
};

export const fetchUsers = () => {
	return axios.get(`${API_BASE_URL}/users`);
};

export const fetchTodosByUser = (userId: number) => {
	return axios.get(`${API_BASE_URL}/todos/user/${userId}`);
};

export const fetchUserDetails = (userId: number) => {
	return axios.get(`${API_BASE_URL}/users/${userId}`);
};

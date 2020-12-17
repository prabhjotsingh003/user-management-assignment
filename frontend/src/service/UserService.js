import axios from "axios";

const SERVER_URL = "http://localhost:8081";

export const getUserList = async () => {
  return axios.get(SERVER_URL + "/users");
};

export const userAuth = async (input) => {
  return axios.post(SERVER_URL + "/auth", input);
};

export const createUser = async (input) => {
  return axios.post(SERVER_URL + "/users", input);
};

export const deleteUser = async (id) => {
  return axios.delete(SERVER_URL + "/users/" + id);
};

export const getUserById = async (id) => {
  return axios.get(SERVER_URL + "/users/" + id);
};

export const updateUser = async (id, input) => {
  return axios.put(SERVER_URL + "/users/" + id, input);
};

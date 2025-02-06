import axios from "axios";

const API_URL = "http://localhost:3000";
export const signUp = async ({ user, isGoogle = false }) => {
  if (isGoogle) {
    window.location.href = `${API_URL}/auth/google`;
    return;
  }
  try {
    const response = await axios.post(`${API_URL}/api/users/signup`, user, {
      withCredentials: true,
    });
    console.log(response);
    return response;
  } catch (error) {
    return error;
  }
};

export const fetchUserInfo = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/users/fetchUser`, {
      withCredentials: true,
    });
    console.log(response);
    return response;
  } catch (error) {
    return error;
  }
};

export const login = async ({ user, isGoogle = false }) => {
  if (isGoogle) {
    window.location.href = `${API_URL}/auth/google`;
    return;
  }
  try {
    const response = await axios.post(`${API_URL}/api/users/login`, user, {
      withCredentials: true,
    });
    console.log(response.data);
    return response;
  } catch (error) {
    return error;
  }
};

export const logout = async () => {
  try {
    const response = await axios.get(`${API_URL}/logout`, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    return error;
  }
};

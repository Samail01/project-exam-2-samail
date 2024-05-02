import axios from "axios";

const API_BASE_URL = "https://v2.api.noroff.dev";
const API_KEY = localStorage.getItem("API_KEY"); // Ensure the API key is stored in localStorage

const apiInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "X-Noroff-API-Key": API_KEY, // Use the API key
  },
});

export const registerUser = async (userData) => {
  try {
    const response = await apiInstance.post("/auth/register", {
      name: userData.name,
      email: userData.email,
      password: userData.password,
      avatar: userData.avatar
        ? {
            url: userData.avatar,
            alt: "User avatar",
          }
        : undefined,
      venueManager: userData.venueManager,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Registration failed:",
      error.response ? error.response.data : error
    );
    throw new Error(error.response?.data?.message || "Registration failed");
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await apiInstance.post("/auth/login", { email, password });
    return response.data.accessToken;
  } catch (error) {
    console.error("Login error:", error.response ? error.response.data : error);
    throw new Error(error.response?.data?.message || "Authentication failed");
  }
};

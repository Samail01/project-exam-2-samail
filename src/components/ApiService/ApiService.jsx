import axios from "axios";

const API_BASE_URL = "https://v2.api.noroff.dev";
const API_KEY = localStorage.getItem("API_KEY");

const apiInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "X-Noroff-API-Key": API_KEY,
  },
});

export const profileUrl = (name) => {
  console.log("Fetching profile URL for:", name);
  return `https://v2.api.noroff.dev/holidaze/profiles/${name}?_owner=true&_bookings=true`;
};

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
    const { accessToken, name } = response.data.data;

    if (accessToken && name) {
      localStorage.setItem("token", accessToken);
      localStorage.setItem("userName", name);
    } else {
      console.error("Missing access token or user name in the login response");
    }

    return response.data;
  } catch (error) {
    console.error("Login error:", error.response ? error.response.data : error);
    throw new Error(error.response?.data?.message || "Authentication failed");
  }
};

export const fetchVenueDetails = async (venueId) => {
  try {
    const response = await apiInstance.get(`/holidaze/venues/${venueId}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching venue details:", error);
    throw new Error(
      error.response?.data?.message || "Error fetching venue details"
    );
  }
};

export const fetchProfileDetails = async (userName) => {
  const url = profileUrl(userName);
  try {
    const response = await apiInstance.get(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error("Error fetching profile details:", error);
    throw error;
  }
};

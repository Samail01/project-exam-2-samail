import axios from "axios";

const API_BASE_URL = "https://v2.api.noroff.dev";
const API_KEY = "bd4873af-e59d-48b6-996a-63a300dadda8";

const apiInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json",
    "X-Noroff-API-Key": API_KEY,
  },
});

export const profileUrl = (name) =>
  `${API_BASE_URL}/holidaze/profiles/${name}?_owner=true&_bookings=true`;

export const registerUser = async (userData) => {
  const payload = {
    ...userData,
    avatar: userData.avatar
      ? {
          url: userData.avatar,
          alt: "User avatar",
        }
      : undefined,
  };

  try {
    const response = await apiInstance.post("/auth/register", payload);
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
      return { accessToken, name };
    } else {
      throw new Error(
        "Missing access token or user name in the login response"
      );
    }
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
  try {
    const response = await apiInstance.get(profileUrl(userName));
    return response.data.data;
  } catch (error) {
    console.error("Error fetching profile details:", error);
    throw error;
  }
};

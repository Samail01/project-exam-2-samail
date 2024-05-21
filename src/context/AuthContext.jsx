import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userName = localStorage.getItem("userName");
    console.log(`Loaded from storage - Token: ${token}, UserName: ${userName}`);
    if (token && userName) {
      setIsAuthenticated(true);
      fetchUserProfile(userName);
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post("/auth/login", { email, password });
      const responseData = await response.data;

      if (responseData.errors) {
        throw new Error(responseData.errors[0].message || "Login failed");
      }

      if (responseData.data.accessToken && responseData.data.name) {
        localStorage.setItem("token", responseData.data.accessToken);
        localStorage.setItem("userName", responseData.data.name);
        setIsAuthenticated(true);
        await fetchUserProfile(responseData.data.name);
        console.log("Login successful");
      } else {
        console.error(
          "Missing access token or user name in the login response"
        );
      }
    } catch (error) {
      console.error(
        "Login error:",
        error.response ? error.response.data : error
      );
      throw new Error(error.response?.data?.message || "Authentication failed");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    setIsAuthenticated(false);
    setCurrentUser(null);
  };

  const fetchUserProfile = async (userName) => {
    const token = localStorage.getItem("token");
    const apiKey = localStorage.getItem("API_KEY");

    console.log("Using token: ", token);
    console.log("Using API Key: ", apiKey);

    const headers = {
      Authorization: `Bearer ${token}`,
      "X-Noroff-API-Key": apiKey,
    };

    console.log("Headers being sent: ", headers);

    try {
      const response = await axios.get(`/holidaze/profiles/${userName}`, {
        headers,
      });
      setCurrentUser(response.data.data);
    } catch (error) {
      console.error("Failed to fetch user profile", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, currentUser, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

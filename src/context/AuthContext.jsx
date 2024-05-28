import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const API_URL = "https://v2.api.noroff.dev";
const LOGIN_URL = `${API_URL}/auth/login`;
const PROFILE_URL = (userName) => `${API_URL}/holidaze/profiles/${userName}`;
const API_KEY = "bd4873af-e59d-48b6-996a-63a300dadda8"; // Hardcoded API key

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userName = localStorage.getItem("userName");
    if (token && userName) {
      setIsAuthenticated(true);
      fetchUserProfile(userName);
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post(
        LOGIN_URL,
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
            "X-Noroff-API-Key": API_KEY,
          },
        }
      );
      const { accessToken, name } = response.data.data;

      if (accessToken && name) {
        localStorage.setItem("token", accessToken);
        localStorage.setItem("userName", name);
        setIsAuthenticated(true);
        fetchUserProfile(name);
      } else {
        throw new Error(
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

    try {
      const response = await axios.get(PROFILE_URL(userName), {
        headers: {
          Authorization: `Bearer ${token}`,
          "X-Noroff-API-Key": API_KEY,
        },
      });
      setCurrentUser(response.data.data);
    } catch (error) {
      console.error("Failed to fetch user profile", error);
      setCurrentUser(null);
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

export { AuthContext };

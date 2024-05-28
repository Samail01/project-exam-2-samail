import { useState } from "react";
import axios from "axios";

const API_BASE_URL = "https://v2.api.noroff.dev/holidaze/venues";
const API_KEY = "bd4873af-e59d-48b6-996a-63a300dadda8";

const useVenueManager = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const createVenue = async (venueData) => {
    setIsLoading(true);
    try {
      const response = await axios.post(API_BASE_URL, venueData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "X-Noroff-API-Key": API_KEY,
          "Content-Type": "application/json",
        },
      });
      setIsLoading(false);
      console.log("Venue creation response:", response.data);
      return response.data;
    } catch (err) {
      setIsLoading(false);
      console.error(
        "Error creating venue:",
        err.response ? err.response.data : err
      );
      setError(err);
      throw err;
    }
  };

  const updateVenue = async (id, venueData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/${id}`, venueData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "X-Noroff-API-Key": API_KEY,
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (err) {
      console.error(
        "Error updating venue:",
        err.response ? err.response.data : err
      );
      throw err;
    }
  };

  const deleteVenue = async (id) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "X-Noroff-API-Key": API_KEY,
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (err) {
      console.error(
        "Error deleting venue:",
        err.response ? err.response.data : err
      );
      throw err;
    }
  };

  return { createVenue, updateVenue, deleteVenue, isLoading, error };
};

export default useVenueManager;

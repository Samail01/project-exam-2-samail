import { useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = "https://v2.api.noroff.dev";
const API_KEY = "bd4873af-e59d-48b6-996a-63a300dadda8";

const useProfile = (userName) => {
  const [profile, setProfile] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      if (!userName) return;

      setLoading(true);
      try {
        const headers = {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "X-Noroff-API-Key": API_KEY,
          "Content-Type": "application/json",
        };

        const profileResponse = await axios.get(
          `${API_BASE_URL}/holidaze/profiles/${userName}`,
          { headers }
        );
        setProfile(profileResponse.data.data);

        const bookingsResponse = await axios.get(
          `${API_BASE_URL}/holidaze/profiles/${userName}/bookings`,
          { headers }
        );
        setBookings(bookingsResponse.data.data);

        const venuesResponse = await axios.get(
          `${API_BASE_URL}/holidaze/profiles/${userName}/venues`,
          { headers }
        );
        setVenues(venuesResponse.data.data);
      } catch (err) {
        setError(err.message || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [userName]);

  return { profile, bookings, venues, loading, error };
};

export default useProfile;

import axios from "axios";
import { useState } from "react";

const API_BASE_URL = "https://v2.api.noroff.dev/holidaze/bookings";
const API_KEY = "bd4873af-e59d-48b6-996a-63a300dadda8";

const useBooking = () => {
  const [bookingMessage, setBookingMessage] = useState("");
  const [isBookingSuccess, setIsBookingSuccess] = useState(false);

  const bookVenue = async (startDate, endDate, venueId, guests = 1) => {
    const formattedStartDate = startDate.toISOString().split("T")[0];
    const formattedEndDate = endDate.toISOString().split("T")[0];

    const token = localStorage.getItem("token");

    if (!token || !API_KEY) {
      setBookingMessage("Authentication failed. Please log in again.");
      setIsBookingSuccess(false);
      return;
    }

    try {
      const response = await axios.post(
        API_BASE_URL,
        {
          dateFrom: formattedStartDate,
          dateTo: formattedEndDate,
          guests,
          venueId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "X-Noroff-API-Key": API_KEY,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Booking response:", response.data);
      setBookingMessage("Venue booked successfully!");
      setIsBookingSuccess(true);
    } catch (error) {
      console.error(
        "Booking error:",
        error.response ? error.response.data : error
      );
      setBookingMessage(
        "Failed to book venue. " +
          (error.response?.data?.message || error.message)
      );
      setIsBookingSuccess(false);
    }
  };

  return { bookVenue, bookingMessage, isBookingSuccess };
};

export default useBooking;

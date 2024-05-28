import { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useParams } from "react-router-dom";
import { fetchVenueDetails } from "../../components/ApiService/ApiService";
import useBooking from "../../hook/useBooking";
import axios from "axios";

const Specific = () => {
  const { id } = useParams();
  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRange, setSelectedRange] = useState({
    from: undefined,
    to: undefined,
  });
  const { bookVenue, bookingMessage, isBookingSuccess } = useBooking();
  const [disabledDays, setDisabledDays] = useState([]);

  useEffect(() => {
    const loadVenue = async () => {
      try {
        const data = await fetchVenueDetails(id);
        setVenue(data);

        const token = localStorage.getItem("token");
        if (token) {
          try {
            const bookingsResponse = await axios.get(
              `https://v2.api.noroff.dev/holidaze/venues/${id}/bookings`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "X-Noroff-API-Key": "bd4873af-e59d-48b6-996a-63a300dadda8",
                  "Content-Type": "application/json",
                },
              }
            );

            const bookings = bookingsResponse.data.data;
            const disabledDates = bookings.map((booking) => ({
              from: new Date(booking.dateFrom),
              to: new Date(booking.dateTo),
            }));

            setDisabledDays(disabledDates);
          } catch (bookingsError) {
            if (
              bookingsError.response &&
              bookingsError.response.status === 404
            ) {
              console.warn("No bookings found for this venue.");
            } else {
              throw bookingsError;
            }
          }
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadVenue();
  }, [id]);

  const handleBookNow = () => {
    if (!selectedRange.from || !selectedRange.to) {
      alert("Please select both check-in and check-out dates.");
      return;
    }
    bookVenue(selectedRange.from, selectedRange.to, id);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!venue) return <div>No venue found.</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3">
          <img
            src={
              venue.media && venue.media.length > 0
                ? venue.media[0].url
                : "path/to/default-image.jpg"
            }
            alt={venue.name || "Default Venue"}
            className="rounded-lg shadow-lg h-auto w-full object-cover mb-4"
          />
          <div>
            <h3 className="font-semibold text-lg">Location:</h3>
            <p>
              {venue.location.address}, {venue.location.city}
            </p>
          </div>
        </div>
        <div className="md:w-2/3 md:pl-6">
          <h1 className="text-3xl font-bold text-gray-900">{venue.name}</h1>
          <p className="text-gray-700 my-2">{venue.description}</p>
          <p className="my-2">
            <strong>Price:</strong> {venue.price} NOK / Night
          </p>
          <p>
            <strong>Max Guests:</strong> {venue.maxGuests}
          </p>
          <div className="my-4">
            <DayPicker
              mode="range"
              selected={selectedRange}
              onSelect={setSelectedRange}
              disabled={disabledDays}
              footer={
                selectedRange.from && selectedRange.to
                  ? `Selected from ${selectedRange.from.toLocaleDateString()} to ${selectedRange.to.toLocaleDateString()}`
                  : "Please select the first day."
              }
            />
          </div>
          <button
            onClick={handleBookNow}
            className="bg-primary text-white font-bold py-2 px-4 rounded"
            style={{ maxWidth: "200px" }}
          >
            Book Now
          </button>
          {bookingMessage && (
            <p
              className={`${
                isBookingSuccess ? "text-green-500" : "text-red-500"
              } mt-2`}
            >
              {bookingMessage}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Specific;

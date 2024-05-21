import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchVenueDetails } from "../../components/ApiService/ApiService";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { enGB } from "date-fns/locale";
import defaultImage from "../../assets/default-venue.jpg";

registerLocale("en-GB", enGB);

const Specific = () => {
  const { id } = useParams();
  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookedDates, setBookedDates] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    const loadVenue = async () => {
      try {
        const data = await fetchVenueDetails(id);
        setVenue(data);
        setBookedDates(
          data.bookedDates ? data.bookedDates.map((date) => new Date(date)) : []
        );
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadVenue();
  }, [id]);

  const isDateBooked = (date) => {
    return bookedDates.some(
      (bookedDate) =>
        date.getDate() === bookedDate.getDate() &&
        date.getMonth() === bookedDate.getMonth() &&
        date.getFullYear() === bookedDate.getFullYear()
    );
  };

  const filterDates = (date) => {
    return !isDateBooked(date);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!venue) return <div>No venue found.</div>;

  const imageUrl =
    venue.media && venue.media.length > 0 ? venue.media[0].url : defaultImage;

  return (
    <div className="max-w-7xl mx-auto mt-10 p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
      <img
        src={imageUrl}
        alt={venue.name || "Default Venue"}
        className="w-full h-64 object-cover rounded-lg"
      />
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-3xl font-bold">{venue.name}</h2>
        <p className="text-gray-700">{venue.description}</p>
        <p className="py-2">
          <strong>Price:</strong> {venue.price} NOK / Night
        </p>
        <p>
          <strong>Max Guests:</strong> {venue.maxGuests}
        </p>
        <DatePicker
          selected={startDate}
          onChange={(dates) => {
            const [start, end] = dates;
            setStartDate(start);
            setEndDate(end);
          }}
          startDate={startDate}
          endDate={endDate}
          minDate={new Date()}
          selectsRange
          inline
          filterDate={filterDates}
          locale="en-GB"
          dayClassName={(date) =>
            isDateBooked(date)
              ? "bg-red-500 text-white"
              : "bg-green-500 text-white"
          }
        />
        <button className="mt-4 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Book Now
        </button>
      </div>
    </div>
  );
};

export default Specific;

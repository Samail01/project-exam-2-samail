import { useNavigate } from "react-router-dom";
import heroImage from "../../assets/exam-hero-section.jpg";
import defaultImage from "../../assets/default-venue.jpg";
import { useFetchVenues } from "../../hook/useFetch";
import { useState } from "react";

export function Home() {
  const navigate = useNavigate();
  const { data: venues, loading, error } = useFetchVenues();
  const [searchTerm, setSearchTerm] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [guestCount, setGuestCount] = useState("");

  const handleExplore = () => {
    navigate("/venues");
  };

  const handleVenueClick = (id) => {
    navigate(`/specific/${id}`);
  };

  const filteredVenues = venues
    ?.filter(
      (venue) =>
        venue.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        venue.price <= (maxPrice || Infinity) &&
        venue.maxGuests >= (guestCount || 0)
    )
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 10);

  return (
    <div className="min-h-screen bg-gray-100">
      <div
        className="h-[40vh] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="text-center p-4 bg-white bg-opacity-80 rounded-lg shadow-xl">
          <h1 className="text-4xl font-bold text-gray-800 mb-3">
            Escape the Everyday - Discover Your Perfect Getaway with Holidaze
          </h1>
          <button
            onClick={handleExplore}
            className="bg-primary text-white font-bold py-2 px-4 rounded-lg transition duration-300"
          >
            Explore
          </button>
        </div>
      </div>

      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
            <h2 className="text-xl font-bold text-center mb-4">
              Search for Venues
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  placeholder="Search by name..."
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div>
                <label className="block font-medium text-gray-700">Price</label>
                <input
                  type="number"
                  placeholder="Max price per night..."
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
              </div>
              <div>
                <label className="block font-medium text-gray-700">
                  Max Guests
                </label>
                <input
                  type="number"
                  placeholder="Minimum guests..."
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  onChange={(e) => setGuestCount(e.target.value)}
                />
              </div>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-center mb-6">
            Popular Destinations
          </h2>
          {loading && <div className="text-center">Loading...</div>}
          {error && (
            <div className="text-center text-red-500">
              Error fetching venues: {error.message}
            </div>
          )}
          {!loading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredVenues.map((venue) => (
                <div
                  key={venue.id}
                  className="max-w-sm rounded overflow-hidden shadow-lg bg-white cursor-pointer"
                  onClick={() => handleVenueClick(venue.id)}
                >
                  <img
                    className="w-full h-48 object-cover"
                    src={venue.media.length ? venue.media[0].url : defaultImage}
                    alt={
                      venue.media.length ? venue.media[0].alt : "Default Venue"
                    }
                  />
                  <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-1">{venue.name}</div>
                    <p className="text-gray-600">
                      {venue.location.city}, {venue.location.country}
                    </p>
                  </div>
                  <div className="px-6 pt-4 pb-2 flex justify-between items-center">
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                      {venue.price}NOK / Night
                    </span>
                    <div className="flex">
                      {[...Array(Math.round(venue.rating)).keys()].map(
                        (_, i) => (
                          <svg
                            key={i}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            className="w-4 h-4 text-yellow-500"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.11 3.415a1 1 0 00.95.69h3.584c.97 0 1.37 1.24.588 1.81l-2.897 2.11a1 1 0 00-.364 1.118l1.11 3.415c.3.921-.755 1.683-1.588 1.118l-2.897-2.11a1 1 0 00-1.176 0l-2.897 2.11c-.833.565-1.888-.197-1.588-1.118l1.11-3.415a1 1 0 00-.364-1.118l-2.897-2.11c-.782-.57-.382-1.81.588-1.81h3.584a1 1 0 00.95-.69l1.11-3.415z" />
                          </svg>
                        )
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;

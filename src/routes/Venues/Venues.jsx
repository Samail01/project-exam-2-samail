import { useNavigate } from "react-router-dom";
import { useFetchVenues } from "../../hook/useFetch";
import defaultImage from "../../assets/default-venue.jpg";

export function Venues() {
  const navigate = useNavigate();
  const { data: venues, loading, error } = useFetchVenues();

  const handleVenueClick = (id) => {
    navigate(`/specific/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center mb-6">
            All Destinations
          </h2>
          {loading && <div className="text-center">Loading...</div>}
          {error && (
            <div className="text-center text-red-500">
              Error fetching venues: {error.message}
            </div>
          )}
          {!loading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {venues.map((venue) => (
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
                    <div className="font-bold text-xl mb-2">{venue.name}</div>
                  </div>
                  <div className="px-6 pt-4 pb-2 flex justify-between items-center">
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                      {venue.price} per night
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

export default Venues;

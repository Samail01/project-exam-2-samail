import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import useProfile from "../../hook/useProfile";
import axios from "axios";
import defaultImage from "../../assets/default-venue.jpg";
import EditVenue from "../EditVenue/EditVenue";

const API_BASE_URL = "https://v2.api.noroff.dev";
const API_KEY = "bd4873af-e59d-48b6-996a-63a300dadda8";

const Profile = () => {
  const { currentUser } = useAuth();
  const [newAvatarUrl, setNewAvatarUrl] = useState("");
  const [updating, setUpdating] = useState(false);
  const [editingVenue, setEditingVenue] = useState(null);
  const { profile, bookings, venues, loading, error } = useProfile(
    currentUser?.name
  );

  useEffect(() => {
    document.title = "Holidaze - Profile";
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;
  if (!profile)
    return (
      <div className="text-center text-red-500">
        No user data found. Please login.
      </div>
    );

  const handleUpdateAvatar = async () => {
    if (!newAvatarUrl) {
      alert("Please enter a valid image URL.");
      return;
    }
    try {
      setUpdating(true);
      const response = await axios.put(
        `${API_BASE_URL}/holidaze/profiles/${currentUser.name}`,
        { avatar: { url: newAvatarUrl, alt: "User Avatar" } },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
            "X-Noroff-API-Key": API_KEY,
          },
        }
      );
      alert("Avatar updated successfully!");
      setUpdating(false);
      window.location.reload();
    } catch (error) {
      alert(
        `Failed to update avatar: ${
          error.response?.data?.message || error.message
        }`
      );
      setUpdating(false);
    }
  };

  const handleEditVenue = (venue) => {
    setEditingVenue(venue);
  };

  const handleDeleteVenue = async (venueId) => {
    if (!window.confirm("Are you sure you want to delete this venue?")) return;
    try {
      await axios.delete(`${API_BASE_URL}/holidaze/venues/${venueId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "X-Noroff-API-Key": API_KEY,
        },
      });
      alert("Venue deleted successfully!");
      window.location.reload(); // Consider updating the state instead of reloading
    } catch (error) {
      alert(
        `Failed to delete venue: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4">
      <div className="text-center mb-4">
        <img
          src={profile.avatar?.url || defaultImage}
          alt={profile.name || "Default User"}
          className="rounded-full h-24 w-24 object-cover mx-auto"
        />
        <h1 className="text-2xl font-bold mt-2">Welcome, {profile.name}</h1>
        <input
          type="text"
          value={newAvatarUrl}
          onChange={(e) => setNewAvatarUrl(e.target.value)}
          placeholder="New avatar URL"
          className="mt-2 text-center"
        />
        <button
          onClick={handleUpdateAvatar}
          disabled={updating}
          className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Update Avatar
        </button>
      </div>
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-3xl font-bold mb-2">{profile.name}</h2>
        <p className="text-gray-700 mb-4">{profile.email}</p>
        {bookings && bookings.length > 0 && (
          <div>
            <h3 className="text-xl font-bold mb-4">Your Bookings:</h3>
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="mb-4 p-4 shadow-lg rounded-lg flex"
              >
                <img
                  src={booking.media ? booking.media.url : defaultImage}
                  alt={booking.media ? booking.media.alt : "Venue image"}
                  className="w-32 h-32 rounded-lg mr-4 object-cover"
                />
                <div>
                  <h4 className="text-lg font-bold">{booking.venueName}</h4>
                  <p>
                    Date From:{" "}
                    {new Date(booking.dateFrom).toLocaleDateString("en-US")}
                  </p>
                  <p>
                    Date To:{" "}
                    {new Date(booking.dateTo).toLocaleDateString("en-US")}
                  </p>
                  <p>Guests: {booking.guests}</p>
                </div>
              </div>
            ))}
          </div>
        )}
        {venues && venues.length > 0 && (
          <div>
            <h3 className="text-xl font-bold mb-4">Managed Venues:</h3>
            {venues.map((venue) => (
              <div
                key={venue.id}
                className="mb-4 p-4 shadow-lg rounded-lg flex justify-between items-center"
              >
                <img
                  src={venue.media.length ? venue.media[0].url : defaultImage}
                  alt={
                    venue.media.length ? venue.media[0].alt : "Default Venue"
                  }
                  className="w-32 h-32 rounded-lg mr-4 object-cover"
                />
                <div className="flex-grow">
                  <h4 className="text-lg font-bold">{venue.name}</h4>
                  <p>{venue.description}</p>
                  <p>
                    {venue.location.city}, {venue.location.country}
                  </p>
                </div>
                <div>
                  <button
                    onClick={() => handleEditVenue(venue)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteVenue(venue.id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded ml-2"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        {editingVenue && (
          <EditVenue
            isOpen={Boolean(editingVenue)}
            venueData={editingVenue}
            onClose={() => setEditingVenue(null)}
            onVenueUpdated={() => window.location.reload()}
          />
        )}
      </div>
    </div>
  );
};

export default Profile;

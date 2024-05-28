import { useState, useEffect } from "react";
import Modal from "react-modal";
import axios from "axios";

Modal.setAppElement("#root");

function EditVenue({ isOpen, onClose, venueData, onVenueUpdated }) {
  const [venue, setVenue] = useState({
    name: "",
    description: "",
    price: 0,
    maxGuests: 0,
    address: "",
    city: "",
    imageUrl: "",
  });

  useEffect(() => {
    if (venueData) {
      setVenue({
        name: venueData.name,
        description: venueData.description,
        price: venueData.price,
        maxGuests: venueData.maxGuests,
        address: venueData.location.address,
        city: venueData.location.city,
        imageUrl: venueData.media[0]?.url || "",
      });
    }
  }, [venueData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVenue({ ...venue, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const API_BASE_URL = "https://v2.api.noroff.dev/holidaze/venues";
      const TOKEN = localStorage.getItem("token");

      await axios.put(
        `${API_BASE_URL}/${venueData.id}`,
        {
          name: venue.name,
          description: venue.description,
          price: Number(venue.price),
          maxGuests: Number(venue.maxGuests),
          media: [{ url: venue.imageUrl, alt: "Venue image" }],
          location: { address: venue.address, city: venue.city },
        },
        {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
            "X-Noroff-API-Key": "bd4873af-e59d-48b6-996a-63a300dadda8",
            "Content-Type": "application/json",
          },
        }
      );

      onVenueUpdated();
      onClose();
    } catch (error) {
      console.error(`Failed to update venue: ${error}`);
      alert(`Failed to update venue: ${error.message}`);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl p-5 bg-white rounded-lg shadow-xl"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      contentLabel="Edit Venue"
    >
      <h2 className="text-2xl font-bold mb-4">Edit Venue</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={venue.name}
          onChange={handleChange}
          placeholder="Venue name"
          className="w-full p-2 border border-gray-300 rounded"
        />
        <textarea
          name="description"
          value={venue.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full p-2 border border-gray-300 rounded"
          rows="4"
        />
        <input
          type="number"
          name="price"
          value={venue.price}
          onChange={handleChange}
          placeholder="Price per night"
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="number"
          name="maxGuests"
          value={venue.maxGuests}
          onChange={handleChange}
          placeholder="Maximum guests"
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="address"
          value={venue.address}
          onChange={handleChange}
          placeholder="Address"
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="city"
          value={venue.city}
          onChange={handleChange}
          placeholder="City"
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="imageUrl"
          value={venue.imageUrl}
          onChange={handleChange}
          placeholder="Image URL"
          className="w-full p-2 border border-gray-300 rounded"
        />
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-black rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
          >
            Update Venue
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default EditVenue;

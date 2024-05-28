import { useState } from "react";
import useVenueManager from "../../hook/useVenueManager";

function CreateVenue({ onClose }) {
  const { createVenue } = useVenueManager();
  const [newVenueData, setNewVenueData] = useState({
    name: "",
    description: "",
    price: "",
    maxGuests: "",
    media: { url: "", alt: "" },
    location: { address: "", city: "", country: "" },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, key] = name.split(".");
      setNewVenueData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [key]: value,
        },
      }));
    } else {
      setNewVenueData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleCreateVenue = async () => {
    try {
      const formattedData = {
        ...newVenueData,
        price: parseInt(newVenueData.price, 10),
        maxGuests: parseInt(newVenueData.maxGuests, 10),
        media: [newVenueData.media],
      };
      await createVenue(formattedData);
      alert("Venue created successfully");
      onClose();
    } catch (error) {
      alert(`Failed to create venue: ${error.message}`);
    }
  };

  return (
    <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center pt-16">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-lg w-full">
        <h2 className="text-2xl font-bold mb-4">Create a New Venue</h2>
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          {[
            { name: "name", placeholder: "Name", type: "text" },
            { name: "description", placeholder: "Description", type: "text" },
            { name: "price", placeholder: "Price", type: "number" },
            { name: "maxGuests", placeholder: "Max Guests", type: "number" },
            { name: "media.url", placeholder: "Image URL", type: "text" },
            { name: "media.alt", placeholder: "Image Alt Text", type: "text" },
            { name: "location.address", placeholder: "Address", type: "text" },
            { name: "location.city", placeholder: "City", type: "text" },
            { name: "location.country", placeholder: "Country", type: "text" },
          ].map((field, index) => (
            <input
              key={index}
              type={field.type}
              name={field.name}
              value={
                field.name.includes(".")
                  ? newVenueData[field.name.split(".")[0]][
                      field.name.split(".")[1]
                    ]
                  : newVenueData[field.name]
              }
              onChange={handleInputChange}
              placeholder={field.placeholder}
              className="block w-full p-2 border border-gray-300 rounded shadow-sm"
            />
          ))}
          <div className="flex justify-between space-x-4">
            <button
              type="button"
              onClick={handleCreateVenue}
              className="flex-1 bg-primary text-white font-bold py-2 px-4 rounded"
            >
              Create Venue
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-primary  text-black font-bold py-2 px-4 rounded "
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateVenue;

import { useContext, useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { fetchProfileDetails } from "../ApiService/ApiService";
import defaultImage from "../../assets/default-venue.jpg";

const Profile = () => {
  const { currentUser } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    console.log("Current User:", currentUser);
    if (currentUser && currentUser.name) {
      setLoading(true);
      fetchProfileDetails(currentUser.name)
        .then((data) => {
          setProfile(data);
          setLoading(false);
        })
        .catch((err) => {
          const errorMessage =
            err.response?.data?.message ||
            err.message ||
            "Error fetching profile";
          console.error("Error fetching profile:", errorMessage);
          setError(errorMessage);
          setLoading(false);
        });
    } else {
      console.log("No current user detected.");
      setError("No current user detected.");
      setLoading(false);
    }
  }, [currentUser]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!profile) return <div>Profile not found.</div>;

  const imageUrl =
    profile.avatar && profile.avatar.url ? profile.avatar.url : defaultImage;

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <img
        src={imageUrl}
        alt={profile.name || "Default Venue"}
        className="w-full h-64 object-cover rounded-lg"
      />
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-3xl font-bold mb-2">{profile.name}</h2>
        <p className="text-gray-700 mb-4">{profile.email}</p>
      </div>
    </div>
  );
};

export default Profile;

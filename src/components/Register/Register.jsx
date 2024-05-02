import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../../schema/yup-schema";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../ApiService/ApiService";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(registerSchema),
  });
  const navigate = useNavigate();
  const [registrationError, setRegistrationError] = useState("");

  const onSubmit = async (data) => {
    try {
      await registerUser(data);
      navigate("/login"); // Navigate to login after successful registration
    } catch (error) {
      setRegistrationError(error.message); // Set error message from API response
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 border rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-8 text-center">
          Please register here
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              type="text"
              {...register("name")}
              placeholder="Name"
              className="w-full border border-gray-300 p-2 rounded-md"
            />
            {errors.name && (
              <p className="text-red-600">{errors.name.message}</p>
            )}
          </div>
          <div>
            <input
              type="email"
              {...register("email")}
              placeholder="Email"
              className="w-full border border-gray-300 p-2 rounded-md"
            />
            {errors.email && (
              <p className="text-red-600">{errors.email.message}</p>
            )}
          </div>
          <div>
            <input
              type="password"
              {...register("password")}
              placeholder="Password (min 8 characters)"
              className="w-full border border-gray-300 p-2 rounded-md"
            />
            {errors.password && (
              <p className="text-red-600">{errors.password.message}</p>
            )}
          </div>
          <div>
            <input
              type="text"
              {...register("avatar")}
              placeholder="Avatar URL"
              className="w-full border border-gray-300 p-2 rounded-md"
            />
            {errors.avatar && (
              <p className="text-red-600">{errors.avatar.message}</p>
            )}
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              {...register("venueManager")}
              onChange={(e) =>
                setValue("venueManager", e.target.checked, {
                  shouldValidate: true,
                })
              }
              className="mr-2"
            />
            <span>Want to become a venue manager?</span>
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-white p-2 rounded-md transition duration-200 hover:bg-primary-dark"
          >
            Register
          </button>
          {registrationError && (
            <p className="text-red-600 mt-2">{registrationError}</p>
          )}
          <p className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-primary">
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;

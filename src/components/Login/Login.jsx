import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../schema/yup-schema";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../ApiService/ApiService";
import { useAuth } from "../../context/AuthContext";
import Loader from "../Loader/Loader";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const token = await loginUser(data.email, data.password);
      login(token);
      navigate("/");
    } catch (error) {
      setLoginError(error.message);
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 border rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-8 text-center">
          Please login here
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
              placeholder="Password"
              className="w-full border border-gray-300 p-2 rounded-md"
            />
            {errors.password && (
              <p className="text-red-600">{errors.password.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-white p-2 rounded-md transition duration-200 hover:bg-primary-dark"
          >
            Login
          </button>
          {loginError && <p className="text-red-600 mt-2">{loginError}</p>}
          <p className="mt-4 text-center text-sm">
            Don’t have an account?{" "}
            <Link to="/register" className="text-primary">
              Register now
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;

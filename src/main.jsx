import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Layout } from "./Layout/Layout.jsx";
import { Home } from "./routes/Home/Home.jsx";
import Register from "./components/Register/Register.jsx";
import Login from "./components/Login/Login.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import Specific from "./routes/Specific/Specific.jsx";
import { Venues } from "./routes/Venues/Venues.jsx";
import Profile from "./components/Profile/Profile.jsx";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/specific/:id",
        element: <Specific />,
      },
      {
        path: "/venues",
        element: <Venues />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);

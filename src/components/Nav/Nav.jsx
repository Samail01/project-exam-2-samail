import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { useAuth } from "../../context/AuthContext";
import NavLinks from "./NavLinks";

export function Nav() {
  const [nav, setNav] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const handleNav = () => {
    setNav(!nav);
  };

  const handleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = () => {
    logout();
    setShowDropdown(false);
    navigate("/login");
  };

  return (
    <nav className="flex justify-between items-center w-full bg-primary text-white h-[70px] relative">
      <h1 className="text-3xl font-bold font-[Odor-Mean-Chey] px-4">
        <Link to="/">Holidaze</Link>
      </h1>
      <div className="flex items-center md:order-2">
        <button onClick={handleDropdown} className="p-2 z-20">
          <CgProfile size={30} />
        </button>
        <div onClick={handleNav} className="px-4 cursor-pointer z-20 md:hidden">
          {nav ? (
            <AiOutlineClose size={30} color="white" />
          ) : (
            <AiOutlineMenu size={30} color="white" />
          )}
        </div>
        {showDropdown && (
          <ul
            ref={dropdownRef}
            className="absolute right-0 mt-2 w-40 bg-white text-primary rounded-md shadow-lg z-30"
            style={{ top: "100%", right: 0 }}
          >
            {isAuthenticated ? (
              <>
                <li className="border-b border-primary hover:bg-primary hover:text-white">
                  <Link
                    to="/profile"
                    onClick={handleDropdown}
                    className="block p-4 text-left"
                  >
                    Profile
                  </Link>
                </li>
                <li className="hover:bg-primary hover:text-white">
                  <button
                    onClick={handleLogout}
                    className="block p-4 w-full text-left"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="border-b border-primary hover:bg-primary hover:text-white">
                  <Link
                    to="/login"
                    onClick={handleDropdown}
                    className="block p-4 text-left"
                  >
                    Login
                  </Link>
                </li>
                <li className="hover:bg-primary hover:text-white">
                  <Link
                    to="/register"
                    onClick={handleDropdown}
                    className="block p-4 text-left"
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        )}
      </div>
      <ul
        className={`md:flex md:items-center md:justify-end md:flex-1 md:order-1 ${
          nav ? "fixed left-0 top-0 w-full h-full" : "hidden"
        } bg-primary ease-in-out duration-500 z-10`}
      >
        {NavLinks.map(({ id, path, label }) => (
          <li
            key={id}
            className="p-4 border-b border-gray-600 hover:bg-[#00df9a] duration-300 hover:text-black cursor-pointer"
          >
            <Link to={path} onClick={() => setNav(false)}>
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

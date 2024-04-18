import { useState } from "react";
import NavLinks from "./NavLinks";
import { Link } from "react-router-dom";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";

export function Nav() {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <nav className="flex justify-between items-center w-full bg-primary text-white h-[70px] relative">
      <h1 className="text-3xl font-bold font-[Odor-Mean-Chey] px-4">
        Holidaze
      </h1>
      <ul className="hidden md:flex md:items-center md:justify-end md:flex-1">
        {NavLinks.map(({ id, path, label }) => (
          <li
            key={id}
            className="p-4 rounded-xl m-2 cursor-pointer duration-300 hover:text-black"
          >
            <Link to={path}>{label}</Link>
          </li>
        ))}
      </ul>
      <div
        onClick={handleNav}
        className="block md:hidden px-4 cursor-pointer z-20"
      >
        {nav ? (
          <AiOutlineClose size={30} color="white" />
        ) : (
          <AiOutlineMenu size={30} color="white" />
        )}
      </div>
      <ul
        className={
          nav
            ? "fixed left-0 top-0 w-full h-full bg-primary ease-in-out duration-500 z-10"
            : "ease-in-out duration-500 fixed top-0 left-[-100%] w-full h-full z-10"
        }
      >
        {NavLinks.map(({ id, path, label }) => (
          <li
            key={id}
            className="p-4 border-b border-gray-600 hover:bg-[#00df9a] duration-300 hover:text-black cursor-pointer"
          >
            <Link to={path}>{label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

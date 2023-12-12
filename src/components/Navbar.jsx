import React from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo or Site Title */}
        <Link to="/" className="text-white text-xl font-bold">
          TODO
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-4">
          <NavLink
            to="/"
            className="text-white hover:text-gray-300"
            activeClassName="border-b-2 border-white"
          >
            Home
          </NavLink>
          <NavLink
            to="/user/register"
            className="text-white hover:text-gray-300"
            activeClassName="border-b-2 border-white"
          >
            Register
          </NavLink>
          <NavLink
            to="/user/login"
            className="text-white hover:text-gray-300"
            activeClassName="border-b-2 border-white"
          >
            Login
          </NavLink>
          <NavLink
            to="/user/profile"
            className="text-white hover:text-gray-300"
            activeClassName="border-b-2 border-white"
          >
            Profile
          </NavLink>
        </div>

        {/* Mobile Navigation (Hidden by default) */}
        <div className="md:hidden">
          {/* Add a responsive menu icon (e.g., hamburger menu) */}
          {/* This can be a component or an SVG icon */}
          <button>
            <svg
              className="text-white h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

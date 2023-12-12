import React, { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

const NavLinks = ({ isMobile = false, closeMobileMenu }) => {
  const location = useLocation();

  const links = [
    { to: "/", text: "Home" },
    { to: "/todo/create", text: "Create Todo" },
    { to: "/user/register", text: "Register" },
    { to: "/user/login", text: "Login" },
    { to: "/user/profile", text: "Profile" },
  ];

  const linkClickHandler = () => {
    if (isMobile) {
      closeMobileMenu();
    }
  };

  return (
    <div className={isMobile ? "block" : "hidden md:flex space-x-4"}>
      {isMobile && (
        <div className="bg-white p-4 rounded shadow-lg my-1 absolute right-4 px-10">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={`block text-gray-800 hover:text-gray-600 my-2 text-center ${
                location.pathname === link.to ? "font-bold text-lg" : ""
              }`}
              onClick={linkClickHandler}
            >
              {link.text}
            </NavLink>
          ))}
        </div>
      )}

      {!isMobile &&
        links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={`text-white hover:text-green-500 ${
              location.pathname === link.to ? "border-b-2 border-white" : ""
            }`}
            onClick={linkClickHandler}
          >
            {link.text}
          </NavLink>
        ))}
    </div>
  );
};

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-white text-xl font-bold">
          TODO
        </Link>

        {/* Navigation Links */}
        <NavLinks isMobile={false} />

        {/* Mobile Navigation (Hidden by default) */}
        <div className="md:hidden">
          <button onClick={toggleMobileMenu}>
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
          {mobileMenuOpen && (
            <NavLinks isMobile={true} closeMobileMenu={toggleMobileMenu} />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

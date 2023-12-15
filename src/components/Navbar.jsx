import { useContext } from "react";
import { AuthContext } from "../shared/context/AuthProvider";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { user } = useContext(AuthContext);

  const NavLinks = () => {
    return (
      <>
        {user ? (
          <>
            <li>
              <Link to="/" className="nav-link text-base">
                Home
              </Link>
            </li>
            <li>
              <Link to="/user/profile" className="nav-link text-base">
                Profile
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/user/register" className="nav-link text-base">
                Register
              </Link>
            </li>
            <li>
              <Link to="/user/login" className="nav-link text-base">
                Login
              </Link>
            </li>
          </>
        )}
      </>
    );
  };

  return (
    <div className="bg-base-100">
      <div className="navbar max-w-screen-2xl mx-auto">
        <div className="navbar-start">
          <Link to="/" className="font-bold text-xl">
            MRB | TODO
          </Link>
        </div>

        <div className="navbar-end">
          <ul className="menu menu-horizontal px-1 hidden sm:flex">
            <NavLinks />
          </ul>
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost sm:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-36 right-0"
            >
              <NavLinks />
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

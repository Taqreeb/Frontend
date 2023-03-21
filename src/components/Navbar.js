import React from "react";
import { NavLink } from "../imports";
import PropTypes from "prop-types";

const Navbar = (props) => {
  return (
    <>
      <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-black">
        <div className="container-fluid">
          <NavLink
            className="navbar-brand text-light font fontweight-700"
            to="/"
          >
            {props.title}
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink
                  className="nav-link active text-light font fontweight-400"
                  aria-current="page"
                  to="/"
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link active text-light font fontweight-400"
                  to="/about"
                >
                  About Us
                </NavLink>
              </li>
              <div
                className="collapse navbar-collapse"
                id="navbarNavDarkDropdown"
              >
                <ul className="navbar-nav">
                  <li className="nav-item dropdown">
                    <NavLink
                      className="nav-link dropdown-toggle text-light font fontweight-400"
                      to=""
                      id="navbarDarkDropdownMenuLink"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Signup
                    </NavLink>
                    <ul
                      className="dropdown-menu dropdown-menu-dark"
                      aria-labelledby="navbarDarkDropdownMenuLink"
                    >
                      <li>
                        <NavLink
                          className="dropdown-item font fontweight-400"
                          to="/signupuser"
                        >
                          User Signup
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          className="dropdown-item font fontweight-400"
                          to="/signupvendor"
                        >
                          Vendor Signup
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
              <li className="nav-item">
                <NavLink
                  className="nav-link active text-light font fontweight-400"
                  to="/login"
                >
                  Login
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link active text-light font fontweight-400"
                  to="/contact"
                >
                  Contact Us
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};
Navbar.propTypes = {
  title: PropTypes.string.isRequired,
};
export default Navbar;

import React, { useState } from "react";
import { NavLink } from "../imports";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { FaUser, FaSignOutAlt } from "react-icons/fa";
const Navbar = (props) => {
  const navigate = useNavigate();
  const logoutIcon = <FaSignOutAlt />;
  const profileIcon = <FaUser />;
  const [isLogin, setIsLogin] = useState(true);
  const handleLogout = () => {
    setIsLogin(false);
    navigate("/");
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-black">
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
              <div
                className="collapse navbar-collapse"
                id="navbarNavDarkDropdown"
              >
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <NavLink
                      className="nav-link active text-light font fontweight-400"
                      to="/"
                    >
                      Home
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link active text-light font fontweight-400"
                      to="/vendor/addbusiness"
                    >
                      AddBusiness
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link active text-light font fontweight-400"
                      to="/vendor/viewbusiness"
                    >
                      ViewBusiness
                    </NavLink>
                  </li>
                  <li className="nav-item dropdown">
                    <NavLink
                      className="nav-link dropdown-toggle active"
                      id="navbarDropdown"
                      to="/category"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Vendors
                    </NavLink>

                    <ul
                      className="dropdown-menu dropdown-menu-dark"
                      aria-labelledby="navbarDarkDropdownMenuLink"
                    >
                      <li>
                        <NavLink
                          className="dropdown-item font fontweight-400"
                          to="/category/venue"
                        >
                          Venues
                        </NavLink>
                      </li>

                      <li>
                        <NavLink
                          className="dropdown-item font fontweight-400"
                          to="/category/photographer"
                        >
                          Photographers
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          className="dropdown-item font fontweight-400"
                          to="/category/decorator"
                        >
                          Decorators
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          className="dropdown-item font fontweight-400"
                          to="/category/caterer"
                        >
                          Caterers
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          className="dropdown-item font fontweight-400"
                          to="/category/music"
                        >
                          Music
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
              <li className="nav-item">
                <NavLink
                  className="nav-link active text-light font fontweight-400"
                  to="/contact"
                >
                  Contact
                </NavLink>
              </li>
            </ul>
          </div>

          {!isLogin ? (
            <div>
              <NavLink
                className="btn btn-light rounded-5 mx-2 text-black font fontweight-400"
                style={{ width: "136px", height: "36px" }}
                role="button"
                to="/login"
              >
                Login
              </NavLink>
              <NavLink
                className="btn btn-light rounded-5 mx-2 text-black font fontweight-400"
                style={{ width: "136px", height: "36px" }}
                role="button"
                to="/signup"
              >
                Signup
              </NavLink>
            </div>
          ) : (
            <ul className="navbar-nav">
              <li className="nav-item dropdown">
                <span
                  className="nav-link dropdown-toggle"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <img
                    src="https://images.unsplash.com/photo-1639879646636-c49a99c658eb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=410&q=80"
                    alt="Logo"
                    className="rounded-circle"
                    data-toggle="dropdown"
                    id="navbarDropdown"
                    width="40"
                    height="40"
                  />
                </span>

                <div
                  className="dropdown-menu dropdown-menu-dark" id="account"
                  aria-labelledby="navbarDropdown"
                >
                  <NavLink className="dropdown-item" to='/profile'>
                    <i className="me-2">{profileIcon}</i>
                    My Profile
                  </NavLink>
                  <div className="dropdown-divider"></div>
                  <button
                    className="dropdown-item"
                    type="button"
                    onClick={handleLogout}
                  >
                    <i className="me-2">{logoutIcon}</i>
                    Logout
                  </button>
                </div>
              </li>
            </ul>
          )}
        </div>
      </nav>
    </>
  );
};
Navbar.propTypes = {
  title: PropTypes.string.isRequired,
};
export default Navbar;

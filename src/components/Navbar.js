import React from "react";
import { NavLink } from "../imports";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { FaUser, FaSignOutAlt } from "react-icons/fa";
const Navbar = (props) => {
  
  const navigate = useNavigate();
  const logoutIcon = <FaSignOutAlt />;
  const profileIcon = <FaUser />;
  const isLogin = localStorage.getItem('isLogin')==="true"
  const profilePicture = localStorage.getItem('profile_picture')
  const isVendor = localStorage.getItem('isLogin')==="true" && localStorage.getItem('role')==="vendor"
  const isAdmin = localStorage.getItem('isLogin')==="true" && localStorage.getItem('role')==="admin"
  const handleLogout = () => {
   localStorage.clear()
    navigate("/");
    props.showAlert("Successfully Logged out","success")
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-black">
        <div className="container-fluid">
          <NavLink
            className="navbar-brand text-light font fontweight-700 ms-2"
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
                  {isVendor &&<li className="nav-item">
                    <NavLink
                      className="nav-link active text-light font fontweight-400"
                      to="/vendor/addbusiness"
                    >
                      AddBusiness
                    </NavLink>
                  </li>}
                  {isAdmin &&<li className="nav-item">
                    <NavLink
                      className="nav-link active text-light font fontweight-400"
                      to="/admin/businessapprovals"
                    >
                      BusinessApprovals
                    </NavLink>
                  </li>}
                  {isVendor&&
                  <li className="nav-item">
                    <NavLink
                      className="nav-link active text-light font fontweight-400"
                      to="/vendor/viewbusiness"
                    >
                      ViewBusiness
                    </NavLink>
                  </li>}
                  {!isVendor &&!isAdmin&&
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
                  </li>}
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
                    src={profilePicture}
                    alt="Profile"
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

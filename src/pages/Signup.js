import React, { useState, useEffect } from "react";
import "../styles.css";
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
const eye = <FaEye />;
const eyeSlash = <FaEyeSlash />;

const Signup = () => {
  const navigate = useNavigate();
  const [passwordShown, setPasswordShown] = useState(false);
  const [confirmpasswordShown, setConfirmPasswordShown] = useState(false);
  const [eyeShown1, seteyeShown1] = useState(false);
  const [eyeShown2, seteyeShown2] = useState(false);
  const [showModal, setShowModal] = useState(true);
  const [selectedPopupValue, setSelectedPopupValue] = useState("");
  const [popupError, setPopupError] = useState("");

  const handleRadioChange = (event) => {
    setSelectedPopupValue(event.target.value);
    setPopupError("");
  };
  const handleCancel = () => {
    setShowModal(false);
    navigate("/");
  };

  const handleSubmit = () => {
    if (selectedPopupValue) {
      setShowModal(false);
    } else {
      setPopupError("Please Select a category");
    }
  };
  const MyModal = () => {
    return (
      <>
        <div className="modal-wrapper"></div>
        <div className="modal-container">
          <h4>What are You Signing up as?</h4>

          <div className="d-flex justify-content-center my-4">
            <label className="mx-3">
              <input
                className="mx-2"
                type="radio"
                value="user"
                checked={selectedPopupValue === "user"}
                onChange={handleRadioChange}
              />
              User
            </label>
            <label>
              <input
                className="mx-2"
                type="radio"
                value="vendor"
                checked={selectedPopupValue === "vendor"}
                onChange={handleRadioChange}
              />
              Vendor
            </label>
          </div>
          <p className="text-danger text-center">{popupError}</p>
          <div className="text-end">
            <button className="btn btn-dark mx-2" onClick={handleCancel}>
              Cancel
            </button>
            <button className="btn btn-dark" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
      </>
    );
  };
  const togglePasswordVisiblity = () => {
    console.log("togglePasswordeventtriggered");
    setPasswordShown(passwordShown ? false : true);
  };
  const toggleConfirmPasswordVisiblity = () => {
    console.log("togglePasswordeventtriggered");
    setConfirmPasswordShown(confirmpasswordShown ? false : true);
  };

  useEffect(() => {}, []);
  const handlePasswordChange = (event) => {
    if (event.target.value.trim().length > 0) {
      seteyeShown1(true);
    } else {
      seteyeShown1(false);
      setPasswordShown(false);
    }
  };
  const handleConfirmPasswordChange = (event) => {
    if (event.target.value.trim().length > 0) {
      seteyeShown2(true);
    } else {
      seteyeShown2(false);
      setConfirmPasswordShown(false);
    }
  };

  return (
    <div className="background-login-signup d-flex align-items-center">
      <div
        className="mx-auto card rounded-4 mb-5 px-5 py-4"
        style={{ width: "40vw" }}
      >
        {showModal && <MyModal />}
        <h4 className="text-start font fontweight-700">Signup</h4>
        <p>Welcome to Signup</p>
        <form>
          <div className="row">
            <div className="col">
              <input
                placeholder="First Name"
                type="text"
                className="form-control shadow-none text-black border-top-0 border-end-0 border-start-0 border-dark rounded-0 font fontweight-400"
                id="FirstName"
              />
            </div>
            <div className="col mb-3">
              <input
                placeholder="Last Name"
                type="text"
                className="form-control shadow-none text-black border-top-0 border-end-0 border-start-0 border-dark rounded-0 font fontweight-400"
                id="LastName"
              />
            </div>
          </div>

          <div className="mb-3">
            <input
              placeholder="Email"
              type="email"
              className="form-control shadow-none text-black border-top-0 border-end-0 border-start-0 border-dark rounded-0 font fontweight-400"
              id="Email"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3 ">
            <input
              name="current-password"
              autoComplete="current-password"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
              placeholder="Password"
              onChange={handlePasswordChange}
              type={passwordShown ? "text" : "password"}
              className="form-control shadow-none my-2 text-black border-top-0 border-end-0 border-start-0 border-dark black rounded-0 font fontweight-400"
              id="Password"
            />
            <i
              className="opacity-75"
              id="eye-icon-signup-password"
              onClick={togglePasswordVisiblity}
            >
              {eyeShown1 ? (passwordShown ? eye : eyeSlash) : null}
            </i>
          </div>
          <div className="mb-3 ">
            <input
              name="current-password"
              autoComplete="current-password"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
              placeholder="Confirm Password"
              onChange={handleConfirmPasswordChange}
              type={confirmpasswordShown ? "text" : "password"}
              className="form-control shadow-none my-2 text-black border-top-0 border-end-0 border-start-0 border-dark black rounded-0 font fontweight-400"
              id="ConfirmPassword"
            />
            <i
              id="eye-icon-signup-cpassword"
              className="opacity-75"
              onClick={toggleConfirmPasswordVisiblity}
            >
              {eyeShown2 ? (confirmpasswordShown ? eye : eyeSlash) : null}
            </i>
          </div>
          <div className="mb-3">
            <input
              placeholder="Phone Number"
              type="number"
              className="form-control shadow-none text-black border-top-0 border-end-0 border-start-0 border-dark rounded-0 font fontweight-400"
              id="MobileNo"
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary rounded-4 bg-black border-0 my-3 w-100 font fontweight-600"
          >
            Signup
          </button>

          <p className="text-secondary text-center opacity-75 font fontweight-500">
            Or Signup with
          </p>
          <button
            type="button"
            className="btn btn-outline w-100 my-2 rounded-4 font fontweight-400"
          >
            <FaGoogle
              style={{
                color: "black",
                marginRight: "13px",
                alignItems: "center",
                fontSize: "1.2rem",
                fontFamily: "Public Sans",
                fontWeight: "400",
              }}
            />
            Continue with Google
          </button>
        </form>
        <p className="float-end mx-auto mt-2 text-dark font fontweight-500">
          Already have an account?{" "}
          <NavLink
            to="/login"
            className="text-decoration-none text opacity-75 font fontweight-700"
          >
            Login
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Signup;

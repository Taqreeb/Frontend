import React, { useState, useEffect } from "react";
import "../styles.css";
import {FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import { NavLink } from "react-router-dom";
const eye = <FaEye />;
const eyeSlash = <FaEyeSlash />;

const SignupUser = () => {
  const [passwordShown, setPasswordShown] = useState(false);
  const [confirmpasswordShown, setConfirmPasswordShown] = useState(false);
  const [eyeShown1, seteyeShown1] = useState(false);
  const [eyeShown2, seteyeShown2] = useState(false);

  const togglePasswordVisiblity = () => {
    console.log("togglePasswordeventtriggered");
    setPasswordShown(passwordShown ? false : true);
  };
  const toggleConfirmPasswordVisiblity = () => {
    console.log("togglePasswordeventtriggered");
    setConfirmPasswordShown(confirmpasswordShown ? false : true);
  };

  useEffect(() => {
    const keyPressHandler = (event) => {};
    document.addEventListener("keydown", keyPressHandler);

    return () => {
      document.removeEventListener("keydown", keyPressHandler);
    };
  }, []);

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
        className="mx-auto card rounded-4 mt-5 px-5 py-4"
        style={{width:"40vw"}}
        
      >    
        <h4 className="text-start font fontweight-700">Signup</h4>
        <p>You are Signing up as a user</p>
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
          <p className="float-end mx-auto text-dark font fontweight-500">Have a wedding business? <NavLink
            to="/signupvendor"
            className="text-decoration-none text opacity-75 font fontweight-700">
            Join as a vendor
        </NavLink> </p>
      </div>
    </div>

  );
};

export default SignupUser;

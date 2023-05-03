import React, { useState} from "react";
import "../styles.css";
import {FaEye, FaEyeSlash } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../utils/apiUrl";
const eye = <FaEye />;
const eyeSlash = <FaEyeSlash />;

const Signup = (props) => {
  const navigate = useNavigate();
  const [passwordShown, setPasswordShown] = useState(false);
  const [eyeShown1, seteyeShown1] = useState(false);
  const [showModal, setShowModal] = useState(true);
  const [selectedPopupValue, setSelectedPopupValue] = useState("");
  const [popupError, setPopupError] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstnameError, setFirstNameError] = useState("");
  const [lastnameError, setLastNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [loading,setLoading] = useState(false)

  const handlePhoneInvalid = (e) => {
    e.preventDefault();
    if (phoneNo) {
      setPhoneError(
        "Please enter a valid phone number in the format 03XXXXXXXXX or +923XXXXXXXXX"
      );
    } else {
      setPhoneError("phone number is required");
    }
  };

  const handleRadioChange = (event) => {
    setSelectedPopupValue(event.target.value);
    setPopupError("");
  };
  const handleCancel = () => {
    setShowModal(false);
    navigate("/");
  };

  const handleFormSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (firstName && lastName && phoneNo && email && password) {
      try {
        setEmail("");
        setPassword("");
        setFirstName("");
        setLastName("");
        setPhoneNo("");
        setEmailError("");
        setPasswordError("");
        setFirstNameError("");
        setLastNameError("");
        setPhoneError("");
        const response = await axios.post(
          `${API_URL}/auth/signup`,
          {
            FirstName: firstName,
            LastName: lastName,
            Email: email,
            Password: password,
            PhoneNo: phoneNo,
            role: selectedPopupValue,
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        if(response.data.success){
        setLoading(false);
        props.showAlert("User Registered Successfully", "success");
        navigate("/");
      }
      } catch (error) {
        if (error.response) {
          console.log(error.response);
        } else if (error.request) {
          console.log("network error");
        } else {
          console.log(error);
        }
      }
    }
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

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setPasswordError("");
    if (event.target.value.trim().length > 0) {
      seteyeShown1(true);
    } else {
      seteyeShown1(false);
      setPasswordShown(false);
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
        <form onSubmit={handleFormSubmit}>
          <div className="row">
            <div className="col">
              <input
                placeholder="First Name"
                type="text"
                name="FirstName"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                  setFirstNameError("");
                }}
                onInvalid={(e) => {
                  e.preventDefault();

                  setFirstNameError("First Name is required");
                }}
                className="form-control shadow-none text-black border-top-0 border-end-0 border-start-0 border-dark rounded-0 font fontweight-400"
                id="FirstName"
                required
              />
              {firstnameError && (
                <span className="text-danger"> {firstnameError}</span>
              )}
            </div>

            <div className="col mb-3">
              <input
                placeholder="Last Name"
                name="LastName"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                  setLastNameError("");
                }}
                onInvalid={(e) => {
                  e.preventDefault();

                  setLastNameError("Last Name is required");
                }}
                type="text"
                className="form-control shadow-none text-black border-top-0 border-end-0 border-start-0 border-dark rounded-0 font fontweight-400"
                id="LastName"
                required
              />
              {lastnameError && (
                <span className="text-danger"> {lastnameError}</span>
              )}
            </div>
          </div>

          <div className="mb-3">
            <input
              placeholder="Email"
              type="email"
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError("");
              }}
              onInvalid={(e) => {
                e.preventDefault();
                if (email) {
                  setEmailError("Please enter a valid email address");
                } else {
                  setEmailError("Email address is required");
                }
              }}
              className="form-control shadow-none text-black border-top-0 border-end-0 border-start-0 border-dark rounded-0 font fontweight-400"
              id="Email"
              aria-describedby="emailHelp"
              required
            />
            {emailError && <span className="text-danger"> {emailError}</span>}
          </div>
          <div className="mb-3 ">
            <input
              name="password"
              autoComplete="password"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
              placeholder="Password"
              onChange={handlePasswordChange}
              value={password}
              minLength={8}
              onInvalid={(e) => {
                e.preventDefault();
                if (password) {
                  setPasswordError(
                    "Password must be atleast 8 characters long"
                  );
                } else {
                  setPasswordError("Password is required");
                }
              }}
              type={passwordShown ? "text" : "password"}
              className="form-control shadow-none my-2 text-black border-top-0 border-end-0 border-start-0 border-dark black rounded-0 font fontweight-400"
              id="Password"
              required
            />
            {passwordError && (
              <span className="text-danger"> {passwordError}</span>
            )}
            <i
              className="opacity-75"
              id="eye-icon-signup-password"
              onClick={togglePasswordVisiblity}
            >
              {eyeShown1 ? (passwordShown ? eye : eyeSlash) : null}
            </i>
          </div>

          <div className="mb-3">
            <input
              placeholder="Phone Number"
              name="PhoneNo"
              value={phoneNo}
              onChange={(e) => {
                setPhoneNo(e.target.value);
                setPhoneError("");
              }}
              pattern="^(03|\+923)[0-9]{2}[0-9]{7}$"
              onInvalid={handlePhoneInvalid}
              type="tel"
              className="form-control shadow-none text-black border-top-0 border-end-0 border-start-0 border-dark rounded-0 font fontweight-400"
              id="MobileNo"
              required
            />
            {phoneError && <span className="text-danger"> {phoneError}</span>}
          </div>

          {!loading?<button
            type="submit"
            className="btn btn-primary rounded-4 bg-black border-0 my-3 w-100 font fontweight-600"
          >
            Signup
          </button>:<p className="text-center">Signing up...</p>}
        </form>
        {/* <p className="text-secondary text-center opacity-75 font fontweight-500">
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
        </button> */}

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

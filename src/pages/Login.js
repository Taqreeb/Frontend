import React, { useState } from "react";
import axios from "axios";
import "../styles.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import {API_URL} from "../utils/apiUrl";
const eye = <FaEye />;
const eyeSlash = <FaEyeSlash />;

const Login = (props) => {
  const [passwordShown, setPasswordShown] = useState(false);
  const [eyeShown, seteyeShown] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();
  const handleEmailChange = (event) => {
    event.preventDefault();
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    if (event.target.value.trim().length > 0) {
      seteyeShown(true);
    } else {
      seteyeShown(false);
      setPasswordShown(false);
    }
  };
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (email && password) {
      try {
        const response = await axios.post(
          `${API_URL}/auth/login`,
          { Email: email, Password: password },
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        
        if (response.data.authtoken) {
          setEmail("");
          setPassword("");
          localStorage.setItem("id", response.data.id);
          localStorage.setItem("authtoken", response.data.authtoken);
          localStorage.setItem("role", response.data.role);

          localStorage.setItem("isLogin", "true");
          localStorage.setItem(
            "profile_picture",
            response.data.profile_picture
          );
          navigate("/");
          props.showAlert("Logged in Successfully", "success");
          setLoading(false)
        }
      } catch (error) {
        if (error.response) {
          props.showAlert("Invalid Credentials", "danger");
          setLoading(false);
          console.log(error.response);
        } else if (error.request) {
          console.log("network error");
        } else {
          console.log(error);
        }
      }
    }
  };

  return (
    <div className="background-login-signup d-flex align-items-center">
      <div
        className="mx-auto card rounded-4 mt-4 px-5 py-4"
        style={{ width: "40vw" }}
      >
        <h4 className="text-start font fontweight-700">Login</h4>
        <p>Welcome to Login</p>
        <form action="" onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              placeholder="Email"
              autoComplete="off"
              type="email"
              className="form-control shadow-none text-black border-top-0 border-end-0 border-start-0 border-dark rounded-0 font fontweight-400"
              id="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          <NavLink
            to="/"
            className="text-decoration-none text float-end opacity-75 font fontweight-700"
          >
            Forgot Password?
          </NavLink>
          <div className="mb-5 ">
            <input
              name="password"
              autoComplete="password"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              type={passwordShown ? "text" : "password"}
              className="form-control shadow-none my-2 text-black border-top-0 border-end-0 border-start-0 border-dark black rounded-0 font fontweight-400"
              id="password"
              required
            />
            <i
              id="eye-icon-login-password"
              className="opacity-75"
              onClick={togglePasswordVisiblity}
            >
              {eyeShown ? (passwordShown ? eye : eyeSlash) : null}
            </i>
          </div>

          {!loading ?<button
            type="submit"
            className="btn btn-primary rounded-4 bg-black border-0 my-2 w-100 font fontweight-600"
          >
            Login
          </button>:<p className="text-center">Logging in...</p>}
        </form>
        {/* <p className="text-secondary text-center mt-2 opacity-75 font fontweight-500">
          Or Login with
        </p> */}
        {/* <button
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

        <p className="float-end mt-2 mx-auto text-dark font fontweight-500">
          New to Taqreeb?{" "}
          <NavLink
            to="/signup"
            className="text-decoration-none text opacity-75 font fontweight-700"
          >
            Create an account
          </NavLink>{" "}
        </p>
      </div>
    </div>
  );
};

export default Login;

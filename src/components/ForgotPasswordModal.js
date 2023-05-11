import axios from "axios";
import React, { useRef, useState } from "react";
import { FaStar } from "react-icons/fa";
import { API_URL } from "../utils/apiUrl";

const ForgotPasswordModal = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const modalRef = useRef(null);
  const authtoken = localStorage.getItem("authtoken");

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (email) {
      try {
        const response = await axios.post(
          `${API_URL}/auth/requestPasswordReset`,
          { Email: email },
          {
            headers: {
              "Content-Type": "application/json",
              "auth-token": authtoken,
            },
          }
        );
        if (response.data.status === "PENDING") {
          setLoading(false);
          setEmail("");
          setEmailError("");
          setMessage(
            "An Email has been sent with a reset password link to your Email Address"
          );
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
    } else {
      setEmailError("Email is required to send reset password link");
    }
  };

  const handleEmailChange = (e) => {
    setLoading(false);
    setEmail(e.target.value);
    setEmailError("");
  };
  return (
    <div
      className="modal fade"
      id="forgotPasswordModal"
      tabIndex="-1"
      aria-labelledby="forgotPasswordModalLabel"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      aria-hidden="true"
      ref={modalRef}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header text-center">
            <h5 className="modal-title" id="forgotPasswordLabel">
              Password Reset
            </h5>
          </div>
          {!message&&<div className="modal-body">
            <form>
              <div className="mb-3">
                <label htmlFor="emailVerify" className="form-label">
                  Email Address:
                </label>
                <input
                  className="form-control"
                  type="email"
                  id="emailVerify"
                  placeholder="Enter Your Email Address"
                  value={email}
                  onChange={handleEmailChange}
                />
                {emailError && (
                  <p className="text-danger text-start mt-2">{emailError}</p>
                )}
              </div>
            </form>
          </div>}
          <div className="modal-footer">
            {loading ? (
              <p>...</p>
            ) : message ? (
              <>
                <p className="text-success">{message}</p>
                <button
                  type="button"
                  className="btn btn-dark"
                  data-bs-dismiss="modal"
                  onClick={() => {
                    setEmail("");
                    setEmailError("");
                    setMessage("");
                  }}
                >
                  OK
                </button>
              </>
            ) : (
              <>
                {" "}
                <button
                  type="button"
                  className="btn btn-dark"
                  data-bs-dismiss="modal"
                  onClick={() => {
                    setEmail("");
                    setEmailError("");
                    setMessage("");
                  }}
                >
                  Close
                </button>
                <button
                  type="button"
                  id="submit-button"
                  className="btn btn-dark"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;

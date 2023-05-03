import axios from "axios";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../utils/apiUrl";

const ChangePasswordModal = (props) => {
  const navigate = useNavigate();
  const [oldPassword, setoldPassword] = useState("");
  const [newPassword, setnewPassword] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const [oldPasswordError, setoldPasswordError] = useState("");
  const modalRef = useRef(null);
  const role = localStorage.getItem("role");
  const authtoken = localStorage.getItem("authtoken");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword && oldPassword) {
      if (newPassword.length >= 8) {
        try {
          await axios.put(
            `${API_URL}/${role}/updatePassword`,
            { oldPassword: oldPassword, newPassword: newPassword },
            {
              headers: {
                "Content-Type": "application/json",
                "auth-token": authtoken,
              },
            }
          );

          setoldPassword("");
          setnewPassword("");
          setoldPasswordError("");
          setNewPasswordError("");
          modalRef.current.setAttribute("data-bs-dismiss", "modal");
          modalRef.current.click();
          localStorage.clear();
          navigate("/");
          props.showAlert("Password Updated Succesfully. Please Login again","success")
        } catch (error) {
          if (error.response) {
            setoldPasswordError("Invalid credentials");
            console.log(error.response);
          } else if (error.request) {
            console.log("network error");
          } else {
            console.log(error);
          }
        }
      } else {
        setNewPasswordError("Password should be 8 characters long");
      }
    } else {
      if (!oldPassword) {
        setoldPasswordError("Old Password is required");
      }
      if (!newPassword) {
        setNewPasswordError("New Password is required");
      }
    }
  };

  const handleOldPasswordChange = (e) => {
    setoldPassword(e.target.value);
    setoldPasswordError("");
  };
  const handleNewPasswordChange = (e) => {
    setnewPassword(e.target.value);
    setNewPasswordError("");
  };
  return (
    <div
      className="modal fade"
      id="passwordmodal"
      tabIndex="-1"
      aria-labelledby="passwordmodalLabel"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      aria-hidden="true"
      ref={modalRef}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header text-center">
            <h5 className="modal-title" id="exampleModalLabel">
              Change Your password
            </h5>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Old Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Enter your old password"
                  value={oldPassword}
                  onChange={handleOldPasswordChange}
                  required
                />
                {oldPasswordError && (
                  <p className="text-danger">{oldPasswordError}</p>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="newpassword" className="form-label">
                  New Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="newpassword"
                  placeholder="Enter your new password"
                  value={newPassword}
                  onChange={handleNewPasswordChange}
                  required
                />
                {newPasswordError && (
                  <p className="text-danger">{newPasswordError}</p>
                )}
              </div>
            </form>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-dark"
              data-bs-dismiss="modal"
              onClick={(e) => {
                setoldPassword("");
                setnewPassword("");
                setNewPasswordError("");
                setoldPasswordError("");
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordModal;

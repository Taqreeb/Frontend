import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../utils/apiUrl";
import { useState } from "react";

const ResetPassword = (props) => {
  const params = useParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePasswordChange = (event) => {
    setNewPassword(event.target.value);
    setNewPasswordError("");
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const response = await axios.post(
        `${API_URL}/auth/resetPassword`,
        {
          userId: params.id,
          resetString: params.resetString,
          newPassword: newPassword,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.data.status === "SUCCESS") {
        setNewPassword("");
        setNewPasswordError("");
        navigate("/");
        props.showAlert(
          "Your Password Has been Successfully Changed",
          "success"
        );
        setLoading(false);
      }
    } catch (error) {
      if (error.response) {
        props.showAlert(error.response.data.message, "danger");
        setLoading(false);
        console.log(error.response);
      } else if (error.request) {
        console.log("network error");
      } else {
        console.log(error);
      }
    }
  };

  return (
    <div className="background-login-signup d-flex align-items-center">
      <div
        className="mx-auto card rounded-4 mt-4 px-5 py-4"
        style={{ width: "40vw" }}
      >
        <h4 className="text-start font fontweight-700">Change Password</h4>
        <p>Please Change your Password</p>
        <form action="" onSubmit={handleSubmit}>
          <div className="my-4 ">
            <input
              autoComplete="password"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
              placeholder="Enter New Password"
              value={newPassword}
              onChange={handlePasswordChange}
              minLength={8}
              onInvalid={(e) => {
                e.preventDefault();
                if (newPassword) {
                  setNewPasswordError(
                    "Password must be atleast 8 characters long"
                  );
                } else {
                  setNewPasswordError("New Password is required");
                }
              }}
              type="password"
              className="form-control shadow-none my-2 text-black border-top-0 border-end-0 border-start-0 border-dark black rounded-0 font fontweight-400"
              id="newPassword"
              required
            />
            {newPasswordError && (
              <p className="text-danger">{newPasswordError}</p>
            )}
          </div>

          {!loading ? (
            <button
              type="submit"
              className="btn btn-primary rounded-4 bg-black border-0 my-2 w-100 font fontweight-600"
            >
              Change Password
            </button>
          ) : (
            <p className="text-center">Changing Password...</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;

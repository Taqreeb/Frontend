import React, { useState } from "react";
import MyImagePickerProfile from "../components/ImagePickers/MyImagePickerProfile";

const ProfilePage = () => {
  const [email, setEmail] = useState("example@example.com");
  const [password, setPassword] = useState("pass");
  const [name, setName] = useState("John Doe");
  const [phone, setPhone] = useState("1234567890");

  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingPhone, setIsEditingPhone] = useState(false);

  const handleSaveChangesEmail = () => {
    setIsEditingEmail(false);
    // Save changes to backend or update state as needed
  };

  const handleSaveChangesPassword = () => {
    setIsEditingPassword(false);
    // Save changes to backend or update state as needed
  };

  const handleSaveChangesName = () => {
    setIsEditingName(false);
    // Save changes to backend or update state as needed
  };

  const handleSaveChangesPhone = () => {
    setIsEditingPhone(false);
    // Save changes to backend or update state as needed
  };

  return (
    <>
      <div className="background-profile-top">
        <div className="container pt-4">
          <h1>My Profile</h1>
        </div>
      </div>
      <div className="background-profile pt-5">
        <div>
          <MyImagePickerProfile />
        </div>
        <div
          className="container w-50 text-center"
          style={{ marginTop: "5rem" }}
        >
          <div>
            {isEditingName ? (
              <div>
                <div className="container text-start mb-2">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                </div>
                <input
                  type="tel"
                  className="form-control"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <div className="container mt-2 ms-3 text-end">
                  <button
                    className="btn btn-success "
                    onClick={handleSaveChangesName}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            ) : (
              <div className="d-flex justify-content-between">
                <div>
                  <span>Name: </span>
                  <span>{name}</span>
                </div>
                <div>
                  <button
                    className="btn btn-primary"
                    onClick={() => setIsEditingName(true)}
                  >
                    Change User Name
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="mt-3">
            {isEditingPhone ? (
              <div>
                <div className="container text-start mb-2">
                  <label htmlFor="phone" className="form-label">
                    Phone No
                  </label>
                </div>
                <input
                  type="email"
                  className="form-control"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <div className="container mt-2 ms-3 text-end">
                  <button
                    className="btn btn-success "
                    onClick={handleSaveChangesPhone}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            ) : (
              <div className="mt-5 d-flex justify-content-between">
                <div>
                  <span>Phone No: </span>
                  <span>{phone}</span>
                </div>
                <div>
                  <button
                    className="btn btn-primary"
                    onClick={() => setIsEditingPhone(true)}
                  >
                    Change Phone No
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="mt-3">
            {isEditingEmail ? (
              <div>
                <div className="container text-start mb-2">
                  <label htmlFor="email" className="form-label">
                    Name
                  </label>
                </div>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div className="container mt-2 ms-3 text-end">
                  <button
                    className="btn btn-success "
                    onClick={handleSaveChangesEmail}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            ) : (
              <div className="mt-5 d-flex justify-content-between">
                <div>
                  <span>Email Address: </span>
                  <span>{email}</span>
                </div>
                <div>
                  <button
                    className="btn btn-primary "
                    onClick={() => setIsEditingEmail(true)}
                  >
                    Change Email Address
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="mt-3">
            {isEditingPassword ? (
              <div>
                <div className="container text-start mb-2">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                </div>

                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="container mt-2 ms-3 text-end">
                  <button
                    className="btn btn-success "
                    onClick={handleSaveChangesPassword}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            ) : (
              <div className="mt-5 d-flex justify-content-between">
                <div>
                  <span>Password: </span>
                  <span>********</span>
                </div>
                <div>
                  <button
                    className="btn btn-primary "
                    onClick={() => setIsEditingPassword(true)}
                  >
                    Change Password{" "}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;

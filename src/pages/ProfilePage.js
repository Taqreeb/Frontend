import React, { useEffect, useState } from "react";
import MyImagePickerProfile from "../components/ImagePickers/MyImagePickerProfile";
import axios from "axios";
import ChangePasswordModal from "../components/ChangePasswordModal";

const ProfilePage = (props) => {
  const validPhoneNo = new RegExp("^(03|\\+923)[0-9]{2}[0-9]{7}$");
  const role = localStorage.getItem("role");
  const title = role.charAt(0).toUpperCase() + role.slice(1)
  const authtoken = localStorage.getItem("authtoken");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [isEditingFirstName, setIsEditingFirstName] = useState(false);
  const [isEditingLastName, setIsEditingLastName] = useState(false);
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [saveButton, setSaveButton] = useState(false);

  const handleSaveChangesFirstName = async () => {
    if (firstName) {
      try {
        await axios.put(
          `http://localhost:5000/${role}/updateFirstName`,
          { FirstName: firstName },
          {
            headers: {
              "Content-Type": "application/json",
              "auth-token": authtoken,
            },
          }
        );
        setFirstNameError("");
        props.showAlert("First Name Changed Successfully", "success");
        setIsEditingFirstName(false);
        setSaveButton(true);
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
      setFirstNameError("First Name is required");
    }
  };

  const handleSaveChangesLastName = async () => {
    if (lastName) {
      try {
        await axios.put(
          `http://localhost:5000/${role}/updateLastName`,
          { LastName: lastName },
          {
            headers: {
              "Content-Type": "application/json",
              "auth-token": authtoken,
            },
          }
        );
        setLastNameError("");
        props.showAlert("Last Name Changed Successfully", "success");
        setIsEditingLastName(false);
        setSaveButton(true);
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
      setLastNameError("Last Name is required");
    }
  };

  const handleSaveChangesPhone = async () => {
    if (phone) {
      if (validPhoneNo.test(phone)) {
        try {
          await axios.put(
            `http://localhost:5000/${role}/updatePhone`,
            { PhoneNo: phone },
            {
              headers: {
                "Content-Type": "application/json",
                "auth-token": authtoken,
              },
            }
          );
          setPhoneError("");

          props.showAlert("Phone Number Changed Successfully", "success");

          setIsEditingPhone(false);
          setSaveButton(true);
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
        setPhoneError(
          "Please enter a valid phone number in the format 03XXXXXXXXX or +923XXXXXXXXX"
        );
      }
    } else {
      setPhoneError("Phone Number is required");
    }
  };

  const getProfile = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/${role}/profile`,
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": authtoken,
          },
        }
      );
      setFirstName(response.data.FirstName);
      setLastName(response.data.LastName);
      setEmail(response.data.Email);
      setPhone(response.data.PhoneNo);
    } catch (error) {
      if (error.response) {
        console.log(error.response);
      } else if (error.request) {
        console.log("network error");
      } else {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getProfile();
  }, [saveButton]);
  return (
    <>
      <div className="background-profile-top">
        <div className="container pt-4">
          <ChangePasswordModal showAlert={props.showAlert} />
          <h2>Welcome to your {title} Profile</h2>
          <p className="ms-5">You can manage your profile here</p>
        </div>
      </div>
      <div className="background-profile pt-5">
        <div>
          <MyImagePickerProfile
            role={role}
            authtoken={authtoken}
            setSaveButton={setSaveButton}
            showAlert= {props.showAlert}
          />
        </div>
        <div
          className="container w-50 text-center"
          style={{ marginTop: "5rem" }}
        >
          <div>
            {isEditingFirstName ? (
              <div>
                <div className="container text-start mb-2">
                  <label htmlFor="firstname" className="form-label">
                    First Name
                  </label>
                </div>
                <input
                  type="text"
                  className="form-control"
                  id="firstname"
                  value={firstName}
                  onChange={(e) => {setFirstName(e.target.value)
                  setFirstNameError("")}}
                />
                <div className="container mt-2 ms-3 text-end">
                  <button
                    className="btn btn-success "
                    onClick={handleSaveChangesFirstName}
                  >
                    Save Changes
                  </button>
                </div>
                {firstNameError && <span className="text-danger">{firstNameError}</span>}
              </div>
            ) : (
              <div className="d-flex justify-content-between">
                <div>
                  <span>First Name: </span>
                  <span>{firstName}</span>
                </div>
                <div>
                  <button
                    className="btn btn-primary"
                    onClick={() => setIsEditingFirstName(true)}
                  >
                    Change First Name
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="mt-3">
            {isEditingLastName ? (
              <div>
                <div className="container text-start mb-2">
                  <label htmlFor="lastname" className="form-label">
                    Last Name
                  </label>
                </div>
                <input
                  type="text"
                  className="form-control"
                  id="lastname"
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value)
                    setLastNameError("")
                  }}
                  required
                />
                <div className="container mt-2 ms-3 text-end">
                  <button
                    className="btn btn-success "
                    onClick={handleSaveChangesLastName}
                  >
                    Save Changes
                  </button>
                </div>
                {lastNameError && <span className="text-danger">{lastNameError}</span>}
              </div>
            ) : (
              <div className="mt-5 d-flex justify-content-between">
                <div>
                  <span>Last Name: </span>
                  <span>{lastName}</span>
                </div>
                <div>
                  <button
                    className="btn btn-primary"
                    onClick={() => setIsEditingLastName(true)}
                  >
                    Change Last Name
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
                  type="tel"
                  className="form-control"
                  id="phone"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value)
                    setPhoneError("")
                  }}
                />
                <div className="container mt-2 ms-3 text-end">
                  <button
                    className="btn btn-success "
                    onClick={handleSaveChangesPhone}
                  >
                    Save Changes
                  </button>
                </div>
                {phoneError && <span className="text-danger">{phoneError}</span>}
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
            <div className="mt-5 d-flex justify-content-between">
              <div>
                <span>Password: </span>
                <span>********</span>
              </div>
              <div>
                <button
                  data-bs-toggle="modal"
                  data-bs-target="#passwordmodal"
                  className="btn btn-primary"
                >
                  Change Password{" "}
                </button>
              </div>
            </div>
          </div>
          <div className="mt-3">
            <div className="mt-5 d-flex justify-content-between">
              <div>
                <span>Email Address: </span>
                <span>{email}</span>
              </div>
              <div>
        
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;

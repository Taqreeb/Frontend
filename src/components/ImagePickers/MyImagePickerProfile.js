import axios from "axios";
import React, { useState } from "react";
import defaultImage from '../../img/default_profile.png'
import { API_URL } from "../../utils/apiUrl";
const MyImagePickerProfile = (props) => {
  const {role, authtoken,setSaveButton,saveButton } = props;
  const profilePicture = localStorage.getItem('profile_picture')
  const [image, setImage] = useState(profilePicture);
  const [isEditPicture, SetIsEditPicture] = useState(false);
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePictureButtonClick = () => {
    setImage(defaultImage);
  };
  const handleSavePictureButtonClick = async () => {
      try {
        await axios.put(
          `${API_URL}/${role}/updateProfilePicture`,
          { profile_picture: image },
          {
            headers: {
              "Content-Type": "application/json",
              "auth-token": authtoken,
            },
          }
        );
        
        props.showAlert("Profile Picture Changed Successfully", "success");
        localStorage.setItem("profile_picture",image)
        SetIsEditPicture(false);
        setSaveButton(!saveButton);
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

  return (
    <div className="container text-center">
      <img
        src={image}
        alt="My Profile"
        className="rounded-circle"
        style={{ width: "150px", height: "150px", objectFit: "cover" }}
      />

      <br />
      {!isEditPicture && (
        <button
          className="btn btn-primary mt-3"
          onClick={() => SetIsEditPicture(true)}
        >
          Edit Profile Picture
        </button>
      )}

      {isEditPicture && (
        <div>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="d-none"
            id="imageUpload"
          />
          
            <label htmlFor="imageUpload" className="btn btn-primary mt-3 mx-3">
              Change Profile Picture
            </label>
          
          {image && (
            <button
              className="btn btn-danger mt-3"
              onClick={handleRemovePictureButtonClick}
            >
              Remove Profile Picture
            </button>
          )}
          <br />
          <button
            className="btn btn-success mt-3"
            onClick={handleSavePictureButtonClick}
          >
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
};

export default MyImagePickerProfile;

import axios from "axios";
import React, { useState } from "react";
import { API_URL } from "../../utils/apiUrl";

const MyImagePickerBusiness = (props) => {
  const {role, authtoken,setSaveButton,businessId,displayPicture } = props;
  const [image, setImage] = useState(displayPicture);
  const [isEditPicture, SetIsEditPicture] = useState(false);
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
};

  const handleSavePictureButtonClick = async () => {
      try {
        const response = await axios.put(
          `${API_URL}/${role}/businessDisplay/${businessId}`,
          { business_display_picture: image },
          {
            headers: {
              "Content-Type": "application/json",
              "auth-token": authtoken,
            },
          }
        );
        if(response.data.success){
        props.showAlert("Business Display Picture Changed Successfully", "success");
        SetIsEditPicture(false);
        setSaveButton(true);
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
          onClick={
            () => {
              SetIsEditPicture(true)
              console.log(displayPicture)
            }
          }
        >
          Edit Business Display
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
              Change Business Display
            </label>
          
         
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

export default MyImagePickerBusiness;

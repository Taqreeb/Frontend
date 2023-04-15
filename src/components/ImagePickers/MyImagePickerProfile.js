import React, { useState } from "react";
const defaultImage = "https://via.placeholder.com/150";

const MyImagePickerProfile = () => {
  const [image, setImage] = useState(null);
  const [isEditPicture,SetIsEditPicture] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };
  const handleRemoveButtonClick = () => {
    setImage(null)
   
  };
  const handleSaveButtonClick = () => {
    SetIsEditPicture(false)
   
  };

  return (
    <div className="container text-center">
     
      <img
        src={image ? image : defaultImage}
        alt="My Profile"
        className="rounded-circle"
        style={{ width: "150px", height: "150px", objectFit: "cover" }}
      />
   
      <br />
     {!isEditPicture&&<button className="btn btn-primary mt-3" onClick={()=> SetIsEditPicture(true)}>Edit Profile Picture</button>}
      
        {isEditPicture &&
        <div>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="d-none"
            id="imageUpload"
          />
          {image ?<label htmlFor="imageUpload" className="btn btn-primary mt-3 mx-3">
            Change Profile Picture
          </label>:<label htmlFor="imageUpload" className="btn btn-primary mt-3 mx-3">
            Upload Profile Picture
          </label>}
          {image &&<button className="btn btn-danger mt-3" onClick={handleRemoveButtonClick}>Remove Profile Picture</button>}<br/>  
          <button className="btn btn-success mt-3" onClick={handleSaveButtonClick}>Save Changes</button>
        </div>}
    </div>
  );
};

export default MyImagePickerProfile;

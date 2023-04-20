import React, { useState } from "react";

const BusinessPage1 = () => {
  const [image, setImage] = useState(null);
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };
  return (
    <div>
      <div className="container text-center my-3">
        <img
          src={image ? image : "https://via.placeholder.com/150"}
          alt="My Profile"
          className="rounded-circle"
          style={{ width: "150px", height: "150px", objectFit: "cover" }}
        />

        <div>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="d-none"
            id="imageUpload"
          />
          <label htmlFor="imageUpload" className="btn btn-primary mt-2">
            Choose Image
          </label>
        </div>
      </div>
    </div>
  );
};

export default BusinessPage1;

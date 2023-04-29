import React from "react";

const EditBusinessOverlay = ({ title, imageUrl }) => {
  return (
    <div>
      <div className="card text-bg-dark rounded-4">
        <img
          src={imageUrl}
          className="card-img rounded-4"
          alt={title}
          style={{ width: "100%", objectFit: "cover", height: "30vh" }}
        />
        <div className="card-img-overlay d-flex align-items-center justify-content-center">
          <h4 className="card-title">{title}</h4>
        </div>
      </div>
    </div>
  );
};

export default EditBusinessOverlay;

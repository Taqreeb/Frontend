import React from "react";
import { NavLink } from "../imports";
const CardOverlay = ({ title,vendorType, imageUrl }) => {
  return (
    <NavLink to={`/category/${vendorType}`}>
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
    </NavLink>
  );
};

export default CardOverlay;

import React from "react";
import { vendors } from "../utils/constants";
import {FaEdit,FaTrashAlt,FaMapMarkerAlt} from 'react-icons/fa'
import StarRating from "./StarRating";
const editButton = <FaEdit/>
const deleteButton = <FaTrashAlt/>
const mapMarker = <FaMapMarkerAlt />;
const VendorCards = () => {
  const cards = vendors.filter(
    (vendor) => vendor.vendor_type === "photographer"
  );

  return (
    <div>
      <div className="container mb-5 text-decoration-none">
        <div className="row g-5 ">
          {cards.map((card) => (
            <div className="col" key={card.id}>
              <div className="card" style={{ width: "20rem" }}>
                <div className="d-flex justify-content-end mx-3">
                  <i className="text-primary fs-6 mx-3" style={{cursor:"pointer"}}>{editButton}</i>
                  <i className="text-danger fs-6" style={{cursor:"pointer"}}>{deleteButton}</i>
                </div>
                <img
                  src={card.display_picture}
                  className="card-img-top px-3 py-3"
                  alt={card.name}
                  style={{ height: "250px", borderRadius: "25px" }}
                />
                <div className="card-body text-center ">
                  <h5 className="card-title">{card.business_name}</h5>
                  <p>{card.vendorType}</p>
                  <div className="d-inline-flex">
                    <StarRating star={card.rating} />
                    &nbsp;
                    <p>({card.no_of_reviews} reviews)</p>
                  </div>
                  <p className="font fontweight-400 card-text">
                    <i className="fs-6">{mapMarker}</i> {card.location}
                  </p>
                  <p className="font fontweight-500">
                    Rs {card.price} per event (estimated)
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VendorCards;

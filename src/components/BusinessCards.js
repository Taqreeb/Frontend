import React, { useRef } from "react";
import { FaEdit, FaTrashAlt, FaMapMarkerAlt } from "react-icons/fa";
import StarRating from "./StarRating";
import { NavLink } from "react-router-dom";

const editButton = <FaEdit />;
const deleteButton = <FaTrashAlt />;
const mapMarker = <FaMapMarkerAlt />;
const BusinessCards = ({ cards, showAlert }) => {
  const modalRef = useRef(null);

  const handleDeleteBusiness = async () => {
    modalRef.current.setAttribute("data-bs-dismiss", "modal");
    modalRef.current.click();

    showAlert("You have deleted your business succesfully", "success");
  };

  const DeleteBusinessPopup = () => {
    return (
    <div
      className="modal fade"
      id="deleteBusiness"
      tabIndex="-1"
      aria-labelledby="deleteBusinessLabel"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      aria-hidden="true"
      ref={modalRef}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header text-center">
            <h5 className="modal-title" id="deleteBusinessLabel">
              Deleting Your Business
            </h5>
          </div>
          <div className="modal-body">
            <p>Are You sure you want to delete this business?</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-dark"
              data-bs-dismiss="modal"
            >
              No
            </button>
            <button
              type="button"
              id="button"
              className="btn btn-dark"
              onClick={handleDeleteBusiness}
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
    );
  };

  if (cards.length !== 0) {
    return (
      <div>
        <DeleteBusinessPopup />
        <div className="container mb-5 text-decoration-none">
          <div className="row g-5 ">
            {cards.map((card) => (
              <div className="col" key={card._id}>
                <div className="card" style={{ width: "20rem" }}>
                  <div className="d-flex justify-content-end mx-3">
                    <i
                      className="text-primary fs-6 mx-3"
                      style={{ cursor: "pointer" }}
                    >
                      {editButton}
                    </i>
                    
                    <i
                      className="text-danger fs-6"                
                      data-bs-toggle="modal"
                      data-bs-target="#deleteBusiness"
                      style={{ cursor: "pointer" }}
                    >
                      {deleteButton}
                    </i>
                  </div>
                  <NavLink
                    className="text-decoration-none text-dark"
                    to={`/businessdetails/${card.business_type}/${card.business_name}/${card.vendor_id}/${card._id}`}
                    state={{ cards: card }}
                  >
                    <img
                      src={card.business_display_picture}
                      className="card-img-top px-3 py-3"
                      alt={card.business_name}
                      style={{ height: "250px", borderRadius: "25px" }}
                    />
                    <div className="card-body text-center ">
                      <h5 className="card-title">{card.business_name}</h5>
                      <p>
                        {card.business_type.charAt(0).toUpperCase() +
                          card.business_type.slice(1)}
                      </p>
                      <div className="d-inline-flex">
                        <StarRating star={card.rating} />
                        &nbsp;
                        <p>({card.numOfReviews} reviews)</p>
                      </div>
                      <p className="font fontweight-400 card-text">
                        <i className="fs-6">{mapMarker}</i>{" "}
                        {card.business_location}
                      </p>
                      <p className="font fontweight-500">
                        Rs {card.estimated_price} per event (estimated)
                      </p>
                      <span>business status:</span>{" "}
                      <span>{card.business_status}</span>
                    </div>
                  </NavLink>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  } else {
    return <h1 className="text-center">No Businesses to show</h1>;
  }
};

export default BusinessCards;

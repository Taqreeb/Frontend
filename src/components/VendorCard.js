import React from "react";
import { NavLink } from "react-router-dom";
import StarRating from "./StarRating";
import { FaMapMarkerAlt } from "react-icons/fa";
const mapMarker = <FaMapMarkerAlt />;
const VendorCard = ({ cards, vendorType }) => {

  const vendor = vendorType.charAt(0).toUpperCase() + vendorType.slice(1);

  if (cards.length!==0) {
    return (
      <div>
        <div className="container mb-5 text-decoration-none">
          <div className="row row-cols-1 row-cols-md-3 g-4 ">
            {cards.map((card) => (
              <div className="col" key={card.id}>
                <NavLink
                  className="text-decoration-none text-dark"
                  to={`/vendor/${vendorType}/${card.title}/${card.id}`}
                  state={{ cards: cards }}
                >
                  <div className="card" style={{ width: "20rem" }}>
                    <img
                      src={card.imageUrl}
                      className="card-img-top px-3 py-3"
                      alt="..."
                      style={{ height: "250px", borderRadius: "25px" }}
                    />
                    <div className="card-body text-center ">
                      <h5 className="card-title">{card.title}</h5>
                      <p>{vendor}</p>
                      <div className="d-inline-flex">
                        <StarRating star={card.rating} />
                        &nbsp;
                        <p>({card.reviews} reviews)</p>
                      </div>
                      <p className="font fontweight-400 card-text">
                        <i className="fs-6">{mapMarker}</i> {card.location}
                      </p>
                      <p className="font fontweight-500">
                        Rs {card.price} per day
                      </p>
                    </div>
                  </div>
                </NavLink>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  } else {
    return <h1 className="text-center">No {vendor} to show</h1>;
  }
};

export default VendorCard;

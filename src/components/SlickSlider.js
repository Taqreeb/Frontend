import React from "react";
import { NavLink } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaMapMarkerAlt } from "react-icons/fa";
import StarRating from "./StarRating";

const mapMarker = <FaMapMarkerAlt />;
const SlickSlider = (props) => {
  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };
  const { title, vendors, vendorType } = props;
  const vendor = vendors.filter((vendor) => vendor.vendorType === vendorType);
  const sortedProducts = vendor.sort((a, b) => b.rating - a.rating);
  const topRatedProducts = sortedProducts.slice(0, 6);
  return (
    <div className="my-5" style={{ marginLeft: "5rem", marginRight: "5rem" }}>
      {vendor.length !== 0 ? (
        <div>
          <div className="d-flex justify-content-between">
            <h2 className="text-uppercase">{title}</h2>
            <NavLink to={`/vendor/${vendorType}`}>
              <button
                type="button"
                className="btn btn-outline-danger rounded-0"
              >
                View all
              </button>
            </NavLink>
          </div>
        </div>
      ) : (
        <div />
      )}
      <Slider {...settings} >
        {topRatedProducts.map((vendor) => (
          <NavLink
            key={vendor.id}
            state={{ cards: vendor }}
            to={`vendor/${vendorType}/${vendor.title}/${vendor.id}`}
          >
            {" "}
            <div
              className="card my-4 border-0 text-white"
              style={{ width: "98%" }}
            >
              <img
                src={vendor.imageUrl}
                className="card-img"
                alt={vendor.title}
                style={{ maxHeight: "250px", minHeight: "250px" }}
              />
              <div className="card-overlay ">
                <div className="d-flex justify-content-between">
                  <h5 className=" card-title text-uppercase ">
                    {vendor.title}
                  </h5>
                  <p>{vendor.reviews} Reviews</p>
                </div>
                <div className="d-flex justify-content-between">
                  <p className=" card-text ">
                    <i className="fs-6">{mapMarker}</i> {vendor.location}
                  </p>
                  <StarRating star={vendor.rating} />
                </div>
              </div>
            </div>
          </NavLink>
        ))}
      </Slider>
    </div>
  );
};

export default SlickSlider;

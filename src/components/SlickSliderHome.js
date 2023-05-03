import React from "react";
import { NavLink } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaMapMarkerAlt } from "react-icons/fa";
import StarRating from "./StarRating";

const mapMarker = <FaMapMarkerAlt />;

const SlickSliderHome = (props) => {
  const { title, businesses, vendorType } = props;
  console.log(businesses)
  const vendor = businesses.filter(
    (businesses) => businesses.business_type === vendorType
  );
  const sortedProducts = vendor.sort((a, b) => b.rating - a.rating);
  const topRatedProducts = sortedProducts.slice(0, 6);
  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow:
      topRatedProducts.length >= 3 ? 3 : topRatedProducts.length === 2 ? 2 : 1,
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

  return (
    <div className="my-5" style={{ marginLeft: "5rem", marginRight: "5rem" }}>
      {vendor.length !== 0 ? (
        <div>
          <div className="d-flex justify-content-between">
            <h2 className="text-uppercase">{title}</h2>
            <NavLink to={`/category/${vendorType}`}>
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
      <Slider {...settings}>
        {topRatedProducts.map((business) => (
          <NavLink
            key={business._id}
            state={{ cards: business }}
            to={`/category/${vendorType}/${business.business_name}/${business.vendor_id}/${business._id}`}
          >
            {" "}
            <div
              className="card my-4 border-0 text-white"
              style={{ width: "98%" }}
            >
              <img
                src={business.business_display_picture}
                className="card-img"
                alt={business.business_name}
                style={{ maxHeight: "250px", minHeight: "250px" }}
              />
              <div className="card-overlay ">
                <div className="d-flex justify-content-between">
                  <h5 className=" card-title text-uppercase ">
                    {business.business_name}
                  </h5>
                  <p>{business.numOfReviews}Reviews</p>
                </div>
                <div className="d-flex justify-content-between">
                  <p className=" card-text ">
                    <i className="fs-6">{mapMarker}</i> {business.business_location}
                  </p>
                  <StarRating star={business.rating} />
                </div>
              </div>
            </div>
          </NavLink>
        ))}
      </Slider>
    </div>
  );
};

export default SlickSliderHome;

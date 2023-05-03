import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import cash from "../img/cash.jpg";
import { NavLink } from "react-router-dom";

const SlickSliderPackages = ({
  vendorPackages,
  businessName,
  vendorType,
  vendorId,
}) => {
  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: vendorPackages.length >= 3 ? 3 : 2,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: false,
          dots: false,
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
    <Slider {...settings}>
      {vendorPackages.map(
        (packages) =>
          packages.price && (
            <NavLink
            key={packages._id}
            to={`/category/${vendorType}/${businessName}/${vendorId}/packages`}
            state={{ packages: packages }}
          >
            <div  className="container">
             
                <div className="card text-black text-center">
                  <img
                    src={cash}
                    className="card-img"
                    alt={packages.name}
                    style={{ maxHeight: "100px", minHeight: "100px" }}
                  />
                  <div className="card-overlay">
                    <p className="my-5">{packages.name}</p>
                    <p className="mb-1">PKR {packages.price}</p>
                  </div>
                </div>
             
            </div>
            </NavLink>
          )
      )}
    </Slider>
  );
};

export default SlickSliderPackages;

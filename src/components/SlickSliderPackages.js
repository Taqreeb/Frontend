import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import cash from "../img/cash.jpg";

const SlickSliderPackages = ({ vendorPackages }) => {
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
      {vendorPackages.map((packages) => (
        <div key={packages._id} className="container">
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
      ))}
    </Slider>
  );
};

export default SlickSliderPackages;

import React from "react";
import { NavLink } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SlickSliderAlbums = ({businessDisplayPicture, vendorAlbums,businessName,vendorType,vendorId }) => {
  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow:
      vendorAlbums.length >= 2 ? 2 : 1,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
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
    <Slider className="album-slider mx-1" {...settings}>
      {vendorAlbums.map((album) => (
        <NavLink
          key={album._id}
          state={{ album: album, businessDisplayPicture:businessDisplayPicture }}
          to = {`/category/${vendorType}/${businessName}/${vendorId}/${album.album_name}/${album._id}`}
        >
          {" "}
          <div
            className="card text-center text-white"
            style={{ width: "98%" }}
          >
            <img
              src={album.images[0].url}
              className="card-img"
              alt={album.album_name}
              style={{ maxHeight: "120px", minHeight: "120px" }}
            />
            <div className="card-overlay ">
              <h6 style={{marginBottom:"5.5rem"}}>{album.album_name}</h6>
            </div>
          </div>
        </NavLink>
      ))}
    </Slider>
  );
};

export default SlickSliderAlbums;

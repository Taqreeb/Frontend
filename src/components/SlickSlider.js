import React from "react";
import { NavLink } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import {FaMapMarkerAlt } from "react-icons/fa";
import StarRating from "./StarRating";
const mapMarker= <FaMapMarkerAlt/>
const SlickSlider = (props) => {
  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    
  };
  const { title,cards } = props;
  return (
    <div className="my-5" style={{marginLeft:"5rem",marginRight:"5rem"}}>
      <div>
        <div className="d-flex justify-content-between">
          <h2 className="text-uppercase">{title}</h2>
          <NavLink to="/contact">
            <button type="button" className="btn btn-outline-danger rounded-0">
              View all
            </button>
          </NavLink>
        </div>
      </div>
      <Slider {...settings}>

       {cards.map((card, index) => ( 
      <NavLink key={index} to='/contact'> <div className="card my-4 border-0 text-white"  >
         <img src={card.imageUrl} className="card-img rounded-4" alt={card.title} style={{maxHeight:'250px',minHeight:'250px',width:'98%'}}/>
      <div className="card-overlay ">  
      <div className="d-flex justify-content-between">
       <h5 className=" card-title text-uppercase ">{card.title}</h5>
       <p >{card.reviews} Reviews</p>
       </div>
       <div className="d-flex justify-content-between">
       <p className=" card-text "><i className="fs-6" >{mapMarker}</i> {card.location}</p>
       <StarRating star={card.star} /> 
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

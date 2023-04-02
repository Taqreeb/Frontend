import React from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";
const StarRating = (props) => {
  const { star } = props;
  const ratingStar = Array.from({ length: 5 }, (elem, index) => {
    let number = index + 0.5;
    return (
      <span key={index}>
        {star >= index + 1 ? (
          <FaStar className="star-icon" />
        ) : star >= number ? (
          <FaStarHalfAlt className="star-icon" />
        ) : (
          <AiOutlineStar className="star-icon" />
        )}
      </span>
    );
  });
  return (
    <>
      <div className="icon-style">{ratingStar}</div>
    </>
  );
};

export default StarRating;

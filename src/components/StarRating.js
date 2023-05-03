import React from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";
const StarRating = (props) => {
  const { star,type } = props;
  const ratingStar = Array.from({ length: 5 }, (elem, index) => {
    let number = index + 0.5;
    return (
      <span key={index}>
        {star >= index + 1 ? (
          <FaStar className={type==="VendorProfile"?"star-icon-vendor-details":type==="VendorReviews"?"star-icon-review":"star-icon"} />
        ) : star >= number ? (
          <FaStarHalfAlt className={type==="VendorProfile"?"star-icon-vendor-details":type==="VendorReviews"?"star-icon-review":"star-icon"} />
        ) : (
          <AiOutlineStar className={type==="VendorProfile"?"star-icon-vendor-details":type==="VendorReviews"?"star-icon-review":"star-icon"} />
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

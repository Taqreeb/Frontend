import React, { useRef, useState } from "react";
import { FaStar } from "react-icons/fa";
const WriteReviewModal = () => {
  const [review, setReview] = useState("");
  const [reviewError, setReviewError] = useState("");
  const [ratingError, setRatingError] = useState("");
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const modalRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (review && rating) {
      console.log(review + "and" + rating);
      setReview("");
      setReviewError("");
      setRatingError("");
      setRating(null);
      modalRef.current.setAttribute("data-bs-dismiss", "modal"); 
      modalRef.current.click();
    } else if (!rating && review) {
      setRatingError("Rating is required");
    } else if (!review && rating) {
      setReviewError("Review is required");
    } else if (!rating && !review) {
      setRatingError("Rating is required");
      setReviewError("Review is required");
    }
  };

  const handleReviewChange = (e) => {
    setReview(e.target.value);
    setReviewError("");
    console.log(e.target.value);
  };
  return (
    <div
      className="modal fade"
      id="exampleModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      aria-hidden="true"
      ref={modalRef}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header text-center">
            <h5 className="modal-title" id="exampleModalLabel">
              Write a review
            </h5>
          </div>
          <div className="modal-body">
            <div className="text-start mb-3">
              {[...Array(5)].map((star, index) => {
                const ratingValue = index + 1;
                return (
                  <label key={index}>
                    <input
                      type="radio"
                      name="rating"
                      style={{ display: "none" }}
                      value={ratingValue}
                      onClick={() => {
                        setRating(ratingValue);
                        setRatingError("");
                      }}
                    />
                    <FaStar
                      className="star"
                      color={
                        ratingValue <= (hover || rating) ? "#ffcc00" : "#ccc"
                      }
                      onMouseLeave={() => setHover(null)}
                      onMouseEnter={() => setHover(ratingValue)}
                    />
                  </label>
                );
              })}
              {ratingError && (
                <p className="text-danger text-start mt-2">{ratingError}</p>
              )}
            </div>
            <form>
              <div className="mb-3">
                <textarea
                  className="form-control"
                  id="message-text"
                  rows="3"
                  placeholder="Write your review"
                  value={review}
                  onChange={handleReviewChange}
                ></textarea>
                {reviewError && (
                  <p className="text-danger text-start mt-2">{reviewError}</p>
                )}
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-dark"
              data-bs-dismiss="modal"
              onClick={(e) => {
                setRating(null);
                setReview("");
                setReviewError("");
              }}
            >
              Close
            </button>
            <button
              type="button"
              id="submit-button"
              className="btn btn-dark"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WriteReviewModal;

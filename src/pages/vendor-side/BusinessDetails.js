import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import SlickSliderAlbums from "../../components/SlickSliderAlbums";
import SlickSliderPackages from "../../components/SlickSliderPackages";
import StarRating from "../../components/StarRating";
import { returnPaginationPage } from "../../utils/pagination-utils";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaRegEnvelope,
  FaFacebook,
  FaYoutube,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa";
import WhatsappChat from "react-whatsapp";
import axios from "axios";
import { API_URL } from "../../utils/apiUrl";
import LoadingScreen from "../../components/LoadingScreen";

const whatsappIcon = <FaWhatsapp />;
const youtubeIcon = <FaYoutube />;
const instagramIcon = <FaInstagram />;
const facebookIcon = <FaFacebook />;
const emailIcon = <FaRegEnvelope />;
const phoneIcon = <FaPhoneAlt />;
const mapMarkerIcon = <FaMapMarkerAlt />;

const BusinessDetails = () => {
  const location = useLocation();
  const card = location.state.cards;
  const { businessId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loadingGetReviews, setLoadingGetReviews] = useState(false);
  
  const getAllReviews = async () => {
    setLoadingGetReviews(true);
    try {
      const response = await axios.get(
        `${API_URL}/user/business/${businessId}/review`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setReviews(response.data);
      setLoadingGetReviews(false);
    } catch (error) {
      if (error.response) {
        console.log(error.response);
      } else if (error.request) {
        console.log("network error");
      } else {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    getAllReviews();
  }, []);


  

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = reviews ? reviews.slice(firstIndex, lastIndex) : 0;
  const totalPage = reviews ? Math.ceil(reviews.length / recordsPerPage) : 0;

  const paginate = (pageNumber) => {
    if (pageNumber === "... ") {
      setCurrentPage(1);
    } else if (pageNumber === " ...") {
      setCurrentPage(totalPage);
    } else {
      setCurrentPage(pageNumber);
    }
  };
  const prevPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const nextPage = () => {
    if (currentPage !== totalPage) {
      setCurrentPage(currentPage + 1);
    }
  };
  let array = returnPaginationPage(totalPage, currentPage, recordsPerPage, 1);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <>
      {!loadingGetReviews ? (
        <div className="overflow-x-hidden overflow-y-hidden">
          <div className="background-top-specific-vendor">
            <div className="row pt-3">
              <div className="col ms-5">
                <h1>{card.business_name}</h1>
                <p className="ms-3">{capitalizeFirstLetter(card.business_type)}</p>
              </div>
              <div className="col">
                <div className="d-flex">
                  <StarRating star={card.rating} type="VendorProfile" />
                  <p className="mx-2">{card.numOfReviews} reviews</p>
                </div>
                {card.venue_persons_capacity && (
                  <p>Capacity: {card.venue_persons_capacity} persons</p>
                )}
                {card.venue_coverage_area && (
                  <p>Coverage Area: {card.venue_coverage_area} sq yards</p>
                )}
              </div>
              <div className="col pt-4">
                <span className="fs-4">Business Status: </span>
                <span className="fs-4">{card.business_status}</span>
              </div>
            </div>
          </div>

          <div className="background-body-specific-vendor pb-5">
            <div className="row">
              <div className="col-4">
                <div
                  className="card mx-auto mt-5"
                  style={{ borderRadius: "20px", width: "20vw" }}
                >
                  <img
                    src={card.business_display_picture}
                    className="card-img"
                    alt="..."
                    style={{ height: "40vh", borderRadius: "20px" }}
                  />
                </div>
                <div className="container text-center my-4">
                  <div className="container w-50 text-center">
                    <p>
                      <i className="fs-6 mx-1">{mapMarkerIcon}</i>{" "}
                      {card.business_address}
                    </p>
                    <p className="d-flex ">
                      <i className="fs-6 mx-1">{emailIcon}</i>
                      {card.business_email}
                    </p>
                    <p>
                      <i className="fs-6 mx-1">{phoneIcon}</i>
                      {card.business_phone_number}
                    </p>
                    <div className="d-flex justify-content-between">
                      {card.business_facebook_url ? (
                        <a
                          href={`//${card.business_facebook_url}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <i className="fs-5 text-primary">{facebookIcon}</i>
                        </a>
                      ) : (
                        <div />
                      )}
                      {card.business_youtube_url ? (
                        <a
                          href={`//${card.business_youtube_url}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <i className="fs-5 text-danger">{youtubeIcon}</i>
                        </a>
                      ) : (
                        <div />
                      )}
                      {card.business_instagram_url ? (
                        <a
                          href={`//${card.business_instagram_url}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <i className="fs-5 text-danger">{instagramIcon}</i>
                        </a>
                      ) : (
                        <div />
                      )}
                      <WhatsappChat
                        element="i"
                        number={card.business_phone_number}
                      >
                        <i
                          className="fs-5 text-success"
                          style={{ cursor: "pointer" }}
                        >
                          {whatsappIcon}
                        </i>
                      </WhatsappChat>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-5 col-5">
                <h4>{card.business_name}</h4>
                <p className="mt-4">{card.business_description}</p>
                <div className="container rounded-3 mt-4 vendor-packages-album">
                  {card.business_packages ? (
                    <div>
                      <p className="text-secondary fs-5">Packages</p>
                      <SlickSliderPackages
                        vendorPackages={card.business_packages}
                      />
                    </div>
                  ) : (
                    <h4 className="text-center text-black">No Packages Yet</h4>
                  )}
                </div>
                <div className="container rounded-3 mt-4 vendor-packages-album">
                  {card.business_albums ? (
                    <div>
                      <p className="text-secondary fs-5">
                        Albums ({card.business_albums.length})
                      </p>

                      <SlickSliderAlbums
                        businessDisplayPicture={card.business_display_picture}
                        businessName={card.business_name}
                        vendorType={card.business_type}
                        vendorId={card._id}
                        vendorAlbums={card.business_albums}
                      />
                    </div>
                  ) : (
                    <h4 className="text-center text-black">No Albums Yet</h4>
                  )}
                </div>
              </div>
            </div>
            <div className="container">
              <div className="vendor-reviews">
                <div className="d-flex justify-content-center align-items-center text-center">
                  <div className="mx-4 my-3">
                    <StarRating star={card.rating} type="VendorReviews" />
                    <span className="my-2 fs-5">{card.rating}/5.0</span>
                    <br />
                    <span className="fs-5">{card.numOfReviews} reviews</span>
                  </div>
                </div>
                <hr />
                {records ? (
                  records.map((review) => (
                    <div key={review._id}>
                      <div className="row">
                        <div className="col align-self-center container ms-5">
                          <p>{review.user_name}</p>
                        </div>
                        <div className="col-9">
                          <div className="d-inline-flex">
                            <StarRating star={review.rating} />
                            &nbsp;
                            <p>{review.rating} </p>
                          </div>

                          <p>{review.review}</p>
                        </div>

                        <div className="col">
                          <p>
                            {" "}
                            {new Date(
                              review.date_of_review
                            ).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <hr />
                    </div>
                  ))
                ) : (
                  <h1 className="text-center">No Reviews</h1>
                )}
                {reviews && (
                  <div className="d-flex justify-content-center">
                    <ul className="pagination">
                      <li
                        onClick={() => setCurrentPage(1)}
                        className="page-link pagination-hover"
                      >
                        &laquo;
                      </li>
                      <li
                        onClick={prevPage}
                        className="page-link pagination-hover"
                      >
                        &lsaquo;
                      </li>
                      {array.map((value) => (
                        <li
                          key={value}
                          onClick={() => paginate(value)}
                          className={`page-link ${
                            currentPage === value ? "active" : ""
                          } pagination-hover`}
                        >
                          {value}
                        </li>
                      ))}
                      <li
                        onClick={nextPage}
                        className="page-link pagination-hover"
                      >
                        &rsaquo;
                      </li>
                      <li
                        onClick={() => setCurrentPage(totalPage)}
                        className="page-link pagination-hover"
                      >
                        &raquo;
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <LoadingScreen />
      )}
    </>
  );
};

export default BusinessDetails;

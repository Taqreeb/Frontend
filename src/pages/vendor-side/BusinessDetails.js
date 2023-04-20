import React, { useState } from "react";
import { useLocation} from "react-router-dom";
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
  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = card.reviews ? card.reviews.slice(firstIndex, lastIndex) : 0;
  const totalPage = card.reviews
    ? Math.ceil(card.reviews.length / recordsPerPage)
    : 0;

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

  return (
    <div className="overflow-x-hidden overflow-y-hidden">
      <div className="background-top-specific-vendor">
        <div className="row pt-3">
          <div className="col ms-5">
            <h1>{card.business_name}</h1>
          </div>
          <div className="col">
            <div className="d-flex">
              <StarRating star={card.rating} type="VendorProfile" />
              <p className="mx-2">{card.no_of_reviews} reviews</p>
            </div>
            {card.person_capacity && (
              <p>Capacity: {card.person_capacity} persons</p>
            )}
            {card.coverage_area && (
              <p>Coverage Area: {card.coverage_area} sq yards</p>
            )}
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
                src={card.display_picture}
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
                  {card.phone_number}
                </p>
                <div className="d-flex justify-content-between">
                  {card.facebook ? (
                    <a
                      href={`//${card.facebook}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <i className="fs-5 text-primary">{facebookIcon}</i>
                    </a>
                  ) : (
                    <div />
                  )}
                  {card.youtube ? (
                    <a
                      href={`//${card.youtube}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <i className="fs-5 text-danger">{youtubeIcon}</i>
                    </a>
                  ) : (
                    <div />
                  )}
                  {card.instagram ? (
                    <a
                      href={`//${card.instagram}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <i className="fs-5 text-danger">{instagramIcon}</i>
                    </a>
                  ) : (
                    <div />
                  )}
                  <WhatsappChat element="i" number={card.phone_number}>
                    <i className="fs-5 text-success">{whatsappIcon}</i>
                  </WhatsappChat>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-5 col-5">
            <h4>{card.business_name}</h4>
            <p className="mt-4">{card.business_description}</p>
            <div className="container rounded-3 mt-4 vendor-packages-album">
              {card.packages ? (
                <div>
                  <p className="text-secondary fs-5">Packages</p>
                  <SlickSliderPackages vendorPackages={card.packages} />
                </div>
              ) : (
                <h4 className="text-center text-black">No Packages Yet</h4>
              )}
            </div>
            <div className="container rounded-3 mt-4 vendor-packages-album">
              {card.albums ? (
                <div>
                  <p className="text-secondary fs-5">
                    Albums ({card.albums.length})
                  </p>

                  <SlickSliderAlbums
                    businessName={card.business_name}
                    vendorType={card.vendor_type}
                    vendorId={card.id}
                    vendorAlbums={card.albums}
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
                <span className="fs-5">{card.no_of_reviews} reviews</span>
              </div>
            </div>
            <hr />
            {records ? (
              records.map((review, index) => (
                <div key={index}>
                  <div className="row">
                    <div className="col align-self-center container ms-5">
                      <p>{review.name}</p>
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
                      <p>{review.time}</p>
                    </div>
                  </div>
                  <hr />
                </div>
              ))
            ) : (
              <h1 className="text-center">No Reviews</h1>
            )}
            {card.reviews && (
              <div className="d-flex justify-content-center">
                <ul className="pagination">
                  <li
                    onClick={() => setCurrentPage(1)}
                    className="page-link pagination-hover"
                  >
                    &laquo;
                  </li>
                  <li onClick={prevPage} className="page-link pagination-hover">
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
                  <li onClick={nextPage} className="page-link pagination-hover">
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
  );
};

export default BusinessDetails;

import React from "react";
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
const Footer = () => {
  return (
    <div className="footer text-white">
      <div className="d-flex justify-content-around">
        <div className="mt-3">
          <h5>About</h5>
        </div>
        <div className="mt-3">
          <h5>Contact</h5>
          <div className="container text-center">
            <p className="d-flex">
              <i className="fs-6 mx-1">{mapMarkerIcon}</i> Institute Of Business
              Administration, Karachi, Pakistan
            </p>
            <p className="d-flex ">
              <i className="fs-6 mx-1">{emailIcon}</i>
              taqreeb2@gmail.com
            </p>
            <p className="d-flex">
              <i className="fs-6 mx-1 ">{phoneIcon}</i>
              +923422341235
            </p>
            <div className="d-flex justify-content-evenly">
              <a href="//www.facebook.com" target="_blank" rel="noreferrer">
                <i className="fs-5 text-primary">{facebookIcon}</i>
              </a>

              <a href="www.youtube.com" target="_blank" rel="noreferrer">
                <i className="fs-5 text-danger">{youtubeIcon}</i>
              </a>

              <a href="//www.instagram.com" target="_blank" rel="noreferrer">
                <i className="fs-5 text-danger">{instagramIcon}</i>
              </a>

              <WhatsappChat element="i" style={{cursor:"pointer"}} number="03403062387">
                <i className="fs-5 text-success">{whatsappIcon}</i>
              </WhatsappChat>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Footer;

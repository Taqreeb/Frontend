import React, { useState } from "react";
import pic from "../img/contact-us.png";
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
const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [messageError, setMessageError] = useState("");

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
    setPhoneError("");
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    setNameError("");
  };
  const handleMessageChange = (e) => {
    setMessage(e.target.value);
    setMessageError("");
  };
  const handlePhoneInvalid = (e) => {
    e.preventDefault();
    if (phone) {
      setPhoneError(
        "Please enter a valid phone number in the format 03XXXXXXXXX or +923XXXXXXXXX"
      );
    } else {
      setPhoneError("phone number is required");
    }
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError("");
  };

  const handleEmailInvalid = (e) => {
    e.preventDefault();
    if (email) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("Email address is required");
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && email && phone && message) {
      console.log("Form submitted:", { name, email, phone, message });
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
      setNameError("");
      setEmailError("");
      setPhoneError("");
      setMessageError("");
    }
  };

  return (
    <div>
      <div className="card text-bg-dark rounded-0">
        <img
          src={pic}
          className="card-img"
          style={{ height: "40vh"  }}
          alt="..."
        />
        <div className="card-img-overlay">
          <h1 className="card-title ms-5 mt-5">Contact Us</h1>
        </div>
      </div>
      <h1 className="my-5 text-center">Let’s Start a Conversation</h1>
      <div
        className="d-flex justify-content-around row"
        style={{ marginRight: "3rem", marginLeft: "3rem" }}
      >
        <div className="col-3">
          <h2 className="my-4">Point of Contact</h2>
          <div className="container text-center">
            <p className="d-flex">
              <i className="fs-6">{mapMarkerIcon}</i> Institute Of Business
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
            <div className="d-flex justify-content-between">
              <a href="//www.facebook.com" target="_blank" rel="noreferrer">
                <i className="fs-2 text-primary">{facebookIcon}</i>
              </a>

              <a href="//www.youtube.com" target="_blank" rel="noreferrer">
                <i className="fs-2 text-danger">{youtubeIcon}</i>
              </a>

              <a href="//www.instagram.com" target="_blank" rel="noreferrer">
                <i className="fs-2 text-danger">{instagramIcon}</i>
              </a>

              <WhatsappChat
                element="i"
                style={{ cursor: "pointer" }}
                number="03422341235"
              >
                <i className="fs-2 text-success">{whatsappIcon}</i>
              </WhatsappChat>
            </div>
          </div>
        </div>
        <div className="col-5">
          <h2 className="my-4">How can we help you?</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Enter your full name"
                value={name}
                onInvalid={(e) => {
                  e.preventDefault();
                  setNameError("Name is required");
                }}
                onChange={handleNameChange}
                required
              />
              {nameError && <p className="text-danger">{nameError}</p>}
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter your email"
                onInvalid={handleEmailInvalid}
                value={email}
                onChange={handleEmailChange}
                required
              />
              {emailError && <p className="text-danger">{emailError}</p>}
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">
                Phone
              </label>
              <input
                type="tel"
                className="form-control"
                id="phone"
                placeholder="Enter your phone no"
                value={phone}
                pattern="^(03|\+923)[0-9]{2}[0-9]{7}$"
                onInvalid={handlePhoneInvalid}
                onChange={handlePhoneChange}
                required
              />
              {phoneError && <p className="text-danger">{phoneError}</p>}
            </div>
            <div className="mb-3">
              <label htmlFor="message" className="form-label">
                Message
              </label>
              <textarea
                className="form-control"
                style={{resize:"none"}}
                id="message"
                placeholder="Enter your Message"
                rows="3"
                value={message}
                onInvalid={(e) => {
                  e.preventDefault();
                  setMessageError("Message is required");
                }}
                onChange={handleMessageChange}
                required
              ></textarea>
              {messageError && <p className="text-danger">{messageError}</p>}
            </div>

            <button type="submit" className="btn btn-dark mb-5 w-100">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;

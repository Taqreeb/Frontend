import React, { useRef, useState } from "react";
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
import emailjs from "@emailjs/browser";
const whatsappIcon = <FaWhatsapp />;
const youtubeIcon = <FaYoutube />;
const instagramIcon = <FaInstagram />;
const facebookIcon = <FaFacebook />;
const emailIcon = <FaRegEnvelope />;
const phoneIcon = <FaPhoneAlt />;
const mapMarkerIcon = <FaMapMarkerAlt />;
const Contact = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [message, setMessage] = useState("");
  const [nameError, setNameError] = useState("");

  const [emailError, setEmailError] = useState("");
  const [messageError, setMessageError] = useState("");
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    if (name && email && message) {
      emailjs.sendForm(process.env.REACT_APP_SERVICE_ID, process.env.REACT_APP_TEMPLATE_ID, form.current, process.env.REACT_APP_PUBLIC_KEY).then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    }
    props.showAlert("Message successfully sent", "success")
    setName("");
    setEmail("");

    setMessage("");
    setNameError("");
    setEmailError("");

    setMessageError("");
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    setNameError("");
  };
  const handleMessageChange = (e) => {
    setMessage(e.target.value);
    setMessageError("");
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

  return (
    <div>
      <div className="card text-bg-dark rounded-0">
        <img
          src={pic}
          className="card-img"
          style={{ height: "40vh" }}
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
          <form ref={form} onSubmit={sendEmail}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                name="name"
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
                name="email"
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
              <label htmlFor="message" className="form-label">
                Message
              </label>
              <textarea
                className="form-control"
                style={{ resize: "none" }}
                id="message"
                placeholder="Enter your Message"
                name="message"
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

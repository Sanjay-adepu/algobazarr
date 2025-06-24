import React from "react";
import "./ContactUs.css";
import Navbar from "../../Navbar/Navbar.jsx";

const ContactUs = () => {
  return (
    <>
      <Navbar />

      <div className="contact-container">
        <h2 className="contact-heading" style={{ fontFamily: "'Tinos', serif", fontWeight: 700 }}>
          Contact Us
        </h2>

        <div className="contact-item">
          <strong>Telegram:</strong>{" "}
          <a href="https://t.me/AlgoDukaanAdmin" target="_blank" rel="noreferrer">
            @AlgoDukaanAdmin
          </a>
        </div>

        <div className="contact-item">
          <strong>Email:</strong>{" "}
          <a href="mailto:algodukaan@gmail.com">algodukaan@gmail.com</a>
        </div>

        <div className="contact-item">
          <strong>Phone:</strong>{" "}
          <a href="tel:+918142216171">+91 81422 16171</a>
        </div>

        <div className="contact-item">
          <strong>WhatsApp:</strong>{" "}
          <a
            href="https://wa.me/message/BDTCA7QUSKFLO1"
            target="_blank"
            rel="noreferrer"
          >
            https://wa.me/message/BDTCA7QUSKFLO1
          </a>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
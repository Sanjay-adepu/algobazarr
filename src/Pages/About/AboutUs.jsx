import React from "react";
import "./AboutUs.css";
import Navbar from "../../Navbar/Navbar.jsx";

const AboutUs = () => {
  return (
    <>
      <Navbar />

      <section className="about-section">
        <div className="about-card">
          <h2
            className="about-title"
            style={{ fontFamily: "'Tinos', serif", fontWeight: 700 }}
          >
            About Us
          </h2>

          <p>
            AlgoDukaan was born out of a passion to bridge the gap between trading ideas and automated execution. Since July 2021, we’ve been dedicated to transforming trader concepts into fully automated strategies using the Tradetron platform.
          </p>
          <p>
            We understand that building algo trading strategies can be complex and time-consuming. That’s why our focus is on delivering fast, reliable, and customized solutions that help traders automate their strategies effortlessly. By combining our technical skills with deep market understanding, we enable traders to take control of their trades with confidence.
          </p>
          <p>
            At AlgoDukaan, our commitment is to support traders at every step—from concept to live deployment—ensuring a seamless and efficient algo trading experience.
          </p>

          <div className="review-images">
            {/* Replace with real images later */}
            <img src="https://res.cloudinary.com/dppiuypop/image/upload/v1751211135/uploads/n5dbczirt2dr1drbigsn.png" alt="Customer Review 1" />
            <img src="https://res.cloudinary.com/dppiuypop/image/upload/v1751211208/uploads/zie4m6wcizovar3euntb.png" alt="Customer Review 2" />
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutUs;
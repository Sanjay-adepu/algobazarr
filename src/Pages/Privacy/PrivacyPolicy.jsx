import React from "react";
import "./PrivacyPolicy.css";
import Navbar from "../../Navbar/Navbar.jsx";

const PrivacyPolicy = () => {
  return (
    <>
      <Navbar />

      <div className="privacy-container">
        <h2 className="privacy-title" style={{ fontFamily: "'Tinos', serif", fontWeight: 700 }}>
          Privacy Policy
        </h2>

        <section className="privacy-section">
          <p>
            At AlgoBazarr, protecting your privacy is important to us. This policy explains what information we collect, how we use it, and your rights when using our website and services.
          </p>
        </section>

        <section className="privacy-section">
          <h3>What Information We Collect</h3>
          <ul>
            <li><strong>Personal Details:</strong> Name, email, phone number, and other contact info you provide.</li>
            <li><strong>Usage Data:</strong> IP address, browser type, and usage patterns to improve user experience.</li>
            <li><strong>Cookies:</strong> Small files that store preferences and enhance site functionality.</li>
          </ul>
        </section>

        <section className="privacy-section">
          <h3>How We Use Your Information</h3>
          <ul>
            <li>To provide and maintain our services smoothly.</li>
            <li>To communicate with you about your account, updates, or offers.</li>
            <li>To improve our website and customer support.</li>
          </ul>
        </section>

        <section className="privacy-section">
          <h3>Data Protection</h3>
          <p>We take reasonable steps to protect your data. However, no system is completely secure, and we cannot guarantee absolute safety.</p>
        </section>

        <section className="privacy-section">
          <h3>Children’s Privacy</h3>
          <p>Our services are not intended for children under 13. If we find that we’ve collected data from a child, we will delete it immediately.</p>
        </section>

        <section className="privacy-section">
          <h3>External Websites</h3>
          <p>Our site may contain links to other websites. We are not responsible for their privacy practices or content.</p>
        </section>

        <section className="privacy-section">
          <h3>Changes to This Policy</h3>
          <p>We may update this policy from time to time. Significant changes will be posted on our website.</p>
        </section>

        <section className="privacy-section">
          <h3>Contact Information</h3>
          <p>For questions or concerns about your privacy, please reach out to us at: <a href="mailto:algobazarr@gmail.com">algobazarr@gmail.com</a></p>
        </section>
      </div>
    </>
  );
};

export default PrivacyPolicy;
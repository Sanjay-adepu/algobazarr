import React from "react";
import "./TermsAndConditions.css";
import Navbar from "../../Navbar/Navbar.jsx";

const TermsAndConditions = () => {
  return (
    <>
      <Navbar />
      <div className="terms-container">
        <h2 className="terms-title" style={{ fontFamily: "'Tinos', serif", fontWeight: 700 }}>
          Terms & Conditions – AlgoDukaan
        </h2>

        <section className="terms-section">
          <p>
            Welcome to AlgoDukaan. By accessing or using this website, you agree to the terms outlined below. If you do not agree with these terms, you should not continue to use the site or its services.
          </p>
        </section>

        <section className="terms-section">
          <h3>1. Use of the Website</h3>
          <ul>
            <li>Use the site and its services for lawful purposes only.</li>
            <li>Refrain from distributing, copying, or modifying any content without prior written permission.</li>
            <li>Not exploit or misuse the features or tools provided for unintended or unauthorized use.</li>
          </ul>
        </section>

        <section className="terms-section">
          <h3>2. Intellectual Property Rights</h3>
          <p>All content, strategy templates, visual elements, and branding on this website are the exclusive property of AlgoDukaan or its contributors.</p>
          <ul>
            <li>You are not allowed to republish or resell any materials.</li>
            <li>Sharing private strategy links without permission is prohibited.</li>
            <li>Do not frame our content or use our brand elements without prior consent.</li>
          </ul>
        </section>

        <section className="terms-section">
          <h3>3. Cookies and Data Usage</h3>
          <p>
            AlgoDukaan uses cookies to improve your browsing experience and provide analytics. By continuing to use our services, you consent to our use of cookies. You may disable cookies in your browser, but this could affect site functionality.
          </p>
        </section>

        <section className="terms-section">
          <h3>4. Strategy Delivery Timelines</h3>
          <ul>
            <li>Pre-Built Strategies – within 24 hours.</li>
            <li>Custom (Simple) Strategies – within 2 business days.</li>
            <li>Custom (Complex) Strategies – within 5 business days after full requirement review.</li>
            <li>Delays may occur due to missing inputs or complex requirements.</li>
          </ul>
        </section>

        <section className="terms-section">
          <h3>5. Payment & Refund Policy</h3>
          <ul>
            <li>All purchases are final and non-refundable once delivery has begun or been completed.</li>
            <li>We do not accept cancellations after the order is confirmed.</li>
            <li>If a custom strategy cannot be developed after requirement review, a full refund will be processed.</li>
            <li>Issues related to code logic will be corrected as part of after-sale support.</li>
          </ul>
        </section>

        <section className="terms-section">
          <h3>6. Custom Strategy Terms</h3>
          <ul>
            <li>A test link will be shared for monitoring before final delivery.</li>
            <li>Strategy will be deployed to your Tradetron account using private links.</li>
            <li>Charges will be shared only after reviewing full requirements.</li>
            <li>Minor discrepancies between charting platforms (like TradingView, Tradetron) are not under our control due to data source differences.</li>
          </ul>
        </section>

        <section className="terms-section">
          <h3>7. Live Trading Notice</h3>
          <p>
            All strategies are provided strictly for <strong>paper trading, testing, or educational use.</strong> If you wish to run any strategy live, you must first contact the admin for review and approval.
          </p>
          <p>AlgoDukaan is not liable for any financial loss incurred by using these strategies in a live trading environment.</p>
        </section>

        <section className="terms-section">
          <h3>8. Disclaimer of Liability</h3>
          <ul>
            <li>AlgoDukaan is a technical service provider, not an advisory firm or SEBI-registered entity.</li>
            <li>We do not provide investment advice, tips, or calls.</li>
            <li>Users are solely responsible for any trading activity conducted using strategies purchased or created via this platform.</li>
            <li>Please consult your financial advisor before using any strategy with real capital.</li>
          </ul>
          <h4>Strategy Results Disclaimer</h4>
          <p>
            All strategy performance or result data shown on this website are derived exclusively from Tradetron's live offline reports. These are for demonstration and transparency purposes only and are not to be considered as investment advice or guaranteed outcomes.
          </p>
          <ul>
            <li>Live Offline mode in Tradetron simulates real trades but does not involve real capital.</li>
            <li>Performance may vary significantly when strategies are taken live due to slippage, execution delays, market volatility, or broker/API issues.</li>
            <li>We strongly advise paper trading and contacting the admin before deploying any strategy live.</li>
          </ul>
        </section>

        <section className="terms-section">
          <h3>9. Account Creation & Communication</h3>
          <ul>
            <li>You must provide a valid mobile number and email to receive your strategy.</li>
            <li>Communications about your order will be made via WhatsApp, SMS, email, or phone.</li>
            <li>By signing up, you authorize us to contact you regarding your purchase or support requests.</li>
          </ul>
        </section>

        <section className="terms-section">
          <h3>10. Preferred Payment Method</h3>
          <p>We accept multiple forms of payment; however, UPI is preferred for fast and secure transactions.</p>
        </section>

        <section className="terms-section">
          <h3>11. Contact Us</h3>
          <p>
            For support, inquiries, or to verify before live deployment, contact us at:<br />
            📧 <a href="mailto:algodukaan@gmail.com">algodukaan@gmail.com</a>
          </p>
        </section>
      </div>
    </>
  );
};

export default TermsAndConditions;
import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="site-footer-container">
        <div className="site-footer-column">
          <h4>Collections</h4>
          <ul>
            <Link className="footer-link" to="/"><li><a href="#">Customization</a></li></Link>
          </ul>
        </div>

        <div className="site-footer-column">
          <h4>Links</h4>
          <ul>
            <Link className="footer-link" to="/about"><li><a href="#">About Us</a></li></Link>
            <Link className="footer-link" to="/contact"><li><a href="#">Contact Us</a></li></Link>
            <Link className="footer-link" to="/faq"><li><a href="#">FAQ</a></li></Link>
            <Link className="footer-link" to="/terms"><li><a href="#">Terms & Conditions</a></li></Link>
          </ul>
        </div>
      </div>

      <div className="site-footer-credit">
        <p className="site-footer-note">&copy; {new Date().getFullYear()} AlgoDukaan. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
import React from "react";
import "./Footer.css";
import {Link} from "react-router-dom";
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-wrapper">
        <div className="footer-section">
          <h4>Collections</h4>
          <ul>
         <Link id="h" to="/"><li><a href="#">Customization</a></li></Link>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Links</h4>
          <ul>
        <Link id="h" to="/about"><li><a href="#">About Us</a></li></Link>
         <Link id="h" to="/contact"><li><a href="#">Contact Us</a></li></Link>
         <Link id="h" to="/faq"><li><a href="#">FAQ</a></li></Link>
         <Link id="h" to="/terms"><li><a href="#">Terms & Conditions</a></li></Link>
          </ul>
        </div>
      </div>

      <div className="footer-credit">
        <p id="f">&copy; {new Date().getFullYear()} AlgoBazarr. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
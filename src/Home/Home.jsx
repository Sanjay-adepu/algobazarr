import React from 'react';
import './Home.css';
import Navbar from "../Navbar/Navbar.jsx";
import Footer from "../Footer/Footer.jsx";

const ProductCards = () => {
  return (
    <>
      <Navbar />
      <h2 className="customization-title">Customization</h2>

      <div className="products-grid">
        <a className="product-card" href="https://forms.gle/izKtv55kMwYS7mei6" target="_blank" rel="noopener noreferrer">
          <div className="product-image-wrapper">
            <img
              src="https://res.cloudinary.com/dppiuypop/image/upload/v1748232368/uploads/pgghdd1o984m3fph3jkh.jpg"
              alt="Collaborate"
            />
          </div>
          <div className="product-title">
            Collaborate Your Strategy with AlgoBazarr
          </div>
          <div className="product-price"></div>
          <div className="product-button">Click here</div>
        </a>

        <a className="product-card" href="https://forms.gle/ttLjs1D612XzLa6LA" target="_blank" rel="noopener noreferrer">
          <div className="product-image-wrapper">
            <img
              src="https://res.cloudinary.com/dppiuypop/image/upload/v1748254107/uploads/onpjlu15vkpsuzgjmz2n.jpg"
              alt="AlgoBazarr Service"
            />
          </div>
          <div className="product-title">
            AlgoBazarr Strategy Creation Service
          </div>
          <div className="product-price"></div>
          <div className="product-button">Click here</div>
        </a>
      </div>

      <Footer />
    </>
  );
};

export default ProductCards;
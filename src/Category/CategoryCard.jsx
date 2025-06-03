import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer.jsx";
import './CategoryCard.css';
import Navbar from "../Navbar/Navbar.jsx";
const ProductCard = () => {
  const navigate = useNavigate();
  const [showMarketplace, setShowMarketplace] = useState(true);

  return (
    <>
      <Navbar/>

    <div className="pc-container">
      <main className="pc-content">
        <h2 className="pc-section-title">MarketPlace</h2>

        {showMarketplace ? (
          <div
            className="marketplace-intro"
            onClick={() => navigate('/product')}
            style={{ cursor: 'pointer' }}
          >
            <img
              src="./file_00000000c87c622f93508706d0fc38fe.png"
              alt="Marketplace Intro"
              className="marketplace-img"
            />
            <p
              style={{
                textAlign: 'center',
                marginTop: '10px',
                fontWeight: 'bold',
              }}
            >
              Click to enter the Marketplace
            </p>
          </div>
        ) : null}
      </main>
    </div>
    <Footer/>
        </>
  );
};

export default ProductCard;
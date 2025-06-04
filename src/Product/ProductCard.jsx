import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaCartPlus, FaBolt, FaArrowLeft } from 'react-icons/fa';

import Navbar from '../Navbar/Navbar.jsx';
import Footer from "../Footer/Footer.jsx";
import BottomNav from "../BottomNav.jsx";
import './ProductCard.css';

const ProductCard = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartQuantity, setCartQuantity] = useState(1);
  const [showQuantitySelector, setShowQuantitySelector] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [modalImageUrl, setModalImageUrl] = useState("");
  const [activeSort, setActiveSort] = useState("Newest");
  const [loading, setLoading] = useState(true);

  const sortOptions = [
    "Newest",
    "Most Popular",
    "Buying Strategies",
    "Selling Strategies",
    "Duplicate Strategies"
  ];

  // Fetch products
  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        const res = await fetch("https://algotronn-backend.vercel.app/products");
        const data = await res.json();
        if (data.success && Array.isArray(data.products)) {
          setProducts(data.products);
        } else {
          alert("Failed to load products");
        }
      } catch (err) {
        console.error(err);
        alert("Error fetching products");
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  // Match product by numeric `id`
  useEffect(() => {
    if (!id || products.length === 0) return;
    const product = products.find(p => p.id === Number(id));
    if (product) {
      setSelectedProduct(product);
    } else {
      navigate("/");
    }
  }, [id, products]);

  const handleAddToCart = async (redirectToCart = false) => {
    const googleId = localStorage.getItem('googleId');
    if (!googleId) {
      alert("Please login to add items to cart");
      return;
    }

    if (localStorage.getItem("addressCompleted") !== "true") {
      alert("Please complete your address before purchasing.");
      return navigate("/address");
    }

    if (!selectedProduct) return;

    const cartItem = {
      productId: selectedProduct.id,
      name: selectedProduct.name,
      price: selectedProduct.price,
      originalPrice: selectedProduct.originalPrice,
      discount: selectedProduct.discount,
      quantity: cartQuantity,
      imageUrl: selectedProduct.imageUrl || '',
      inStock: selectedProduct.stock,
      imageText: selectedProduct.imageText || "",
    };

    setIsLoading(true);
    try {
      const res = await fetch('https://algotronn-backend.vercel.app/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ googleId, cartItem }),
      });
      const data = await res.json();
      if (res.ok) {
        if (redirectToCart) navigate('/cart');
      } else {
        alert("Failed to add to cart: " + data.message);
      }
    } catch (err) {
      alert("Something went wrong while adding to cart");
    } finally {
      setIsLoading(false);
    }
  };

  const getSortedProducts = () => {
    switch (activeSort) {
      case "Buying Strategies":
        return products.filter(p => p.sorttype === "buying");
      case "Selling Strategies":
        return products.filter(p => p.sorttype === "selling");
      case "Duplicate Strategies":
        return products.filter(p => p.isPriced);
      default:
        return [...products].sort(() => Math.random() - 0.5); // Shuffle
    }
  };

  const filteredProducts = getSortedProducts();

  return (
    <>
      <Navbar />

      {isImageModalOpen && (
        <div className="pc-image-modal" onClick={() => setIsImageModalOpen(false)}>
          <img src={modalImageUrl} alt="Full View" className="pc-modal-image" />
        </div>
      )}

      <div className="pc-container">
        <main className="pc-content">
          <h2 className="pc-section-title">MarketPlace</h2>

          <div className="pc-sort-container">
            {sortOptions.map(option => (
              <button
                key={option}
                className={`pc-sort-button ${activeSort === option ? "active" : ""}`}
                onClick={() => setActiveSort(option)}
              >
                {option}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="loading-container">
              <div className="loader"></div>
              <p>Loading, please wait...</p>
            </div>
          ) : selectedProduct ? (
            <div className="pc-detail">
              <button onClick={() => navigate("/")} className="pc-back-button">
                <FaArrowLeft style={{ marginRight: '8px' }} />
                Back to Products
              </button>

              <div className={`pc-image ${selectedProduct.imageUrl ? 'no-padding' : ''}`}>
                {selectedProduct.imageUrl ? (
                  <img
                    src={selectedProduct.imageUrl}
                    alt={selectedProduct.name}
                    className="pc-img"
                    onClick={() => {
                      setModalImageUrl(selectedProduct.imageUrl);
                      setIsImageModalOpen(true);
                    }}
                    style={{ cursor: "pointer" }}
                  />
                ) : (
                  <p>{selectedProduct.imageText}</p>
                )}
              </div>

              <h3 className="pc-title">{selectedProduct.name}</h3>

              {selectedProduct.isPriced ? (
                <>
                  <div className="pc-price-container">
                    <span className="pc-price-current">₹{selectedProduct.price}</span>
                    {selectedProduct.originalPrice && selectedProduct.originalPrice > selectedProduct.price && (
                      <>
                        <span className="pc-price-original">₹{selectedProduct.originalPrice}</span>
                        <span className="pc-discount">({selectedProduct.discount}% off)</span>
                      </>
                    )}
                  </div>

                  {selectedProduct.publicType && <p><strong>Type:</strong> {selectedProduct.publicType}</p>}
                  {selectedProduct.dailyPL && <p><strong>Daily P&L:</strong> {selectedProduct.dailyPL}</p>}
                  {selectedProduct.summary && <p><strong>Summary:</strong> {selectedProduct.summary}</p>}

                  <div className="pc-buttons">
                    {!showQuantitySelector ? (
                      <button className="pc-buy" onClick={async () => await handleAddToCart(true)} disabled={isLoading}>
                        {isLoading ? "Processing..." : <><FaBolt className="pc-icon" /> Buy Now</>}
                      </button>
                    ) : (
                      <>
                        <div className="pc-quantity">
                          <button onClick={() => setCartQuantity(prev => Math.max(prev - 1, 1))}>-</button>
                          <span>{cartQuantity}</span>
                          <button onClick={() => setCartQuantity(prev => prev + 1)}>+</button>
                        </div>
                        <button className="pc-buy" onClick={() => handleAddToCart()} disabled={isLoading}>
                          {isLoading ? "Processing..." : <><FaCartPlus className="pc-icon" /> Update Cart</>}
                        </button>
                      </>
                    )}
                  </div>
                </>
              ) : (
                <>
                  {selectedProduct.publicType && <p><strong>Type:</strong> {selectedProduct.publicType}</p>}
                  {selectedProduct.summary && <p><strong>Summary:</strong> {selectedProduct.summary}</p>}
                  {selectedProduct.dailyPL && <p><strong>Daily P&L:</strong> {selectedProduct.dailyPL}</p>}

                  <div className="pc-steps">
                    <h4>🟢 Step 1: Login or Sign Up on Tradetron</h4>
                    <p>
                      👉 <a href="https://www.tradetron.tech?ref=ngy1oda" target="_blank" rel="noopener noreferrer">
                        Click here to login or create an account
                      </a><br />
                      <em>New user? Sign up using this link to get <strong>exclusive offers</strong>!</em>
                    </p>

                    <h4>🟢 Step 2: Subscribe to the Strategy</h4>
                    <ol>
                      <li>Come back to AlgoBazzar.</li>
                      <li>Click the <strong>“Click Here to Subscribe”</strong> button below.</li>
                      <li>You’ll be redirected to Tradetron — just click <strong>“Subscribe”</strong> to confirm.</li>
                    </ol>

                    <button
                      className="pc-buy"
                      onClick={() => {
                        if (localStorage.getItem("addressCompleted") !== "true") {
                          alert("Please complete your address before subscribing.");
                          navigate("/address");
                        } else {
                          window.open(selectedProduct.tradetronLink || "https://www.tradetron.tech", "_blank");
                        }
                      }}
                    >
                      Click Here to Subscribe
                    </button>
                  </div>
                </>
              )}

              <pre className="pc-description">{selectedProduct.description}</pre>
            </div>
          ) : (
            <div className="pc-grid">
              {filteredProducts.map(product => (
                <div
                  key={product.id}
                  className="pc-card"
                  onClick={() => {
                    setSelectedProduct(product);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    navigate(`/product/${product.id}`);
                  }}
                >
                  <div className={`pc-image ${product.imageUrl ? 'no-padding' : ''}`}>
                    {product.imageUrl ? (
                      <img src={product.imageUrl} alt={product.name} className="pc-img" />
                    ) : (
                      <p>{product.imageText}</p>
                    )}
                  </div>
                  <h3 className="pc-title">{product.name}</h3>
                  {product.isPriced && (
                    <div className="pc-price-container">
                      <span className="pc-price-current">₹{product.price}</span>
                      {product.originalPrice && product.originalPrice > product.price && (
                        <>
                          <span className="pc-price-original">₹{product.originalPrice}</span>
                          <span className="pc-discount">({product.discount}% off)</span>
                        </>
                      )}
                    </div>
                  )}
                  {!product.stock && <span className="pc-out-of-stock">Out of stock</span>}
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      <Footer />
      <BottomNav />
    </>
  );
};

export default ProductCard;
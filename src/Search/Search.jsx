import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar.jsx";
import Footer from "../Footer/Footer.jsx";
import BottomNav from "../BottomNav.jsx";
import "./Search.css";

const SearchWithCategory = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  // Fetch products from backend on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://algotronn-backend.vercel.app/products");
        const data = await response.json();
        if (data.success && data.products) {
          setAllProducts(data.products);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
      setLoading(false);
    };

    fetchProducts();
  }, []);

  // Handle search input change
  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim() === "") {
      setResults([]);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const filtered = allProducts.filter((product) =>
        product.name.toLowerCase().includes(value.toLowerCase())
      );
      setResults(filtered);
      setLoading(false);
    }, 300);
  };

  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <>
      <Navbar />

      <div className="pro-search-container">
        <div className="search-header">
          <div className="search-input-wrapper">
            <input
              type="text"
              className="search-input"
              placeholder="Search for products..."
              value={query}
              onChange={handleSearch}
            />
          </div>
        </div>

        {loading ? (
          <p className="search-loading">Searching...</p>
        ) : (
          <div className="search-results">
            {results.length > 0 ? (
              results.map((product) => (
                <div
                  key={product._id}
                  className="search-result-item"
                  onClick={() => handleProductClick(product.id)}
                  style={{ cursor: "pointer" }}
                >
                  {product.name}
                </div>
              ))
            ) : (
              query && <p className="no-results">No products found.</p>
            )}
          </div>
        )}
      </div>
<div class="x">
    <Footer/>
    </div>
    </>
  );
};

export default SearchWithCategory;
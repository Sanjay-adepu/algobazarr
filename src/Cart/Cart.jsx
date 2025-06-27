import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';
import { FaArrowLeft } from 'react-icons/fa';
import { FiShoppingCart, FiCheckCircle } from 'react-icons/fi';
import Footer from '../Footer/Footer.jsx';
import './Cart.css';

const adminWhatsAppNumber = '918142216171';

const formatOrderTime = () => {
  const options = {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: 'Asia/Kolkata',
  };
  return new Date().toLocaleString('en-IN', options);
};

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [discountInfo, setDiscountInfo] = useState(null);
  const [viewState, setViewState] = useState('cart');

  const getGoogleId = () => localStorage.getItem('googleId');

  const handleRemoveItem = async (productId) => {
    const googleId = getGoogleId();
    if (!googleId) return;

    try {
      const res = await axios.post('https://algotronn-backend.vercel.app/remove-cart-item', {
        googleId,
        productId,
      });

      if (res.data.success) {
        setCartItems(res.data.cart);
        setDiscountInfo(null);
      }
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  useEffect(() => {
    const fetchCart = async () => {
      const googleId = getGoogleId();
      if (!googleId) return;

      try {
        const res = await axios.post('https://algotronn-backend.vercel.app/get-cart', { googleId });
        if (res.data.success) {
          setCartItems(res.data.cart);
        }
      } catch (error) {
        console.error('Error fetching cart:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, []);

  const calculateTotal = () =>
    cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleContinue = async () => {
  const googleId = getGoogleId();
  if (!googleId) {
    alert('User not logged in');
    return;
  }

  setProcessing(true); // Start loading

  try {
    const orderRes = await axios.post('https://algotronn-backend.vercel.app/place-order', {
      googleId,
    });

    if (orderRes.data.success && orderRes.data.order) {
      const order = orderRes.data.order;
      const { orderId, items, totalAmount, address, mobile, email } = order;

      let message = `🛒 *New Order Received*\n\n`;
      message += `🆔 *Order ID:* ${orderId}\n`;
      message += `👤 *Customer Name:* ${order.name}\n`;
      message += `📱 *Mobile:* ${mobile}\n`;
      message += `📧 *Email:* ${email}\n\n`;
      message += `📦 *Order Items:*\n`;

      items.forEach((item, idx) => {
        message += `${idx + 1}. ${item.name}\n`;
        message += `   Price: ₹${item.price}\n`;
      });

      message += `💰 *Total Amount:* ₹${totalAmount}\n\n`;

      if (address && address.address && address.city && address.state && address.pincode) {
        message += `📍 *Shipping Address:*\n`;
        message += `${address.address}, ${address.city}, ${address.state} - ${address.pincode}\n\n`;
      } else {
        message += `📍 *Shipping Address:* Not provided\n\n`;
      }

      message += `🕒 *Order Time:* ${formatOrderTime()}\n\n`;
      message += `Please process this order at your earliest convenience.`;

      const whatsappUrl = `https://wa.me/${adminWhatsAppNumber}?text=${encodeURIComponent(message)}`;

      window.location.href = whatsappUrl; // Redirect and keep spinner
    } else {
      alert('Failed to place order. Please try again.');
      setProcessing(false); // Only stop loading on failure
    }
  } catch (error) {
    console.error('Error placing order:', error);
    alert('Something went wrong. Please try again later.');
    setProcessing(false);
  }
};
  return (
    <>
      <Navbar />

      {loading ? (
<div className="loading-container">
  <div className="loader"></div>
  <p style={{ marginTop: "1rem", fontSize: "1rem", color: "#555" }}>Loading, please wait...</p>
</div>
      ) : processing ? (
<div className="loading-container">
  <div className="loader"></div>
  <p style={{ marginTop: "1rem", fontSize: "1rem", color: "#555" }}>Loading, please wait...</p>
</div>
      ) : cartItems.length === 0 && viewState === 'cart' ? (
        <div className="empty-cart">
          <FiShoppingCart className="empty-cart-icon" />
          <div className="empty-cart-text" style={{ fontFamily: "'Tinos', serif", fontWeight: 700 }}>
            Your cart is empty
          </div>
        </div>
      ) : viewState === 'confirmation' ? (
        <div className="confirmation-animation">
          <div className="animation-wrapper">
            <FiCheckCircle className="confirmation-icon" />
            <h2>Thank you for your order!</h2>
            <p>Your order has been successfully placed.</p>
            <div className="confirmation-buttons">
              <button className="track-order-btn" onClick={() => (window.location.href = '/order')}>
                Track Order
              </button>
              <button className="continue-shopping-btn" onClick={() => (window.location.href = '/')}>
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="cart-wrapper">
          <div className="cart-header">
            <span>
              {cartItems.length} ITEM{cartItems.length !== 1 ? 'S' : ''}
            </span>
            <span>
              Total ₹{discountInfo ? discountInfo.finalTotal.toFixed(2) : calculateTotal().toFixed(2)}
            </span>
          </div>

          {cartItems.map((item, index) => (
            <div key={index} className="cart-item">
              <img src={item.imageUrl} alt={item.productName} className="cart-img" />
              <div className="cart-details">
                <h4>{item.name}</h4>
                <p>
                  <span className="cart-price">₹{item.price}</span>{' '}
                  <span className="cart-original">₹{item.originalPrice}</span>{' '}
                  <span className="cart-discount">({item.discount}% off)</span>
                </p>
                <p className="cart-saved">You saved ₹{item.originalPrice - item.price}</p>
                <div className="cart-controls">
                  <select value={item.quantity} disabled>
                    {[...Array(10)].map((_, qty) => (
                      <option key={qty + 1} value={qty + 1}>
                        Qty: {qty + 1}
                      </option>
                    ))}
                  </select>
                  <button className="remove-btn" onClick={() => handleRemoveItem(item.productId)}>
                    REMOVE
                  </button>
                </div>
              </div>
            </div>
          ))}

          <div className="cart-summary">
            <div className="summary-row">
              <span>Grand total</span>
              <span>₹{discountInfo ? discountInfo.finalTotal.toFixed(2) : calculateTotal().toFixed(2)}</span>
            </div>

            <p
              style={{
                fontSize: '13px',
                color: '#444',
                lineHeight: '1.6',
                fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                marginBottom: '16px',
                textAlign: 'center',
              }}
            >
              Please click <strong style={{ color: 'red' }}>Continue</strong> to confirm your order.
              You will be redirected to WhatsApp to send a message to our administrator.
            </p>

            <button className="continue-btn" onClick={handleContinue}>
              Continue
            </button>
          </div>
        </div>
      )}
<Footer/>
    </>
  );
};

export default Cart;
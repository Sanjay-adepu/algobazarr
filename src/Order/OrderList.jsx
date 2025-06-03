import React, { useEffect, useState } from "react";
import "./OrderList.css";
import Navbar from "../Navbar/Navbar.jsx";

const adminWhatsAppNumber = '918142216171'; // Ensure no spaces in number

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

const sendCancellationToWhatsApp = (order) => {
  const { orderId, items, totalAmount, address } = order;

  let message = `❌ *Order Cancelled*\n\n`;
  message += `🆔 *Order ID:* ${orderId}\n`;
  message += `👤 *Customer Name:* ${address.name}\n`;
  message += `📱 *Mobile:* ${address.mobile}\n`;
  message += `📧 *Email:* ${address.email}\n\n`;
  message += `📦 *Items:*\n`;

  items.forEach((item, idx) => {
    message += `${idx + 1}. ${item.name}\n   Price: ₹${item.price} x ${item.quantity}\n`;
  });

  message += `💰 *Total:* ₹${totalAmount}\n\n`;
  message += `📍 *Address:*\n${address.address}, ${address.city}, ${address.state} - ${address.pincode}\n\n`;
  message += `🕒 *Cancelled At:* ${formatOrderTime()}`;

  const whatsappUrl = `https://wa.me/${adminWhatsAppNumber}?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, '_blank');
};

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const googleId = localStorage.getItem("googleId") || "104885723007176286801";
        const response = await fetch("https://algotronn-backend.vercel.app/get-orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ googleId }),
        });
        const data = await response.json();
        if (data.success) {
          const sortedOrders = data.orders.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          setOrders(sortedOrders);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleCancelOrder = async (orderId) => {
    const confirmCancel = window.confirm("Are you sure you want to cancel this order?");
    if (!confirmCancel) return;

    try {
      const response = await fetch(`https://algotronn-backend.vercel.app/mark-cancelled/${orderId}`);
      const text = await response.text();

      if (response.ok) {
        alert(text);
        setOrders(prev =>
          prev.map(order =>
            order.orderId === orderId ? { ...order, status: 'Cancelled' } : order
          )
        );
        setSelectedOrder(prev =>
          prev && prev.orderId === orderId ? { ...prev, status: 'Cancelled' } : prev
        );

        const cancelledOrder = orders.find(order => order.orderId === orderId);
        if (cancelledOrder) {
          sendCancellationToWhatsApp(cancelledOrder);
        }

      } else {
        alert(`Failed to cancel order: ${text}`);
      }
    } catch (err) {
      console.error("Error cancelling order:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <Navbar />

      <div className="order-container">
        {!selectedOrder ? (
          <>
            <h2 style={{ fontFamily: "'Tinos', serif", fontWeight: 700 }}>My Orders</h2>

            {loading ? (
              <div className="loading-container">
                <div className="loader"></div>
                <p style={{ marginTop: "1rem", fontSize: "1rem", color: "#555" }}>
                  Loading, please wait...
                </p>
              </div>
            ) : orders.length === 0 ? (
              <p>No orders found.</p>
            ) : (
              orders.map((order, index) => (
                <div className="order-card" key={index} onClick={() => setSelectedOrder(order)}>
                  <div className="selected-order-card">
                    <div className="order-brand">
                      <img src="../../public/file_00000000a4bc62309fd4ab8b35a5021c.jpg" alt="AlgoTRONN" />
                    </div>
                    <div className="order-details-bar">
                      <p><span id="H">ORDER ID</span> : {order.orderId}</p>
                      <p>
                        {new Date(order.createdAt).toLocaleDateString()} •{" "}
                        {new Date(order.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </p>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <span className={`dot ${order.status.toLowerCase()}`}></span>
                        <span className={`status-text ${order.status.toLowerCase()}`}>{order.status}</span>
                      </div>
                    </div>
                  </div>
                  <div className="order-summary">
                    <p>{order.items.length} Item(s) | ₹{order.totalAmount}</p>
                  </div>
                </div>
              ))
            )}
          </>
        ) : (
          <>
            <button className="back-btn" onClick={() => setSelectedOrder(null)}>← Back</button>

            <div className="selected-order-card">
              <div className="order-brand">
                <img src="../../public/file_00000000010c6230ad42158a28f2acff.jpg" alt="AlgoTRONN" />
              </div>

              <div className="order-details-bar">
                <p><span id="H">ORDER ID</span> : {selectedOrder.orderId}</p>
                <p>
                  {new Date(selectedOrder.createdAt).toLocaleDateString()} •{" "}
                  {new Date(selectedOrder.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </p>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <span className={`dot ${selectedOrder.status.toLowerCase()}`}></span>
                  <span className={`status-text ${selectedOrder.status.toLowerCase()}`}>{selectedOrder.status}</span>
                </div>
              </div>

              <p>{selectedOrder.items.length} Item(s) | ₹{selectedOrder.totalAmount}</p>
            </div>

            <div className="order-status-box">
              <h4 className={`status ${selectedOrder.status.toLowerCase()}`}>Order {selectedOrder.status}</h4>

              {selectedOrder.status === 'Pending' && (
                <>
                  <p>Your order is successful. Seller will confirm shortly.</p>
                  <button className="cancel-btn" onClick={() => handleCancelOrder(selectedOrder.orderId)}>
                    Cancel order
                  </button>
                </>
              )}

              {selectedOrder.status === 'Cancelled' && (
                <p className="cancel-message">This order has been cancelled and will not be processed.</p>
              )}

              {selectedOrder.status === 'Completed' && (
                <p className="completed-message">Your order has been delivered successfully. Thank you!</p>
              )}
            </div>

            <h4>Items</h4>
            {selectedOrder.items.map((item, index) => (
              <div className="order-item" key={index}>
                <img src={item.imageUrl || "/images/image.webp"} alt={item.name} />
                <div>
                  <h5>{item.name}</h5>
                  <p>Qty: {item.quantity}</p>
                  <p>₹{item.price} <span className="original-price">₹{item.originalPrice}</span></p>
                </div>
              </div>
            ))}

            <div className="price-summary">
              <p><strong>Item MRP:</strong> ₹{selectedOrder.items.reduce((sum, item) => sum + (item.originalPrice * item.quantity), 0)}</p>
              <p><strong>Listing discount:</strong> -₹{selectedOrder.items.reduce((sum, item) => sum + ((item.originalPrice - item.price) * item.quantity), 0)}</p>
              <p><strong>Delivery:</strong> Free</p>
              <p className="grand-total"><strong>Grand total:</strong> ₹{selectedOrder.totalAmount}</p>
            </div>

            <div className="address-box">
              <h4>Delivery Address</h4>
              <p>{selectedOrder.address.name}</p>
              <p>{selectedOrder.address.address}, {selectedOrder.address.locality}</p>
              <p>{selectedOrder.address.city}, {selectedOrder.address.state} - {selectedOrder.address.pincode}</p>
              <p>Phone: {selectedOrder.address.mobile}</p>
              <p>Email: {selectedOrder.address.email}</p>
              {selectedOrder.address.landmark && <p>Landmark: {selectedOrder.address.landmark}</p>}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default OrderList;
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

const AddressList = () => {
  const [address, setAddress] = useState(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const googleId = localStorage.getItem('googleId');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const response = await fetch('https://algotronn-backend.vercel.app/get-address', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ googleId }),
        });
        const data = await response.json();

        if (response.ok && data.success) {
          setAddress(data.address);
          setForm(data.address);
        } else {
          setError(data.message || 'Failed to fetch address');
        }
      } catch (err) {
        console.error(err);
        setError('Server error. Try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (googleId) fetchAddress();
    else {
      setError('User not logged in');
      setLoading(false);
    }
  }, [googleId]);

  const handleEditChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    setMessage('');
    try {
      const response = await fetch('https://algotronn-backend.vercel.app/update-address', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ googleId, ...form }),
      });
      const data = await response.json();

      if (response.ok && data.success) {
        setAddress(data.address);
        setEditing(false);
        setMessage(data.message);
      } else {
        setError(data.message || 'Failed to update address');
      }
    } catch (err) {
      console.error(err);
      setError('Server error while updating');
    }
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <h2 className="title">My Address</h2>

{loading ? (
<div className="loading-container">

  <p style={{ marginTop: "1rem", fontSize: "1rem", color: "#555" }}>Loading, please wait...</p>
</div>
  
): error ? (
          <p className="error">{error}</p>
        ) : editing ? (
          <div className="form-group">
            <input name="name" value={form.name || ''} onChange={handleEditChange} placeholder="Name" />
            <input name="email" value={form.email || ''} onChange={handleEditChange} placeholder="Email" />
            <input name="mobile" value={form.mobile || ''} onChange={handleEditChange} placeholder="Please enter your active or working mobile number"
 />
            <input name="address" value={form.address || ''} onChange={handleEditChange} placeholder="Address" />
            <input name="locality" value={form.locality || ''} onChange={handleEditChange} placeholder="Locality" />
            <input name="landmark" value={form.landmark || ''} onChange={handleEditChange} placeholder="Landmark" />
            <input name="pincode" value={form.pincode || ''} onChange={handleEditChange} placeholder="Pincode" />
            <input name="city" value={form.city || ''} onChange={handleEditChange} placeholder="City" />
            <input name="state" value={form.state || ''} onChange={handleEditChange} placeholder="State" />
            <button className="btn save" onClick={handleUpdate}>Save</button>
            <button className="btn cancel" onClick={() => setEditing(false)}>Cancel</button>
          </div>
        ) : address ? (
          <div className="card">
            <p><strong>{address.name}</strong></p>
            <p>Email: {address.email}</p>
            <p>{address.mobile}</p>
            <p>{address.address}</p>
            <p>{address.locality}</p>
            <p>{address.landmark} . {address.pincode}</p>
            <p>{address.city}, {address.state}</p>
            <button className="btn edit" onClick={() => setEditing(true)}>Edit</button>
          </div>
        ) : (
          <div className="no-address">
            <p>No address found for your account.</p>
            <button className="btn add" onClick={() => navigate('/address')}>Add Address</button>
          </div>
        )}

        {message && <p className="success">{message}</p>}
      </div>
<style>{`
html, body, #root {
  height: 100%;
  margin: 0;
  font-family: 'Inter', 'Segoe UI', Tahoma, sans-serif;
  background-color: #f8fafc;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 80vh;
  padding: 32px 24px;
  max-width: 700px;
  margin: auto;
  color: #111827;

}

.title {
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 28px;
  text-align: center;
  color: #1f2937;
    margin-top:60px;
}

.card, .form-group {
  width: 100%;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
}

.card p {
  margin-bottom: 10px;
  font-size: 16px;
  line-height: 1.6;
}

.form-group {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.form-group input {
  padding: 14px 16px;
  font-size: 16px;
  border: 1px solid #d1d5db;
  border-radius: 10px;
  background-color: #f9fafb;
  transition: border 0.2s, background 0.2s;
  width: 100%;
  box-sizing: border-box;
}

.form-group input:focus {
  outline: none;
  border-color: #3b82f6;
  background-color: #fff;
}

.form-group input[placeholder] {
  color: #6b7280;
}

.btn {
  padding: 12px 20px;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 12px;
  text-align: center;
  border: none;
}

.btn:hover {
  transform: translateY(-1px);
  opacity: 0.95;
}

.btn.edit {
  background-color: #3b82f6;
  color: #fff;
}

.btn.save {
  background-color: #10b981;
  color: #fff;
}

.btn.cancel {
  background-color: #f3f4f6;
  color: #111827;
  border: 1px solid #d1d5db;
}

.btn.add {
  background-color: #0ea5e9;
  color: #fff;
}

.success {
  color: #16a34a;
  font-weight: 500;
  margin-top: 16px;
}

.error {
  color: #dc2626;
  font-weight: 500;
  margin-top: 16px;
}

.loader-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}

.loader {
  border: 6px solid #e5e7eb;
  border-top: 6px solid #3b82f6;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  animation: spin 1s linear infinite;
  margin-bottom: 16px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.no-address {
  text-align: center;
  margin-top: 24px;
  color: #4b5563;
}

@media (max-width: 768px) {
  .form-group {
    grid-template-columns: 1fr;
  }

  .btn {
    width: 100%;
  }
}
`}</style>

    </>
  );
};

export default AddressList;
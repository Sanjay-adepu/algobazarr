import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddressForm.css';

const AddressForm = () => {
  const navigate = useNavigate();
const [isAddressCompleted, setIsAddressCompleted] = useState(false);


  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    address: '',
    locality: '',
    landmark: '',
    pincode: '',
    city: '',
    state: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const googleId = localStorage.getItem('googleId');

    if (!googleId) {
      alert('Google ID not found. Please sign in again.');
      return;
    }

localStorage.setItem('addressCompleted', 'true');
  setIsAddressCompleted(true);

    setLoading(true);

    try {
      const response = await fetch('https://algotronn-backend.vercel.app/update-address', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          googleId,
        }),
      });

      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        navigate('/'); // Redirect to home/account
      } else {
        alert('Error adding address: ' + data.message);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setLoading(false);
      alert('There was an error submitting your form');
    }
  };

  return (
    <form className="address-form" onSubmit={handleSubmit}>
      <h2 className="form-title">Add New Address</h2>
      <div className="form-grid">
        <input name="name" placeholder="Name *" required onChange={handleChange} value={formData.name} />
        <input name="mobile" placeholder="Please enter your active or working mobile number" required onChange={handleChange} value={formData.mobile} />
        <input name="email" placeholder="Email Address *" value={formData.email} onChange={handleChange} />
        <input name="address" placeholder="Address *" required onChange={handleChange} value={formData.address} />
        <input name="locality" placeholder="Locality / Area (optional)" onChange={handleChange} value={formData.locality} />
        <input name="landmark" placeholder="Landmark (optional)" onChange={handleChange} value={formData.landmark} />
        <input name="pincode" placeholder="Pin Code *" required onChange={handleChange} value={formData.pincode} />
        <input name="city" placeholder="City *" required onChange={handleChange} value={formData.city} />
        <input name="state" placeholder="State *" required onChange={handleChange} value={formData.state} />
      </div>

      <button type="submit" className="form-submit-btn" disabled={loading}>
        {loading ? <span className="loader"></span> : 'Add Address'}
      </button>
    </form>
  );
};

export default AddressForm;
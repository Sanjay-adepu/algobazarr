import React, { useEffect, useState } from 'react';
import { FiShoppingBag, FiMapPin, FiLogOut } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Footer from "../Footer/Footer.jsx";
const AccountPage = ({ handleSignOut }) => {
  const [email, setEmail] = useState('');

  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  return (
    <>
      <style>{`
      body{
      

  overflow: hidden;
}
        .profile-container {
          max-width: 860px;
          margin: 60px auto;
          padding: 2.5rem;
          background-color: #ffffff;
          border-radius: 18px;
          box-shadow: 0 12px 36px rgba(0, 0, 0, 0.08);
          font-family: 'Helvetica Neue', 'Segoe UI', sans-serif;
        }

        .profile-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          border-bottom: 1px solid #eee;
          padding-bottom: 1.2rem;
          margin-bottom: 2.5rem;
        }

        .profile-title {
          font-size: 2rem;
          font-weight: 700;
          color: #1c1c1c;
        }

        .user-email {
          font-size: 1rem;
          color: #777;
          font-weight: 500;
        }

        .profile-options-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 1.8rem;
        }

        .account-option-card {
          background: #fafafa;
          border: 1px solid #e0e0e0;
          border-radius: 14px;
          padding: 1.6rem;
          text-align: center;
          cursor: pointer;
          transition: all 0.2s ease-in-out;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .account-option-card:hover {
          background-color: #f0f8ff;
          transform: translateY(-6px);
          box-shadow: 0 10px 22px rgba(0, 0, 0, 0.05);
        }

        .option-icon {
          font-size: 2.2rem;
          color: #004aad;
          margin-bottom: 0.7rem;
        }

        .option-label {
          font-size: 1.05rem;
          font-weight: 600;
          color: #2c2c2c;
        }

        .logout-option {
          background-color: #fff4f4;
          border-color: #ffd6d6;
        }

        .logout-option .option-icon {
          color: #d63031;
        }

        @media (max-width: 600px) {
          .profile-container {
            padding: 0.5rem 4rem;
            
            margin: 40px 1rem;
            padding-bottom:90px;
            border-radius:0px;
            margin-top:70px
box-shadow:none !important;

  padding-top:30x;
  

          }
          
                  .account-option-card {
          background: #fafafa;
          border: 1px solid #e0e0e0;
          border-radius: 14px;
          padding: 0.52rem;
          text-align: center;
          cursor: pointer;
          transition: all 0.2s ease-in-out;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

          .profile-title {
            font-size: 1.5rem;
          }

          .option-label {
            font-size: 0.65rem;
          }

          .option-icon {
            font-size: 0.86rem;
          }
          .o{
          display:flex;
          flex-direction:column;
        }
      `}</style>
      <div className="o">

      <div className="profile-container">
        <div className="profile-header">
          <h2 className="profile-title">My Account</h2>
          {email && <span className="user-email">{email}</span>}
        </div>

        <div className="profile-options-grid">
          <Link to="/order" style={{ textDecoration: 'none' }}>
            <div className="account-option-card">
              <FiShoppingBag className="option-icon" />
              <div className="option-label">My Orders</div>
            </div>
          </Link>

          <Link to="/my-address" style={{ textDecoration: 'none' }}>
            <div className="account-option-card">
              <FiMapPin className="option-icon" />
              <div className="option-label">My Addresses</div>
            </div>
          </Link>

          <div
            className="account-option-card logout-option"
            onClick={handleSignOut}
          >
            <FiLogOut className="option-icon" />
            <div className="option-label">Sign Out</div>
          </div>
        </div>
     
      </div>
      <div className="v">
         <Footer/>
         </div>
      </div>
    </>
  );
};

export default AccountPage;
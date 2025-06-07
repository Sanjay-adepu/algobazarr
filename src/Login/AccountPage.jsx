import React, { useEffect, useState } from 'react';
import { FiShoppingBag, FiMapPin, FiLogOut } from 'react-icons/fi';
import { Link } from 'react-router-dom';


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
  .accountWrapper {
    padding: 2rem 1rem;
    max-width: 600px;
    margin: 0 auto;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }

  .accountContainer {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .accountHeader {
    text-align: center;
  }

  .accountTitle {
    font-size: 1.8rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: #222;
  }

  .accountEmail {
    font-size: 1rem;
    color: #555;
  }

  .optionsGrid {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .optionCard {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    background-color: #f5f5f5;
    border-radius: 12px;
    transition: background-color 0.2s ease;
    cursor: pointer;
  }

  .optionCard:hover {
    background-color: #eaeaea;
  }

  .optionIcon {
    font-size: 1.5rem;
    color: #333;
  }

  .optionLabel {
    font-size: 0.8rem;
    color: #222;
    font-weight: 500;
  }

  .logoutCard {
    color: #d32f2f;
    background-color: #fdecea;
  }

  .logoutCard:hover {
    background-color: #fbd5d2;
  }

  @media (min-width: 600px) {
    .optionsGrid {
      flex-direction: row;
      justify-content: space-between;
    }

    .optionCard {
      flex: 1;
      justify-content: center;
    }
  }
`}</style>

      <div className="accountWrapper">
        <div className="accountContainer">
          <div className="accountHeader">
            <h2 className="accountTitle">My Account</h2>
            {email && <span className="accountEmail">{email}</span>}
          </div>

          <div className="optionsGrid">
            <Link to="/order" style={{ textDecoration: 'none' }}>
              <div className="optionCard">
                <FiShoppingBag className="optionIcon" />
                <div className="optionLabel">My Orders</div>
              </div>
            </Link>

            <Link to="/my-address" style={{ textDecoration: 'none' }}>
              <div className="optionCard">
                <FiMapPin className="optionIcon" />
                <div className="optionLabel">My Addresses</div>
              </div>
            </Link>

            <div className="optionCard logoutCard" onClick={handleSignOut}>
              <FiLogOut className="optionIcon" />
              <div className="optionLabel">Sign Out</div>
            </div>
          </div>
        </div>

      
      </div>
    </>
  );
};

export default AccountPage;
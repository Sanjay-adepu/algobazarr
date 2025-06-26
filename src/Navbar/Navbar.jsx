import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FiMenu,
  FiX,
  FiSearch,
  FiUser,
  FiShoppingCart,
  FiHome,
  FiGrid,
} from 'react-icons/fi';
import './Navbar.css';

const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const navLinks = [
    { label: 'Blog', path: '/blog' },
    { label: 'Terms & Conditions', path: '/terms' },
    { label: 'Customization', path: '/' },
    { label: 'Market Place', path: '/product' },
    { label: 'FAQ', path: '/faq' },
    { label: 'About Us', path: '/about' },
    { label: 'Contact Us', path: '/contact' },
    { label: 'Privacy Policy', path: '/policy' },
  ];

  return (
    <>
      {/* ✅ Show custom banner only on homepage */}
      
     <div className="custom-banner">
      
          Contact us to get your custom Algo Strategy Created on Tradetron
          <a
            href="https://wa.me/message/BDTCA7QUSKFLO1"
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-button"
          >
            WhatsApp
          </a> 
        </div>
    

      {/* ✅ Navbar */}
      <nav className="navbar">
        <div className="navbar-logo">
          <img
            src="/file_00000000175c61f787ac51250e94c909.jpg"
            alt="AlgoDukaan"
            style={{ height: '37px' }}
            id="d"
          />
        </div>

        <ul className="navbar-menu">
          {navLinks.map(({ label, path }) => (
            <li key={path}>
              <Link
                to={path}
                className={`nav-link ${
                  location.pathname === path ? 'active-link' : ''
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="navbar-icons">
          <Link to="/" className="icon desktop-only">
            <FiHome
              style={{ color: location.pathname === '/' ? '#000' : '#888' }}
            />
          </Link>
          <Link to="/search" className="icon desktop-only">
            <FiSearch
              style={{
                color: location.pathname === '/search' ? '#000' : '#888',
              }}
            />
          </Link>
          <Link to="/category" className="icon desktop-only">
            <FiGrid
              style={{
                color: location.pathname === '/category' ? '#000' : '#888',
              }}
            />
          </Link>
          <Link to="/cart" className="icon desktop-only">
            <FiShoppingCart
              style={{
                color: location.pathname === '/cart' ? '#000' : '#888',
              }}
            />
          </Link>
          <Link to="/login" className="icon desktop-only">
            <FiUser
              style={{
                color: location.pathname === '/login' ? '#000' : '#888',
              }}
            />
          </Link>

          <Link to="/search" className="icon mobile-only" id="h">
            <FiSearch />
          </Link>
          <button
            onClick={toggleSidebar}
            className="icon menu-toggle mobile-only"
          >
            {sidebarOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </nav>

      {/* Sidebar for mobile */}
      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <h2 className="sidebar-title">Menu</h2>
        <ul className="sidebar-menu">
          {navLinks.map(({ label, path }) => (
            <Link
              to={path}
              key={path}
              className={`sidebar-link full-click ${location.pathname === path ? 'active' : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              <li>{label}</li>
            </Link>
          ))}
        </ul>
      </div>

      {/* Bottom Nav for Mobile */}
      <div className="bottom-nav mobile-only">
        <Link
          to="/"
          className={`bottom-nav-item ${
            location.pathname === '/' ? 'active' : ''
          }`}
        >
          <FiHome className="icon" />
          <span>Home</span>
        </Link>
        <Link
          to="/category"
          className={`bottom-nav-item ${
            location.pathname === '/category' ? 'active' : ''
          }`}
        >
          <FiGrid className="icon" />
          <span>Categories</span>
        </Link>
        <Link
          to="/cart"
          className={`bottom-nav-item ${
            location.pathname === '/cart' ? 'active' : ''
          }`}
        >
          <FiShoppingCart className="icon" />
          <span>Cart</span>
        </Link>
        <Link
          to="/login"
          className={`bottom-nav-item ${
            location.pathname === '/login' ? 'active' : ''
          }`}
        >
          <FiUser className="icon" />
          <span>Account</span>
        </Link>
      </div>

      {/* Optional floating WhatsApp icon */}
      {location.pathname === '/' && (
        <a
          href="https://wa.me/message/BDTCA7QUSKFLO1"
          className="whatsapp-floating"
          target="_blank"
          rel="noreferrer"
        >
          <img src="./whatsapp.png" alt="WhatsApp" />
        </a>
      )}
    </>
  );
};

export default Navbar;

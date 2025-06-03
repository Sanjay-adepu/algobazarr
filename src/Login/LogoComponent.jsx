import React, { useEffect, useState } from 'react';
import './LogoComponent.css';
import Navbar from '../Navbar/Navbar';
import { Link } from "react-router-dom";
import AddressForm from './AdressForm.jsx';
import AccountPage from './AccountPage';

const LogoComponent = () => {
  const [accountDetails, setAccountDetails] = useState(null);
  const [view, setView] = useState('signin');
  const [loading, setLoading] = useState(false);

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

  const renderGoogleButton = (viewType) => {
    const container = document.getElementById('googleSignInDiv');
    if (!container) return;

    container.innerHTML = ''; // Clear previous button

    window.google.accounts.id.renderButton(container, {
      theme: 'outline',
      size: 'large',
      type: 'standard',
      text: 'continue_with',
      // Even if undocumented, sometimes this helps suppress One Tap
      data_auto_prompt: 'false',
    });

    setTimeout(() => {
      const textSpan = container.querySelector('span');
      if (textSpan) {
        textSpan.innerText = viewType === 'signup' ? 'Sign up with Google' : 'Sign in with Google';
      }
    }, 100);
  };

  useEffect(() => {
    const storedGoogleId = localStorage.getItem('googleId');
    const storedEmail = localStorage.getItem('email');

    if (storedGoogleId && storedEmail) {
      setFormData(prev => ({ ...prev, email: storedEmail }));
      setView('account');
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    window.handleCredentialResponse = async (response) => {
      try {
        setLoading(true);

        const res = await fetch('https://algotronn-backend.vercel.app/api/google-login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token: response.credential }),
        });

        const data = await res.json();
        if (data.success) {
          localStorage.setItem('googleId', data.user.googleId);
          localStorage.setItem('email', data.user.email);

          setAccountDetails(data.user);
          setFormData(prev => ({ ...prev, email: data.user.email }));

          setTimeout(() => {
            setView(data.isNewUser ? 'address' : 'account');
            setLoading(false);
          }, 1000);
        } else {
          alert('Login failed');
          setLoading(false);
        }
      } catch (err) {
        console.error(err);
        alert('An error occurred during login.');
        setLoading(false);
      }
    };

    script.onload = () => {
      window.google.accounts.id.initialize({
        client_id: '741240365062-r2te32gvukmekm4r55l4ishc0mhsk4f9.apps.googleusercontent.com',
        callback: window.handleCredentialResponse,
        ux_mode: 'popup',
        auto_select: false, // <-- this disables auto One Tap login
      });

      renderGoogleButton(view); // Initial render

      // Do NOT call prompt() – this triggers One Tap!
      // window.google.accounts.id.prompt(); <-- removed
    };
  }, []);

  // Re-render button on view change (signin/signup)
  useEffect(() => {
    if (window.google?.accounts?.id) {
      renderGoogleButton(view);
    }
  }, [view]);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Address submitted successfully!');
    setView('account');
  };

  const handleSignOut = () => {
    localStorage.removeItem('googleId');
    localStorage.removeItem('email');

    setAccountDetails(null);
    setFormData({
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
    setView('signin');
  };

  return (
    <>
      <Navbar />
      <div className="auth-container fade-in">
        {loading && (
          <div className="loading-overlay">
            <div className="spinner"></div>
            <p>Logging you in...</p>
          </div>
        )}

        {!loading && (view === 'signin' || view === 'signup') && (
          <div className="auth-card">
            <div className="tab-switcher">
              <button className={`tab-btn ${view === 'signin' ? 'active' : ''}`} onClick={() => setView('signin')}>Sign In</button>
              <button className={`tab-btn ${view === 'signup' ? 'active' : ''}`} onClick={() => setView('signup')}>Sign Up</button>
            </div>

            <div className="lock-icon">
              <span role="img" aria-label="lock">🔒</span>
            </div>

            <h2 className="login-title">{view === 'signup' ? 'Create Your Account' : 'Login to Your Account'}</h2>
            <p className="login-subtext">
              {view === 'signup' ? 'Use Google to create a new account' : 'Quick access using your Google Account'}
            </p>

            <div id="googleSignInDiv" className="google-btn-container"></div>

            <p className="terms">
              By continuing, you agree to our <Link to="/terms">Terms of Service</Link> and <Link to="/policy">Privacy Policy</Link>.
            </p>
          </div>
        )}

        {!loading && view === 'address' && (
          <AddressForm formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} />
        )}

        {!loading && view === 'account' && (
          <AccountPage formData={formData} handleSignOut={handleSignOut} />
        )}
      </div>
    </>
  );
};

export default LogoComponent;
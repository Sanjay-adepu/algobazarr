import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import AddressForm from './AdressForm.jsx';
import AccountPage from './AccountPage';
import { Link } from 'react-router-dom';

const LogoComponent = () => {
  const [accountDetails, setAccountDetails] = useState(null);
  const [view, setView] = useState('signin');
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    password: '',
    address: '',
    locality: '',
    landmark: '',
    pincode: '',
    city: '',
    state: '',
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCredentialResponse = async (response) => {
    setLoading(true);
    try {
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
        setView(data.isNewUser ? 'address' : 'account');
      } else {
        alert('Google login failed');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred during Google login.');
    } finally {
      setLoading(false);
    }
  };

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const endpoint =
        view === 'signup'
          ? 'https://algotronn-backend.vercel.app/signup1'
          : 'https://algotronn-backend.vercel.app/login1';

      const payload =
        view === 'signup'
          ? {
              username: formData.name,
              email: formData.email,
              password: formData.password,
              mobile: formData.mobile || '0000000000',
            }
          : {
              email: formData.email,
              password: formData.password,
            };

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem('googleId', data.user.googleId);
        localStorage.setItem('email', data.user.email);
        setAccountDetails(data.user);
        setFormData(prev => ({ ...prev, email: data.user.email }));
        setView(view === 'signup' ? 'address' : 'account');
      } else {
        alert(data.message || 'Authentication failed');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddressSubmit = (e) => {
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
      password: '',
      address: '',
      locality: '',
      landmark: '',
      pincode: '',
      city: '',
      state: '',
    });
    setView('signin');
  };

  const renderGoogleButton = (viewType) => {
    const container = document.getElementById('googleSignInDiv');
    if (!container || !window.google?.accounts?.id) return;

    container.innerHTML = '';
    window.google.accounts.id.renderButton(container, {
      theme: 'outline',
      size: 'large',
      type: 'standard',
      text: 'continue_with',
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
    } else {
      setView('signin');
    }

    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (!window.google || !window.google.accounts) return;

      // Cancel any One Tap prompt that might be cached
      window.google.accounts.id.cancel();

      // Initialize with popup mode only
      window.google.accounts.id.initialize({
        client_id: '741240365062-r2te32gvukmekm4r55l4ishc0mhsk4f9.apps.googleusercontent.com',
        callback: handleCredentialResponse,
        ux_mode: 'popup',
        auto_select: false,
        prompt_parent_id: 'googleSignInDiv'
      });

      renderGoogleButton(view);
    };

    return () => {
      window.google?.accounts?.id?.cancel();
    };
  }, []);

  useEffect(() => {
    if (window.google?.accounts?.id) {
      renderGoogleButton(view);
    }
  }, [view]);

  return (
    <>
      <Navbar />
      <div className="auth-wrapper">
        {loading ? (
          <div className="loading-section">
            <div className="spinner"></div>
            <p>Loading, please wait...</p>
          </div>
        ) : (
          <>
            {(view === 'signin' || view === 'signup') && (
              <>
                <h2 className="auth-header">{view === 'signup' ? 'Sign Up' : 'Login'}</h2>
                <form onSubmit={handleAuthSubmit} className="auth-form">
                  {view === 'signup' && (
                    <>
                      <input className="auth-input" type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
                      <input className="auth-input" type="text" name="mobile" value={formData.mobile} onChange={handleChange} placeholder="Mobile" required />
                    </>
                  )}
                  <input className="auth-input" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
                  <input className="auth-input" type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
                  <button type="submit" className="auth-button">
                    {view === 'signup' ? 'Create Account' : 'Login'}
                  </button>
                  <label className="auth-terms">
                    <input type="checkbox" defaultChecked />
                    <span>
                      By continuing, I agree to the <Link to="/terms" id="g">terms of use</Link> and <Link to="/policy" id="g">privacy policy</Link>.
                    </span>
                  </label>
                </form>

                <h4 id="k">OR</h4>
                <div style={{ marginTop: '1rem' }} id="googleSignInDiv"></div>

                <p className="auth-switch">
                  {view === 'signin' ? (
                    <>Don’t have an account? <span className="auth-link" onClick={() => setView('signup')}>Sign Up</span></>
                  ) : (
                    <>Already have an account? <span className="auth-link" onClick={() => setView('signin')}>Login</span></>
                  )}
                </p>
              </>
            )}

            {view === 'address' && (
              <AddressForm formData={formData} handleChange={handleChange} handleSubmit={handleAddressSubmit} />
            )}

            {view === 'account' && (
              <AccountPage formData={formData} handleSignOut={handleSignOut} />
            )}
          </>
        )}
      </div>
    </>
  );
};

export default LogoComponent;
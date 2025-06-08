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

  window.google?.accounts?.id?.disableAutoSelect(); // Clear stored Google session

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

  // Load the Google Sign-In script
  const script = document.createElement('script');
  script.src = 'https://accounts.google.com/gsi/client';
  script.async = true;
  script.defer = true;
  document.body.appendChild(script);

  script.onload = () => {
    if (!window.google || !window.google.accounts) return;

    // Cancel any One Tap UI or auto-prompts
    window.google.accounts.id.cancel();

    // Disable account auto-selection from previous sessions
    window.google.accounts.id.disableAutoSelect();

    // Initialize Google Sign-In with strict popup only, no One Tap, no dropdown
    window.google.accounts.id.initialize({
      client_id: '741240365062-r2te32gvukmekm4r55l4ishc0mhsk4f9.apps.googleusercontent.com',
      callback: handleCredentialResponse,
      ux_mode: 'popup',
      auto_select: false,
      auto_prompt: false,
      context: 'use', // Only proceed if user actively initiates
      prompt_parent_id: 'googleSignInDiv',
    });

    // Render the custom Google button
    renderGoogleButton(view);
  };

  return () => {
    // Clean up on unmount
    window.google?.accounts?.id?.cancel?.();
    window.google?.accounts?.id?.disableAutoSelect?.();
  };
}, []);


useEffect(() => {
if (window.google?.accounts?.id) {
renderGoogleButton(view);
}
}, [view]);

return (
<>
<style>{`
.auth-wrapper {
max-width: 440px;
margin: 5rem auto;
padding: 2rem;
background-color: #fff;
border-radius: 12px;
box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
animation: fadeIn 0.3s ease-in-out;
margin-top:15%;
}

.auth-header {
font-size: 1.8rem;
font-weight: 700;
color: #1f2937;
text-align: center;
}

.auth-form {          
  display: flex;          
  flex-direction: column;          
  gap: 1rem;          
  margin-top: 1rem;          
}          
  
.auth-input {          
  padding: 12px 14px;          
  border: 1px solid #d1d5db;          
  border-radius: 8px;          
  font-size: 1rem;          
}          
  
.auth-button {          
  padding: 12px;          
  background-color: #2563eb;          
  color: #fff;          
  font-weight: 600;          
  border: none;          
  border-radius: 8px;          
  cursor: pointer;          
  transition: background-color 0.3s ease;          
}          
  
.auth-button:hover {          
  background-color: #1e40af;          
}          
  
.auth-terms {          
  display: flex;          
  align-items: flex-start;          
  gap: 0.5rem;          
  font-size: 0.85rem;          
  color: #4b5563;          
  margin-top: 0.5rem;          
}          
  
.auth-terms input {          
  margin-top: 3px;          
}          
  
.auth-switch {          
  text-align: center;          
  margin-top: 1rem;          
  font-size: 0.95rem;          
}          
  
.auth-link {          
  color: #2563eb;          
  font-weight: 500;          
  cursor: pointer;          
}          
  
.auth-link:hover {          
  text-decoration: underline;          
}          
  
.loading-section {          
  display: flex;          
  flex-direction: column;          
  align-items: center;          
  gap: 1rem;          
  padding: 2rem 0;          
}          
  
.spinner {          
  width: 40px;          
  height: 40px;          
  border: 4px solid #d1d5db;          
  border-top-color: #2563eb;          
  border-radius: 50%;          
  animation: spin 1s linear infinite;          
}          
#g{          
text-decoration:none;          
color:red;          
}          
#k{    
text-align:center;    
font-size:10px;    
}    
@keyframes spin {          
  to {          
    transform: rotate(360deg);          
  }          
}          
  
@keyframes fadeIn {          
  from {          
    opacity: 0;          
    transform: translateY(10px);          
  }          
  to {          
    opacity: 1;          
    transform: translateY(0);          
  }          
}          
  
@media (max-width: 460px) {          
  .auth-wrapper {          
    margin: 2rem 1rem;          
    padding: 1.5rem;          
    margin-top:120px !important;          
  }          
.auth-switch {          
  text-align: center;          
  margin-top: 1rem;          
  font-size: 0.67rem;          
}          
  .auth-header {          
    font-size: 1rem;          
  }          
.auth-terms {          
  display: flex;          
  align-items: flex-start;          
  gap: 0.5rem;          
  font-size: 0.57rem;          
  color: #4b5563;          
  margin-top: 0.5rem;          
}          
  .auth-button,          
  .auth-input {          
    font-size: 0.7rem;          
  }          
}

`}</style>
<Navbar />
<div className="auth-wrapper">
{loading ? (
<div className="loading-container">
<div className="loader"></div>
<p style={{ marginTop: "1rem", fontSize: "1rem", color: "#555" }}>
Loading, please wait...
</p>
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
By continuing, I agree to the 
<Link to="/terms" id="g">terms of use</Link> and 
<Link to="/policy" id="g">privacy policy</Link>.
</span>
</label>
</form>
<h4 id="k">OR</h4>

<div style={{ marginTop: '1rem' }} id="googleSignInDiv"></div>    

            <p className="auth-switch">    
              {view === 'signin' ? (    
                <>    
                  Don’t have an account?{' '}    
                  <span className="auth-link" onClick={() => setView('signup')}>Sign Up</span>    
                </>    
              ) : (    
                <>    
                  Already have an account?{' '}    
                  <span className="auth-link" onClick={() => setView('signin')}>Login</span>    
                </>    
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
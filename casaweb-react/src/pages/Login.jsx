import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [isActive, setIsActive] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // Apply the login-page styles to the body when on this page
  useEffect(() => {
    document.body.classList.add('login-page');
    return () => {
      document.body.classList.remove('login-page');
    };
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, password: formData.password }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setMessage('Login Successful! Redirecting...');
        setTimeout(() => navigate('/'), 2000);
      } else {
        setMessage(data.message || 'Login Failed');
      }
    } catch (error) {
      setMessage('Error connecting to server');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage('Registration Successful! Please Sign In.');
        setIsActive(false);
      } else {
        setMessage(data.message || 'Registration Failed');
      }
    } catch (error) {
      setMessage('Error connecting to server');
    }
  };

  return (
    <>
      <Link to="/" className="back-home">
        <i className="fa-solid fa-arrow-left"></i> Back to Home
      </Link>

      <div className={`login-container ${isActive ? 'active' : ''}`}>
        {/* Login Form */}
        <div className="form-box login">
          <form onSubmit={handleLogin}>
            <h2>Welcome Back</h2>
            {message && <p className="auth-message">{message}</p>}
            <div className="input-box">
              <span className="icon"><i className="fa-solid fa-envelope"></i></span>
              <input type="email" name="email" required onChange={handleChange} />
              <label>Email</label>
            </div>
            <div className="input-box">
              <span className="icon"><i className="fa-solid fa-lock"></i></span>
              <input type="password" name="password" required onChange={handleChange} />
              <label>Password</label>
            </div>
            <div className="forgot-pass">
              <a href="#">Forgot your password?</a>
            </div>
            <button type="submit" className="btn">Sign In</button>
            <div className="login-register">
              <p>Don't have an account? <a href="#" className="register-link" onClick={(e) => { e.preventDefault(); setIsActive(true); setMessage(''); }}>Sign Up</a></p>
            </div>
          </form>
        </div>

        {/* Registration Form */}
        <div className="form-box register">
          <form onSubmit={handleRegister}>
            <h2>Create Account</h2>
            {message && <p className="auth-message">{message}</p>}
            <div className="input-box">
              <span className="icon"><i className="fa-solid fa-user"></i></span>
              <input type="text" name="username" required onChange={handleChange} />
              <label>Username</label>
            </div>
            <div className="input-box">
              <span className="icon"><i className="fa-solid fa-envelope"></i></span>
              <input type="email" name="email" required onChange={handleChange} />
              <label>Email</label>
            </div>
            <div className="input-box">
              <span className="icon"><i className="fa-solid fa-lock"></i></span>
              <input type="password" name="password" required onChange={handleChange} />
              <label>Password</label>
            </div>
            <div className="terms">
              <label><input type="checkbox" required /> I agree to the terms & conditions</label>
            </div>
            <button type="submit" className="btn">Sign Up</button>
            <div className="login-register">
              <p>Already have an account? <a href="#" className="login-link" onClick={(e) => { e.preventDefault(); setIsActive(false); setMessage(''); }}>Sign In</a></p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;

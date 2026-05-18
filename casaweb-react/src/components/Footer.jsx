import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="main-footer">
      <div className="back-to-top" onClick={scrollToTop}>
        <i className="fa-solid fa-chevron-up"></i>
        <span>Back to top</span>
      </div>

      <div className="footer-content">
        <div className="footer-section brand-info">
          <h2 className="footer-logo">CasaWebClothing</h2>
          <p>
            Your ultimate destination for premium western wear. 
            Redefining fashion for the modern woman since 2026.
          </p>
          <div className="social-icons">
            <a href="#"><i className="fa-brands fa-facebook-f"></i></a>
            <a href="#"><i className="fa-brands fa-instagram"></i></a>
            <a href="#"><i className="fa-brands fa-twitter"></i></a>
            <a href="#"><i className="fa-brands fa-pinterest-p"></i></a>
          </div>
        </div>

        <div className="footer-section links">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">New Arrivals</Link></li>
            <li><Link to="/about">Our Story</Link></li>
            <li><Link to="/wishlist">My Wishlist</Link></li>
            <li><Link to="/login">Sign In</Link></li>
          </ul>
        </div>

        <div className="footer-section links">
          <h3>Categories</h3>
          <ul>
            <li><Link to="/products?cat=tops">Tops & Tees</Link></li>
            <li><Link to="/products?cat=jeans">Denim Collection</Link></li>
            <li><Link to="/products?cat=dresses">Dresses</Link></li>
            <li><Link to="/products?cat=crop-tops">Crop Tops</Link></li>
          </ul>
        </div>

        <div className="footer-section newsletter">
          <h3>Newsletter</h3>
          <p>Subscribe to get special offers and once-in-a-lifetime deals.</p>
          <div className="subscribe-form">
            <input type="email" placeholder="Your email address" />
            <button type="button">Subscribe</button>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p>&copy; 2026 CasaWebClothing. All rights reserved.</p>
          <div className="legal-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Shipping Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

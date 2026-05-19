import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ cartCount, onCartClick, user, onLogout }) => {
  const [query, setQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/products?search=${encodeURIComponent(query)}`);
    setIsMobileMenuOpen(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMobileMenuLinkClick = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  return (
    <header>
      <div className="navbar">
        {/* Mobile Hamburger Button */}
        <button className="mobile-menu-btn" onClick={toggleMobileMenu} aria-label="Toggle Menu">
          <i className="fa-solid fa-bars"></i>
        </button>

        <div className="nav-logo border" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          <div className="logo"> </div>
        </div>

        <div className="nav-address border desktop-only">
          <p className="add-first">Deliver to</p>
          <div className="add-icon">
            <i className="fa-solid fa-location-dot"></i>
            <p className="add-second">India</p>
          </div>
        </div>

        <div className="nav-search border">
          <select className="search-select">
            <option>All</option>
            <option>Tops</option>
            <option>jeans</option>
            <option>long-dresses</option>
            <option>short-dress</option>
            <option>crop-tops</option>
            <option>trousers</option>
            <option>skirts</option>
            <option>jumpsuits</option>
            <option>tshirts</option>
          </select>
          <input 
            type="text" 
            placeholder="search casaclothing" 
            className="search-input" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <div className="search-icon" onClick={handleSearch} style={{ cursor: 'pointer' }}>
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
        </div>

        <div className="nav-signin border desktop-only">
          {user ? (
            <div style={{ color: 'inherit', textDecoration: 'none', cursor: 'default' }}>
              <p><span>Hello, {user.username}</span></p>
              <p className="nav-second" onClick={onLogout} style={{ cursor: 'pointer', color: '#ff9900' }}>Logout</p>
            </div>
          ) : (
            <Link to="/login" style={{ color: 'inherit', textDecoration: 'none' }}>
              <p><span>Hello, sign in</span></p>
              <p className="nav-second">Account & lists</p>
            </Link>
          )}
        </div>

        <div className="nav-return border desktop-only">
          <Link to="/wishlist" style={{ color: 'inherit', textDecoration: 'none' }}>
            <p><span>Wishlist</span></p>
            <p className="nav-second">Saved Items</p>
          </Link>
        </div>

        {/* Mobile icons container */}
        <div className="nav-right-icons">
          <Link to="/wishlist" className="mobile-wishlist-icon border mobile-only" style={{ color: 'white', fontSize: '1.2rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <i className="fa-regular fa-heart"></i>
          </Link>
          <div className="nav-cart border" onClick={onCartClick} style={{ cursor: 'pointer' }}>
            <i className="fa-solid fa-cart-shopping"></i>
            <span className="desktop-only" style={{ marginLeft: '5px' }}>Cart</span>
            <span className="cart-count">{cartCount}</span>
          </div>
        </div>
      </div>

      <div className="panel">
        <div className="panel-all" onClick={() => navigate('/products')} style={{ cursor: 'pointer' }}>
          <i className="fa-solid fa-bars"></i>
          <span>All Products</span>
        </div>
        <div className="panel-ops">
          <p onClick={() => navigate('/products?search=jeans')}>jeans</p>
          <p onClick={() => navigate('/products?search=dress')}>long-dress</p>
          <p onClick={() => navigate('/products?search=crop')}>crop-tops</p>
          <p onClick={() => navigate('/products?search=dress')}>short-Dresses</p>
          <p onClick={() => navigate('/products?search=skirt')}>skirts</p>
          <p onClick={() => navigate('/products?search=top')}>tops & tshirts</p>
        </div>
        <div className="panel-deals">
          <p><Link to="/about">About Us</Link></p>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {isMobileMenuOpen && (
        <div className="mobile-menu-overlay show" onClick={toggleMobileMenu}></div>
      )}

      {/* Mobile Drawer Menu */}
      <div className={`mobile-menu-drawer ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-header">
          <div className="mobile-user-info">
            <i className="fa-solid fa-circle-user" style={{ fontSize: '1.8rem', marginRight: '10px' }}></i>
            {user ? (
              <h3>Hello, {user.username}</h3>
            ) : (
              <h3 onClick={() => handleMobileMenuLinkClick('/login')} style={{ cursor: 'pointer' }}>Hello, Sign In</h3>
            )}
          </div>
          <button className="close-menu-btn" onClick={toggleMobileMenu} aria-label="Close Menu">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div className="mobile-menu-content">
          <div className="mobile-menu-section">
            <h4>Trending</h4>
            <ul>
              <li><span onClick={() => handleMobileMenuLinkClick('/')}>Home</span></li>
              <li><span onClick={() => handleMobileMenuLinkClick('/products')}>All Products</span></li>
              <li><span onClick={() => handleMobileMenuLinkClick('/wishlist')}>My Wishlist</span></li>
              <li><span onClick={() => handleMobileMenuLinkClick('/about')}>About Us</span></li>
            </ul>
          </div>

          <div className="mobile-menu-section">
            <h4>Shop By Category</h4>
            <ul>
              <li><span onClick={() => handleMobileMenuLinkClick('/products?search=jeans')}>Jeans</span></li>
              <li><span onClick={() => handleMobileMenuLinkClick('/products?search=dress')}>Dresses</span></li>
              <li><span onClick={() => handleMobileMenuLinkClick('/products?search=crop')}>Crop Tops</span></li>
              <li><span onClick={() => handleMobileMenuLinkClick('/products?search=skirt')}>Skirts</span></li>
              <li><span onClick={() => handleMobileMenuLinkClick('/products?search=top')}>Tops & T-shirts</span></li>
            </ul>
          </div>

          <div className="mobile-menu-section">
            <h4>Help & Settings</h4>
            <ul>
              <li className="mobile-address-info" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#666', padding: '8px 0' }}>
                <i className="fa-solid fa-location-dot"></i> Deliver to India
              </li>
              {user ? (
                <li><span onClick={onLogout} style={{ color: '#ff4757', fontWeight: 'bold' }}>Sign Out</span></li>
              ) : (
                <li><span onClick={() => handleMobileMenuLinkClick('/login')}>Sign In</span></li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

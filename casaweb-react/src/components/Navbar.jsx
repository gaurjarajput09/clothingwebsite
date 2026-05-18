import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ cartCount, onCartClick, user, onLogout }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/products?search=${encodeURIComponent(query)}`);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <header>
      <div className="navbar">
        <div className="nav-logo border" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          <div className="logo"> </div>
        </div>

        <div className="nav-address border">
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

        <div className="nav-signin border">
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

        <div className="nav-return border">
          <Link to="/wishlist" style={{ color: 'inherit', textDecoration: 'none' }}>
            <p><span>Wishlist</span></p>
            <p className="nav-second">Saved Items</p>
          </Link>
        </div>

        <div className="nav-cart border" onClick={onCartClick} style={{ cursor: 'pointer' }}>
          <i className="fa-solid fa-cart-shopping"></i>
          Cart <span className="cart-count">{cartCount}</span>
        </div>
      </div>

      <div className="panel">
        <div className="panel-all">
          <i className="fa-solid fa-bars"></i>
          <Link to="/products">All Products</Link>
        </div>
        <div className="panel-ops">
          <p>jeans </p>
          <p> long-dress</p>
          <p> crop-tops</p>
          <p>short-Dresses</p>
          <p>skirts</p>
          <p>tops & tshirts</p>
        </div>
        <div className="panel-deals">
          <p><Link to="/about">About Us</Link></p>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

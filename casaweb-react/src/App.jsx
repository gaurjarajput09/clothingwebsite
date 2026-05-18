import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import Login from './pages/Login';
import Wishlist from './pages/Wishlist';
import About from './pages/About';
import CartSidebar from './components/CartSidebar';
import './index.css';

function AppContent() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [user, setUser] = useState(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) {
      try { setCartItems(JSON.parse(savedCart)); } catch (e) { console.error(e); }
    }
  }, []);

  // Fetch Wishlist from backend if logged in
  useEffect(() => {
    const fetchWishlist = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await fetch('http://127.0.0.1:5000/api/wishlist', {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          if (response.ok) {
            const data = await response.json();
            // Map backend product data to frontend format
            const formattedWishlist = data.map(p => ({
              ...p,
              id: p._id,
              title: p.name
            }));
            setWishlistItems(formattedWishlist);
          }
        } catch (error) {
          console.error('Error fetching wishlist:', error);
        }
      } else {
        // Fallback to localStorage if not logged in
        const savedWishlist = localStorage.getItem('wishlistItems');
        if (savedWishlist) {
          try { setWishlistItems(JSON.parse(savedWishlist)); } catch (e) { console.error(e); }
        }
      }
    };

    fetchWishlist();
  }, [user]); // Re-fetch when user changes (login/logout)

  // Save cart and wishlist to localStorage
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    if (!user) {
      localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
    }
  }, [wishlistItems, user]);

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  const removeFromCart = (index) => {
    const newCart = [...cartItems];
    newCart.splice(index, 1);
    setCartItems(newCart);
  };

  const toggleWishlist = async (product) => {
    const token = localStorage.getItem('token');
    const exists = wishlistItems.find(item => item.id === product.id);

    if (token) {
      // Sync with backend
      try {
        const method = exists ? 'DELETE' : 'POST';
        const response = await fetch(`http://127.0.0.1:5000/api/wishlist/${product.id}`, {
          method,
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.ok) {
          if (exists) {
            setWishlistItems(wishlistItems.filter(item => item.id !== product.id));
          } else {
            setWishlistItems([...wishlistItems, product]);
          }
        }
      } catch (error) {
        console.error('Error updating wishlist:', error);
      }
    } else {
      // Local only if not logged in
      if (exists) {
        setWishlistItems(wishlistItems.filter(item => item.id !== product.id));
      } else {
        setWishlistItems([...wishlistItems, product]);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setWishlistItems([]);
    window.location.href = '/';
  };

  const toggleCart = () => setIsCartOpen(!isCartOpen);

  return (
    <div className="app-container">
      {!isLoginPage && (
        <Navbar 
          cartCount={cartItems.length} 
          wishlistCount={wishlistItems.length} 
          onCartClick={toggleCart} 
          user={user}
          onLogout={handleLogout}
        />
      )}
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route 
          path="/products" 
          element={
            <Products 
              addToCart={addToCart} 
              toggleWishlist={toggleWishlist} 
              wishlistItems={wishlistItems} 
            />
          } 
        />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route 
          path="/wishlist" 
          element={
            <Wishlist 
              wishlistItems={wishlistItems} 
              toggleWishlist={toggleWishlist} 
              addToCart={addToCart} 
            />
          } 
        />
      </Routes>

      {!isLoginPage && <Footer />}
      
      <CartSidebar 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cartItems={cartItems}
        removeFromCart={removeFromCart}
      />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = ['/images/hero.jpg', '/images/hero2.png'];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <main>
      <div className="hero-section">
        <div className="slider">
          <div className="slides" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
            {slides.map((src, index) => (
              <div 
                key={index} 
                className="slide" 
                style={{ backgroundImage: `url(${src})` }}
              ></div>
            ))}
          </div>
          <button className="prev-slide" onClick={prevSlide}>
            <i className="fa-solid fa-chevron-left"></i>
          </button>
          <button className="next-slide" onClick={nextSlide}>
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        </div>
        <div className="hero-msg">
          <p>
            you are on <a href="casawebclothing.com">casawebclothing.com</a>. you can also shop on casawebclothing.in for crores of products with faster delivery
          </p>
        </div>
      </div>

      <div className="shop-section">
        <div className="box box1">
          <div className="box-content border">
            <h2>denims</h2>
            <div className="box-img" style={{ backgroundImage: "url('/images/denims.jpg')" }}></div>
            <p><Link to="/products" style={{ color: '#007185', textDecoration: 'none' }}>see more</Link></p>
          </div>
        </div>
        <div className="box box2">
          <div className="box-content border">
            <h2>premium Dresses</h2>
            <div className="box-img" style={{ backgroundImage: "url('/images/dressbox.jpg')" }}></div>
            <p><Link to="/products" style={{ color: '#007185', textDecoration: 'none' }}>see more</Link></p>
          </div>
        </div>
        <div className="box box3">
          <div className="box-content border">
            <h2>premium tshirts</h2>
            <div className="box-img" style={{ backgroundImage: "url('/images/tshirtbox.png')" }}></div>
            <p><Link to="/products" style={{ color: '#007185', textDecoration: 'none' }}>see more</Link></p>
          </div>
        </div>
        <div className="box box4">
          <div className="box-content border">
            <h2>tops & crop-tops</h2>
            <div className="box-img" style={{ backgroundImage: "url('/images/tops.jpg')" }}></div>
            <p><Link to="/products" style={{ color: '#007185', textDecoration: 'none' }}>see more</Link></p>
          </div>
        </div>
      </div>

      <div className="shop-section">
        <div className="box box5">
          <div className="box-content border">
            <h2>Long Dresses</h2>
            <div className="box-img" style={{ backgroundImage: "url('/images/women_long_dress.png')" }}></div>
            <p><Link to="/products" style={{ color: '#007185', textDecoration: 'none' }}>see more</Link></p>
          </div>
        </div>
        <div className="box box6">
          <div className="box-content border">
            <h2>Short Dresses</h2>
            <div className="box-img" style={{ backgroundImage: "url('/images/women_short_dress.png')" }}></div>
            <p><Link to="/products" style={{ color: '#007185', textDecoration: 'none' }}>see more</Link></p>
          </div>
        </div>
        <div className="box box7">
          <div className="box-content border">
            <h2>Skirts</h2>
            <div className="box-img" style={{ backgroundImage: "url('/images/skirt.jpg')" }}></div>
            <p><Link to="/products" style={{ color: '#007185', textDecoration: 'none' }}>see more</Link></p>
          </div>
        </div>
        <div className="box box8">
          <div className="box-content border">
            <h2>New Arrivals</h2>
            <div className="box-img" style={{ backgroundImage: "url('/images/moreclothes.jpg')" }}></div>
            <p><Link to="/products" style={{ color: '#007185', textDecoration: 'none' }}>see more</Link></p>
          </div>
        </div>
      </div>

      <div className="features-section">
        <div className="feature">
          <i className="fa-solid fa-truck-fast"></i>
          <h3>Free Shipping</h3>
          <p>On orders over ₹999</p>
        </div>
        <div className="feature">
          <i className="fa-solid fa-rotate-left"></i>
          <h3>Easy Returns</h3>
          <p>30-day return policy</p>
        </div>
        <div className="feature">
          <i className="fa-solid fa-lock"></i>
          <h3>Secure Payment</h3>
          <p>100% secure checkout</p>
        </div>
        <div className="feature">
          <i className="fa-solid fa-headset"></i>
          <h3>24/7 Support</h3>
          <p>Dedicated support</p>
        </div>
      </div>

      <div className="newsletter-section">
        <div className="newsletter-content">
          <h2>Stay Updated</h2>
          <p>Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.</p>
          <div className="newsletter-form">
            <input type="email" placeholder="Your email address" />
            <button>Join Us</button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;

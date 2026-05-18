import React from 'react';

const CartSidebar = ({ isOpen, onClose, cartItems, removeFromCart }) => {
  const total = cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <>
      <div className={`cart-overlay ${isOpen ? 'show' : ''}`} onClick={onClose}></div>
      <div className={`cart-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h2>Your Cart</h2>
          <button className="close-cart" onClick={onClose}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        <div className="cart-items-container">
          {cartItems.length === 0 ? (
            <p style={{ textAlign: 'center', marginTop: '30px', color: '#888' }}>
              Your cart is empty.
            </p>
          ) : (
            cartItems.map((item, index) => (
              <div className="cart-item" key={index}>
                <img src={item.image} alt={item.title} />
                <div className="cart-item-info">
                  <div className="cart-item-title">{item.title}</div>
                  <div className="cart-item-price">₹{item.price.toLocaleString('en-IN')}</div>
                </div>
                <button className="remove-item" onClick={() => removeFromCart(index)}>
                  <i className="fa-solid fa-trash"></i>
                </button>
              </div>
            ))
          )}
        </div>
        <div className="cart-footer">
          <div className="cart-total">
            <span>Total:</span>
            <span className="total-price">₹{total.toLocaleString('en-IN')}</span>
          </div>
          <button className="checkout-btn">Checkout</button>
        </div>
      </div>
    </>
  );
};

export default CartSidebar;

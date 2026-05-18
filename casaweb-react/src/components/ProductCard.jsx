import React from 'react';

const ProductCard = ({ product, addToCart, toggleWishlist, isWishlisted }) => {
  return (
    <div className="product-card">
      <div className="product-img-container">
        <img src={product.image} alt={product.title} className="product-img" />
        <button 
          className={`wishlist-btn ${isWishlisted ? 'active' : ''}`} 
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
        >
          <i className={`${isWishlisted ? 'fa-solid' : 'fa-regular'} fa-heart`}></i>
        </button>
      </div>
      <div className="product-info">
        <p className="product-brand">casaclothing</p>
        <h3 className="product-title">{product.title}</h3>
        <p className="product-price">₹{product.price.toLocaleString('en-IN')}</p>
        <button className="add-to-cart-btn" onClick={() => addToCart(product)}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

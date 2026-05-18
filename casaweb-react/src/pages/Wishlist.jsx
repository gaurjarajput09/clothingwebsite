import React from 'react';
import ProductCard from '../components/ProductCard';

const Wishlist = ({ wishlistItems, toggleWishlist, addToCart }) => {
  return (
    <main className="products-main">
      <h1 className="category-title">My Wishlist</h1>
      
      {wishlistItems.length === 0 ? (
        <div style={{ textAlign: 'center', margin: '50px 0' }}>
          <i className="fa-regular fa-heart" style={{ fontSize: '4rem', color: '#ccc', marginBottom: '20px' }}></i>
          <p style={{ fontSize: '1.2rem', color: '#666' }}>Your wishlist is empty.</p>
        </div>
      ) : (
        <div className="product-grid">
          {wishlistItems.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              addToCart={addToCart} 
              toggleWishlist={toggleWishlist}
              isWishlisted={true}
            />
          ))}
        </div>
      )}
    </main>
  );
};

export default Wishlist;

import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import API_URL from '../config';

const Products = ({ addToCart, toggleWishlist, wishlistItems }) => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get('search') || '';
    setSearchQuery(q);
  }, [location.search]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_URL}/api/products`);
        const data = await response.json();
        // Map _id to id for frontend compatibility
        const formattedData = data.map(p => ({
          ...p,
          id: p._id,
          title: p.name // Backend uses 'name', frontend uses 'title'
        }));
        setProducts(formattedData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const categories = [...new Set(products.map(p => p.category))];

  if (loading) {
    return <div className="loading">Loading products...</div>;
  }

  return (
    <main className="products-main">
      <h1 className="category-title">Women's Western Wear</h1>
      
      {products.length === 0 && <p className="no-products">No products found. Please add some to MongoDB!</p>}

      {categories.map(category => {
        const categoryProducts = products.filter(p => 
          p.category === category && 
          p.title.toLowerCase().includes(searchQuery.toLowerCase())
        );

        if (categoryProducts.length === 0) return null;

        return (
          <section key={category} className="product-section" id={category.toLowerCase().replace(/ /g, '-')}>
            <h2>{category}</h2>
            <div className="product-grid">
              {categoryProducts.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  addToCart={addToCart} 
                  toggleWishlist={toggleWishlist}
                  isWishlisted={wishlistItems.some(item => item.id === product.id)}
                />
              ))}
            </div>
          </section>
        );
      })}
    </main>
  );
};

export default Products;

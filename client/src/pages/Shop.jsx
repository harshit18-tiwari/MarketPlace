import { useState, useEffect } from 'react';
import { getProducts, getCurrentUser } from '../api';
import ProductDetailsModal from '../components/ProductDetailsModal';

function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    setCurrentUser(getCurrentUser());
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [page, search, selectedCategory]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = { page, search, limit: 12 };
      if (selectedCategory !== 'all') {
        params.category = selectedCategory;
      }
      const data = await getProducts(params);
      setProducts(data.products);
      setTotalPages(data.pages);
    } catch (err) {
      setError('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setPage(1);
  };

  const categories = [
    { value: 'all', label: 'All Products', icon: '🛍️' },
    { value: 'Books', label: 'Books', icon: '📚' },
    { value: 'Electronics', label: 'Electronics', icon: '💻' },
    { value: 'Furniture', label: 'Furniture', icon: '🛋️' },
    { value: 'Clothing', label: 'Clothing', icon: '👕' },
    { value: 'Other', label: 'Other', icon: '📦' }
  ];

  if (loading) {
    return <div className="loading">✨ Loading amazing products...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="shop-page">
      {/* Shop Header */}
      <div className="shop-header">
        <div className="shop-welcome">
          <h1>Welcome back, {currentUser?.name || 'Shopper'}! 👋</h1>
          <p>Discover amazing products tailored just for you</p>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="shop-controls">
        <input
          type="text"
          placeholder="🔍 Search for products..."
          className="search-bar-large"
          value={search}
          onChange={handleSearch}
        />
        
        <div className="category-filters">
          {categories.map((cat) => (
            <button
              key={cat.value}
              className={`filter-btn ${selectedCategory === cat.value ? 'active' : ''}`}
              onClick={() => handleCategoryChange(cat.value)}
            >
              <span className="filter-icon">{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      {products.length === 0 ? (
        <div className="no-products">
          <div className="no-products-icon">🔍</div>
          <h3>No products found</h3>
          <p>Try adjusting your search or filters</p>
        </div>
      ) : (
        <>
          <div className="shop-products-grid">
            {products.map((product) => (
              <div key={product._id} className="shop-product-card">
                <div className="product-image-placeholder">
                  <span className="product-emoji">
                    {product.category === 'Books' ? '📚' :
                     product.category === 'Electronics' ? '💻' :
                     product.category === 'Furniture' ? '🛋️' :
                     product.category === 'Clothing' ? '👕' : '📦'}
                  </span>
                </div>
                
                {product.category && (
                  <span className="category">{product.category}</span>
                )}
                
                <h3 className="product-title">{product.title}</h3>
                
                <div className="price">${product.price.toFixed(2)}</div>
                
                {product.description && (
                  <p className="description">
                    {product.description.substring(0, 80)}
                    {product.description.length > 80 && '...'}
                  </p>
                )}
                
                {product.seller && (
                  <p className="seller">👤 {product.seller.name}</p>
                )}
                
                <button 
                  className="btn-info"
                  onClick={() => setSelectedProduct(product)}
                >
                  ℹ️ View Details
                </button>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pagination">
              <button 
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                ← Previous
              </button>
              <span className="page-info">
                Page {page} of {totalPages}
              </span>
              <button 
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
              >
                Next →
              </button>
            </div>
          )}
        </>
      )}

      {/* Product Details Modal */}
      {selectedProduct && (
        <ProductDetailsModal 
          product={selectedProduct}
          currentUser={currentUser}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}

export default Shop;

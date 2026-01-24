import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Discover Amazing Products
            <br />
            <span className="hero-gradient">At Unbeatable Prices</span>
          </h1>
          <p className="hero-subtitle">
            Your one-stop destination for quality products, fast shipping, and incredible deals.
            Shop with confidence and style!
          </p>
          <div className="hero-buttons">
            <button 
              className="btn-hero-primary" 
              onClick={() => navigate('/register')}
            >
              🚀 Start Shopping Now
            </button>
            <button 
              className="btn-hero-secondary" 
              onClick={() => navigate('/login')}
            >
              Already a member? Login
            </button>
          </div>
          
          {/* Stats */}
          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-number">10K+</div>
              <div className="stat-label">Products</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">50K+</div>
              <div className="stat-label">Happy Customers</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">99%</div>
              <div className="stat-label">Satisfaction</div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="hero-decoration">
          <div className="floating-card card-1">
            <span className="emoji">📱</span>
            <span>Electronics</span>
          </div>
          <div className="floating-card card-2">
            <span className="emoji">👗</span>
            <span>Fashion</span>
          </div>
          <div className="floating-card card-3">
            <span className="emoji">🏠</span>
            <span>Home & Living</span>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2 className="section-title">Why Shop With Us?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🚚</div>
            <h3>Fast Delivery</h3>
            <p>Get your orders delivered quickly with our express shipping options</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>Secure Payment</h3>
            <p>Shop with confidence using our secure payment gateway</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💎</div>
            <h3>Premium Quality</h3>
            <p>All products are verified for quality and authenticity</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🎁</div>
            <h3>Great Deals</h3>
            <p>Enjoy exclusive discounts and special offers daily</p>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <h2 className="section-title">Shop by Category</h2>
        <div className="categories-grid">
          <div 
            className="category-card" 
            onClick={() => navigate('/register')}
          >
            <div className="category-icon">📚</div>
            <h3>Books & Media</h3>
            <p>Bestsellers, eBooks, and more</p>
          </div>
          <div 
            className="category-card"
            onClick={() => navigate('/register')}
          >
            <div className="category-icon">💻</div>
            <h3>Electronics</h3>
            <p>Latest gadgets and tech</p>
          </div>
          <div 
            className="category-card"
            onClick={() => navigate('/register')}
          >
            <div className="category-icon">👕</div>
            <h3>Fashion</h3>
            <p>Trending styles for everyone</p>
          </div>
          <div 
            className="category-card"
            onClick={() => navigate('/register')}
          >
            <div className="category-icon">🏠</div>
            <h3>Home & Living</h3>
            <p>Beautiful home essentials</p>
          </div>
          <div 
            className="category-card"
            onClick={() => navigate('/register')}
          >
            <div className="category-icon">⚽</div>
            <h3>Sports & Fitness</h3>
            <p>Stay active and healthy</p>
          </div>
          <div 
            className="category-card"
            onClick={() => navigate('/register')}
          >
            <div className="category-icon">🎨</div>
            <h3>Arts & Crafts</h3>
            <p>Creative supplies and tools</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Start Shopping?</h2>
          <p>Join thousands of happy customers and discover amazing deals today!</p>
          <button 
            className="btn-cta"
            onClick={() => navigate('/register')}
          >
            Create Your Account - It's Free! 🎉
          </button>
        </div>
      </section>
    </div>
  );
}

export default Home;

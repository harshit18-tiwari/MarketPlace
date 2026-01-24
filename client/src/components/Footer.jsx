function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-section">
          <h3>🛒 Student Marketplace</h3>
          <p>Your trusted platform for buying and selling student essentials</p>
        </div>
        
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/products">Browse Products</a></li>
            <li><a href="/register">Get Started</a></li>
            <li><a href="/login">Login</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Categories</h4>
          <ul>
            <li>📚 Books & Textbooks</li>
            <li>💻 Electronics</li>
            <li>🛋️ Furniture</li>
            <li>👕 Clothing</li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Connect</h4>
          <div className="footer-social">
            <span>📧 support@studentmarketplace.com</span>
            <span>📱 Follow us on social media</span>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="container">
          <p>&copy; 2026 Student Marketplace. All rights reserved.</p>
          <p>Made with ❤️ for students</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

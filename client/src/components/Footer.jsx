function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-section">
          <h3>🛒 ShopHub</h3>
          <p>Your trusted e-commerce destination for quality products and amazing deals</p>
        </div>
        
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/shop">Shop Now</a></li>
            <li><a href="/register">Create Account</a></li>
            <li><a href="/login">Sign In</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Categories</h4>
          <ul>
            <li>📚 Books & Media</li>
            <li>💻 Electronics</li>
            <li>👕 Fashion</li>
            <li>🏠 Home & Living</li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Connect</h4>
          <div className="footer-social">
            <span>📧 support@shophub.com</span>
            <span>📱 Follow us on social media</span>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="container">
          <p>&copy; 2026 ShopHub. All rights reserved.</p>
          <p>Made with ❤️ for shoppers worldwide</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

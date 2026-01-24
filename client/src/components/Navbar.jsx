import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../api';

function Navbar({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setUser(null);
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="container navbar-content">
        <h1 onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>🛒 Student Marketplace</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <Link to="/products">Products</Link>
          {user ? (
            <>
              {(user.role === 'seller' || user.role === 'admin') && (
                <Link to="/products/create">Sell Product</Link>
              )}
              <Link to="/orders">My Orders</Link>
              <span style={{ color: '#fff', padding: '0 0.5rem', borderLeft: '2px solid rgba(255,255,255,0.3)', paddingLeft: '1.5rem' }}>
                Welcome, {user.name}
              </span>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

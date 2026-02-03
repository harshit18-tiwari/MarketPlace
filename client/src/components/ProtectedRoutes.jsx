import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// Loading component
const LoadingScreen = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
    <div className="text-center">
      <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary-600 mx-auto mb-4"></div>
      <p className="text-xl font-semibold text-gray-700">Loading...</p>
    </div>
  </div>
);

// Protected route - requires authentication
export const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <LoadingScreen />;
  
  return user ? children : <Navigate to="/login" replace />;
};

// Buyer only route - blocks sellers
export const BuyerRoute = ({ children }) => {
  const { user, loading, isBuyer } = useAuth();

  if (loading) return <LoadingScreen />;
  
  if (!user) return <Navigate to="/login" replace />;
  
  // Redirect sellers to their dashboard
  if (!isBuyer()) return <Navigate to="/seller/dashboard" replace />;
  
  return children;
};

// Seller only route - blocks buyers
export const SellerRoute = ({ children }) => {
  const { user, loading, isSeller } = useAuth();

  if (loading) return <LoadingScreen />;
  
  if (!user) return <Navigate to="/login" replace />;
  
  // Redirect buyers to shop
  if (!isSeller()) return <Navigate to="/shop" replace />;
  
  return children;
};

// Admin only route
export const AdminRoute = ({ children }) => {
  const { user, loading, isAdmin } = useAuth();

  if (loading) return <LoadingScreen />;
  
  if (!user) return <Navigate to="/login" replace />;
  
  if (!isAdmin()) return <Navigate to="/" replace />;
  
  return children;
};

// Public only route - redirects authenticated users
export const PublicRoute = ({ children }) => {
  const { user, loading, isBuyer } = useAuth();

  if (loading) return <LoadingScreen />;
  
  if (user) {
    // Redirect based on role
    return <Navigate to={isBuyer() ? "/shop" : "/seller/dashboard"} replace />;
  }
  
  return children;
};

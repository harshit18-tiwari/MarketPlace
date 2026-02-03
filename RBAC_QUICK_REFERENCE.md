# 🔐 RBAC Quick Reference

## Frontend Usage

### Using Auth Context
```javascript
import { useAuth } from '../contexts/AuthContext';

function MyComponent() {
  const { user, isBuyer, isSeller, logout } = useAuth();
  
  return (
    <div>
      {isBuyer() && <BuyerFeature />}
      {isSeller() && <SellerFeature />}
    </div>
  );
}
```

### Creating Protected Routes
```javascript
// Buyer only
<Route path="/shop" element={<BuyerRoute><Shop /></BuyerRoute>} />

// Seller only
<Route path="/seller/dashboard" element={<SellerRoute><Dashboard /></SellerRoute>} />

// Any authenticated user
<Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
```

## Backend Usage

### Protecting Routes
```javascript
import { protect, authorize } from '../middleware/authMiddleware.js';

// Any authenticated user
router.get("/products", protect, getProducts);

// Buyer only
router.post("/orders", protect, authorize("buyer"), createOrder);

// Seller/Admin only
router.post("/products", protect, authorize("seller", "admin"), createProduct);

// Admin only
router.delete("/users/:id", protect, authorize("admin"), deleteUser);
```

### Using RBAC Helpers
```javascript
import { isBuyer, isSeller, buyerOnly } from '../middleware/rbacMiddleware.js';

// In controller
export const someController = (req, res) => {
  if (isBuyer(req.user)) {
    // Buyer-specific logic
  }
};

// As middleware
router.post("/checkout", protect, buyerOnly, checkoutController);
```

## Role Access Matrix

| Feature | Buyer | Seller | Admin |
|---------|-------|--------|-------|
| Browse Products | ✅ | ✅ | ✅ |
| View Product Details | ✅ | ✅ | ✅ |
| Add to Cart | ✅ | ❌ | ❌ |
| Place Orders | ✅ | ❌ | ❌ |
| View My Orders | ✅ | ❌ | ✅ |
| Create Products | ❌ | ✅ | ✅ |
| Manage Products | ❌ | ✅ (own) | ✅ (all) |
| View Seller Dashboard | ❌ | ✅ | ✅ |
| View All Orders | ❌ | ❌ | ✅ |
| Update Order Status | ❌ | ❌ | ✅ |

## Quick Setup Checklist

### Frontend
- [ ] Wrap App in AuthProvider
- [ ] Import and use route guards (BuyerRoute, SellerRoute)
- [ ] Update Navbar with role-aware navigation
- [ ] Update Login/Register to use AuthContext
- [ ] Create seller-specific pages

### Backend
- [ ] Add authorize middleware to routes
- [ ] Implement role validation in controllers
- [ ] Test API endpoints with different roles
- [ ] Document protected endpoints

## Common Patterns

### Conditional Rendering
```javascript
const { isBuyer, isSeller } = useAuth();

return (
  <>
    {isBuyer() && <CartIcon />}
    {isSeller() && <AddProductButton />}
  </>
);
```

### Role-based Redirects
```javascript
const { user } = useAuth();
const navigate = useNavigate();

useEffect(() => {
  if (user?.role === 'seller') {
    navigate('/seller/dashboard');
  } else {
    navigate('/shop');
  }
}, [user]);
```

### API Error Handling
```javascript
try {
  await createOrder(orderData);
} catch (error) {
  if (error.response?.status === 403) {
    alert('You do not have permission to perform this action');
  }
}
```

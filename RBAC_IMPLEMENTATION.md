# Role-Based Access Control (RBAC) Implementation Guide

## 🎯 Overview

This e-commerce platform implements a comprehensive **Role-Based Access Control (RBAC)** system that separates buyer and seller functionalities, ensuring secure and appropriate access to different parts of the application.

## 👥 User Roles

### 1. **Buyer** (Default Role)
- Can browse and search products
- Can add products to cart
- Can place orders and make purchases
- Can view order history
- **Cannot** create or manage products
- **Cannot** access seller dashboard

### 2. **Seller**
- Can create and manage products
- Can view product inventory
- Can see orders containing their products
- **Cannot** place orders or purchase products
- **Cannot** add items to cart
- Access to seller-specific dashboard

### 3. **Admin** (Inherits Seller Privileges)
- All seller capabilities
- Can manage all orders
- Can update order statuses
- System-wide management access

---

## 🔐 Frontend Implementation

### 1. **Auth Context** (`client/src/contexts/AuthContext.jsx`)

Centralized authentication and role management:

```javascript
import { useAuth } from './contexts/AuthContext';

const { user, login, logout, isBuyer, isSeller, isAdmin } = useAuth();
```

**Available Methods:**
- `user` - Current user object
- `loading` - Authentication loading state
- `login(userData)` - Set authenticated user
- `logout()` - Clear authentication
- `isBuyer()` - Check if user is a buyer
- `isSeller()` - Check if user is seller/admin
- `isAdmin()` - Check if user is admin
- `isAuthenticated` - Boolean authentication status

### 2. **Protected Route Components** (`client/src/components/ProtectedRoutes.jsx`)

#### Route Guards:

**PublicRoute** - For login/register pages
- Redirects authenticated users based on role
- Buyers → `/shop`
- Sellers → `/seller/dashboard`

**BuyerRoute** - Buyer-only access
- Requires authentication
- Blocks sellers (redirects to `/seller/dashboard`)
- Used for: `/shop`, `/cart`, `/rent`, `/orders`

**SellerRoute** - Seller-only access
- Requires authentication
- Blocks buyers (redirects to `/shop`)
- Used for: `/seller/dashboard`, `/seller/products`, `/seller/orders`

**ProtectedRoute** - Any authenticated user
- Used for shared resources like `/profile`, `/product/:id`

### 3. **Route Structure** (`client/src/App.jsx`)

```javascript
{/* Buyer-Only Routes */}
<Route path="/shop" element={<BuyerRoute><Shop /></BuyerRoute>} />
<Route path="/cart" element={<BuyerRoute><Cart /></BuyerRoute>} />
<Route path="/orders" element={<BuyerRoute><MyOrders /></BuyerRoute>} />

{/* Seller-Only Routes */}
<Route path="/seller/dashboard" element={<SellerRoute><SellerDashboard /></SellerRoute>} />
<Route path="/seller/products" element={<SellerRoute><SellerProducts /></SellerRoute>} />
<Route path="/seller/orders" element={<SellerRoute><SellerOrders /></SellerRoute>} />
```

### 4. **Navbar Role Awareness** (`client/src/components/Navbar.jsx`)

Dynamic navigation based on user role:

**Buyer Navigation:**
- Shop
- Rent
- Cart (with item count)

**Seller Navigation:**
- Dashboard
- Products
- Orders
- Add Product

---

## 🛡️ Backend Implementation

### 1. **Authentication Middleware** (`server/src/middleware/authMiddleware.js`)

**protect** - Verify JWT token
```javascript
router.get("/orders", protect, getOrders);
```

**authorize(...roles)** - Role-based authorization
```javascript
router.post("/products", protect, authorize("seller", "admin"), createProduct);
```

### 2. **RBAC Middleware** (`server/src/middleware/rbacMiddleware.js`)

Helper functions and middleware for role checking:

```javascript
// Check functions
isBuyer(user)      // Returns true if buyer
isSeller(user)     // Returns true if seller or admin
isAdmin(user)      // Returns true if admin

// Middleware
buyerOnly          // Allows only buyers
sellerOnly         // Allows only sellers/admins
adminOnly          // Allows only admins
```

### 3. **Protected Routes**

#### **Order Routes** (`server/src/routes/orderRoutes.js`)

```javascript
// Buyer-only - sellers cannot place orders
router.post("/", protect, authorize("buyer"), createOrder);
router.get("/my", protect, authorize("buyer"), getMyOrders);

// Payment routes - buyer only
router.post("/razorpay/create", protect, authorize("buyer"), createRazorpayOrder);
router.post("/razorpay/verify", protect, authorize("buyer"), verifyRazorpayPayment);

// Admin-only
router.get("/", protect, authorize("admin"), getAllOrders);
router.put("/:id/status", protect, authorize("admin"), updateOrderStatus);
```

#### **Product Routes** (`server/src/routes/productRoutes.js`)

```javascript
// Public access
router.get("/", getProducts);
router.get("/:id", getProductById);

// Seller/Admin only - create/manage products
router.post("/", protect, authorize("seller", "admin"), createProduct);
router.put("/:id", protect, updateProduct);
router.delete("/:id", protect, deleteProduct);
```

### 4. **Controller-Level Validation** (`server/src/controllers/orderController.js`)

Double-check in createOrder:
```javascript
export const createOrder = async (req, res) => {
  // Additional role check - sellers cannot place orders
  if (req.user.role === 'seller' || req.user.role === 'admin') {
    return res.status(403).json({ 
      message: "Sellers cannot place orders. Only buyers can purchase products." 
    });
  }
  // ... rest of the logic
}
```

---

## 🚀 User Flow Examples

### Buyer Journey
1. Register/Login as buyer
2. Redirected to `/shop`
3. Browse products, add to cart
4. Checkout and place order
5. View order history at `/orders`

### Seller Journey
1. Register/Login as seller
2. Redirected to `/seller/dashboard`
3. Create products at `/seller/products/create`
4. Manage inventory at `/seller/products`
5. View incoming orders at `/seller/orders`

### Attempted Cross-Role Access
- **Seller tries to access `/shop`** → Redirected to `/seller/dashboard`
- **Buyer tries to access `/seller/dashboard`** → Redirected to `/shop`
- **Seller tries to POST to `/api/orders`** → 403 Forbidden Error
- **Buyer tries to POST to `/api/products`** → 403 Forbidden Error

---

## 🔧 Testing RBAC

### Frontend Testing
1. **As Buyer:**
   - Register with role: "buyer"
   - Verify access to /shop, /cart, /orders
   - Verify redirect from /seller/* routes

2. **As Seller:**
   - Register with role: "seller"
   - Verify access to /seller/dashboard, /seller/products
   - Verify redirect from /shop, /cart

### Backend Testing (Using Postman/Thunder Client)

```bash
# Login as buyer
POST /api/auth/login
{ "email": "buyer@test.com", "password": "123456" }

# Try to create order (should succeed)
POST /api/orders
Authorization: Bearer <buyer_token>
{ "items": [...] }

# Try to create product (should fail with 403)
POST /api/products
Authorization: Bearer <buyer_token>
{ "name": "Product", ... }

# Login as seller
POST /api/auth/login
{ "email": "seller@test.com", "password": "123456" }

# Try to create product (should succeed)
POST /api/products
Authorization: Bearer <seller_token>
{ "name": "Product", ... }

# Try to create order (should fail with 403)
POST /api/orders
Authorization: Bearer <seller_token>
{ "items": [...] }
```

---

## 📝 Best Practices Implemented

### ✅ Security
- **Defense in Depth**: Both frontend and backend validation
- **JWT-based Authentication**: Secure token management
- **Route Guards**: Prevent unauthorized navigation
- **API Authorization**: Middleware-level role checking
- **Controller Validation**: Additional safety layer

### ✅ User Experience
- **Automatic Redirects**: Role-appropriate landing pages
- **Loading States**: Smooth authentication checks
- **Role-aware UI**: Dynamic navigation based on role
- **Clear Error Messages**: User-friendly feedback

### ✅ Maintainability
- **Centralized Auth Logic**: Single source of truth
- **Reusable Components**: DRY route guards
- **Consistent Patterns**: Same approach across app
- **Well-documented**: Clear comments and structure

### ✅ Scalability
- **Easy Role Addition**: Add new roles in one place
- **Permission System**: Fine-grained control
- **Middleware Chain**: Composable authorization
- **Separation of Concerns**: Clean architecture

---

## 🎓 Resume-Worthy Achievement

> **"Implemented comprehensive Role-Based Access Control (RBAC) system with protected routes and backend authorization middleware, preventing unauthorized actions across buyer and seller roles while maintaining seamless user experience through context-based state management and automatic role-aware redirects."**

### Key Technical Skills Demonstrated:
- React Context API for state management
- Custom route guards and higher-order components
- JWT authentication and authorization
- Express.js middleware patterns
- Security best practices (defense in depth)
- Full-stack role management
- RESTful API design with authorization
- User experience optimization

---

## 📚 Additional Resources

### Files Created/Modified:
- `client/src/contexts/AuthContext.jsx` - Auth state management
- `client/src/components/ProtectedRoutes.jsx` - Route guards
- `client/src/App.jsx` - RBAC-enabled routing
- `client/src/pages/SellerDashboard.jsx` - Seller dashboard
- `client/src/pages/SellerProducts.jsx` - Product management
- `client/src/pages/SellerOrders.jsx` - Order management
- `server/src/middleware/rbacMiddleware.js` - RBAC helpers
- `server/src/routes/orderRoutes.js` - Protected order routes
- `server/src/controllers/orderController.js` - Order validation

### Related Concepts:
- Authentication vs Authorization
- Token-based authentication
- Protected routes in React
- Express middleware patterns
- RESTful API security
- User role hierarchies

---

## 🐛 Troubleshooting

**Issue:** User stuck in redirect loop
- **Solution:** Check loading state handling in route guards

**Issue:** 403 errors when trying to access allowed routes
- **Solution:** Verify token is valid and role is correctly set

**Issue:** Navbar showing wrong links
- **Solution:** Ensure AuthContext is properly wrapped around App

**Issue:** Backend still allowing unauthorized actions
- **Solution:** Verify middleware order (protect before authorize)

---

## ✨ Future Enhancements

1. **Permission Granularity**: Add permission-based access (e.g., read, write, delete)
2. **Role Management UI**: Admin panel to assign/modify roles
3. **Audit Logging**: Track who accessed what and when
4. **Session Management**: Active session monitoring
5. **Two-Factor Authentication**: Enhanced security
6. **Rate Limiting**: Per-role API rate limits

---

**Built with ❤️ using MERN Stack + RBAC**

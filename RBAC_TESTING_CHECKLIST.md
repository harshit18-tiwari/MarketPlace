# 🧪 RBAC Testing Checklist

## Pre-Testing Setup

- [ ] Both client and server are running
- [ ] Database connection is active
- [ ] You have created both buyer and seller test accounts

## 1️⃣ Registration & Login Tests

### Buyer Registration
- [ ] Register new user with role "buyer"
- [ ] Verify redirect to `/shop` after registration
- [ ] Check user data stored correctly in localStorage
- [ ] Verify JWT token is present

### Seller Registration
- [ ] Register new user with role "seller"
- [ ] Verify redirect to `/seller/dashboard` after registration
- [ ] Check user data stored correctly in localStorage
- [ ] Verify JWT token is present

### Login Flow
- [ ] Login as buyer → redirects to `/shop`
- [ ] Login as seller → redirects to `/seller/dashboard`
- [ ] Invalid credentials show error message
- [ ] Token persists across page refreshes

## 2️⃣ Buyer Route Access Tests

### ✅ Should Have Access
- [ ] `/shop` - Browse products
- [ ] `/cart` - View shopping cart
- [ ] `/orders` - View order history
- [ ] `/rent` - Rent products
- [ ] `/profile` - User profile
- [ ] `/product/:id` - Product details

### ❌ Should Be Blocked
- [ ] `/seller/dashboard` → Redirects to `/shop`
- [ ] `/seller/products` → Redirects to `/shop`
- [ ] `/seller/orders` → Redirects to `/shop`
- [ ] `/seller/products/create` → Redirects to `/shop`

### UI Verification
- [ ] Navbar shows: Shop, Rent links
- [ ] Cart icon is visible with item count
- [ ] Profile dropdown shows "My Orders"
- [ ] No seller-specific links visible

## 3️⃣ Seller Route Access Tests

### ✅ Should Have Access
- [ ] `/seller/dashboard` - Dashboard with stats
- [ ] `/seller/products` - Product management
- [ ] `/seller/orders` - Order management
- [ ] `/seller/products/create` - Add new product
- [ ] `/profile` - User profile
- [ ] `/product/:id` - Product details (read-only)

### ❌ Should Be Blocked
- [ ] `/shop` → Redirects to `/seller/dashboard`
- [ ] `/cart` → Redirects to `/seller/dashboard`
- [ ] `/orders` → Redirects to `/seller/dashboard`
- [ ] `/rent` → Redirects to `/seller/dashboard`

### UI Verification
- [ ] Navbar shows: Dashboard, Products, Orders, Add Product
- [ ] Cart icon is NOT visible
- [ ] Profile dropdown shows "Dashboard"
- [ ] No buyer-specific links visible

## 4️⃣ Buyer API Tests

### ✅ Allowed Endpoints
```bash
# Get products
GET /api/products
Status: 200 ✅

# View product details
GET /api/products/:id
Status: 200 ✅

# Create order
POST /api/orders
Headers: { Authorization: Bearer <buyer_token> }
Body: { items: [...] }
Status: 201 ✅

# View my orders
GET /api/orders/my
Headers: { Authorization: Bearer <buyer_token> }
Status: 200 ✅

# Create Razorpay order
POST /api/orders/razorpay/create
Headers: { Authorization: Bearer <buyer_token> }
Status: 200 ✅
```

### ❌ Blocked Endpoints
```bash
# Create product - Should fail
POST /api/products
Headers: { Authorization: Bearer <buyer_token> }
Body: { name: "Test", price: 100, ... }
Expected: 403 Forbidden ❌

# Update product - Should fail
PUT /api/products/:id
Headers: { Authorization: Bearer <buyer_token> }
Expected: 403 Forbidden ❌

# Delete product - Should fail
DELETE /api/products/:id
Headers: { Authorization: Bearer <buyer_token> }
Expected: 403 Forbidden ❌
```

## 5️⃣ Seller API Tests

### ✅ Allowed Endpoints
```bash
# Get products
GET /api/products
Status: 200 ✅

# View product details
GET /api/products/:id
Status: 200 ✅

# Create product
POST /api/products
Headers: { Authorization: Bearer <seller_token> }
Body: { name: "Test", price: 100, category: "Electronics", ... }
Status: 201 ✅

# Update own product
PUT /api/products/:id
Headers: { Authorization: Bearer <seller_token> }
Status: 200 ✅

# Delete own product
DELETE /api/products/:id
Headers: { Authorization: Bearer <seller_token> }
Status: 200 ✅

# View seller's orders
GET /api/orders
Headers: { Authorization: Bearer <seller_token> }
Status: 200 ✅ (filtered to seller's products)
```

### ❌ Blocked Endpoints
```bash
# Create order - Should fail
POST /api/orders
Headers: { Authorization: Bearer <seller_token> }
Body: { items: [...] }
Expected: 403 Forbidden ❌
Error: "Sellers cannot place orders. Only buyers can purchase products."

# View buyer orders - Should fail
GET /api/orders/my
Headers: { Authorization: Bearer <seller_token> }
Expected: 403 Forbidden ❌

# Create Razorpay order - Should fail
POST /api/orders/razorpay/create
Headers: { Authorization: Bearer <seller_token> }
Expected: 403 Forbidden ❌
```

## 6️⃣ Seller Dashboard Tests

### Dashboard Stats
- [ ] Shows total products count
- [ ] Shows total orders count
- [ ] Shows total revenue
- [ ] Shows pending orders count
- [ ] Recent products list displays correctly
- [ ] Recent orders list displays correctly

### Product Management
- [ ] Can view all seller's products
- [ ] Search functionality works
- [ ] Category filter works
- [ ] Can navigate to add product page
- [ ] Can edit existing product
- [ ] Can delete product (with confirmation)
- [ ] View product details

### Order Management
- [ ] Shows orders containing seller's products
- [ ] Status filter works (pending, processing, shipped, etc.)
- [ ] Displays customer information
- [ ] Shows shipping address
- [ ] Calculates seller's revenue correctly

## 7️⃣ Authentication Persistence

### Page Refresh Tests
- [ ] Refresh on `/shop` as buyer → Stays on `/shop`
- [ ] Refresh on `/seller/dashboard` as seller → Stays on `/seller/dashboard`
- [ ] Refresh on `/cart` as buyer → Stays on `/cart`
- [ ] Refresh on `/seller/products` as seller → Stays on `/seller/products`

### Logout Tests
- [ ] Logout clears user data from localStorage
- [ ] Logout clears JWT token
- [ ] After logout, redirects to home page
- [ ] Cannot access protected routes after logout

## 8️⃣ Edge Cases

### Direct URL Access
- [ ] Buyer types `/seller/dashboard` directly → Redirects to `/shop`
- [ ] Seller types `/shop` directly → Redirects to `/seller/dashboard`
- [ ] Non-authenticated user types `/shop` → Redirects to `/login`
- [ ] Non-authenticated user types `/seller/dashboard` → Redirects to `/login`

### Browser Back Button
- [ ] After login, clicking back doesn't break auth state
- [ ] After logout, clicking back doesn't restore session
- [ ] Navigation history respects role-based redirects

### Multiple Tabs
- [ ] Login in one tab reflects in other tabs
- [ ] Logout in one tab affects all tabs
- [ ] Role changes sync across tabs

### Token Expiration
- [ ] Expired token redirects to login
- [ ] Error message is shown
- [ ] Can login again successfully

## 9️⃣ Error Handling

### User-Friendly Messages
- [ ] 403 errors show "Access denied" message
- [ ] 401 errors show "Please login" message
- [ ] Network errors show appropriate message
- [ ] Loading states during API calls

### Console Errors
- [ ] No console errors during normal operation
- [ ] No React warnings
- [ ] No memory leaks

## 🔟 Production Readiness

### Performance
- [ ] Route transitions are smooth
- [ ] No unnecessary re-renders
- [ ] API calls are optimized
- [ ] Images load properly

### Security
- [ ] Passwords are not visible in network tab
- [ ] JWT tokens are stored securely
- [ ] No sensitive data in console
- [ ] HTTPS recommended for production

### Code Quality
- [ ] No linting errors
- [ ] Code is well-commented
- [ ] Consistent naming conventions
- [ ] No unused imports/variables

## ✅ Test Results Summary

**Total Tests:** ___ / ___
**Passed:** ___
**Failed:** ___
**Blocked (Expected):** ___

### Issues Found:
1. 
2. 
3. 

### Notes:
- 
- 
- 

---

## 🚀 Quick Test Script

Run this in your browser console after logging in:

```javascript
// Check current auth state
const user = JSON.parse(localStorage.getItem('user'));
const token = localStorage.getItem('token');

console.log('User Role:', user?.role);
console.log('User Name:', user?.name);
console.log('Token exists:', !!token);
console.log('Current Path:', window.location.pathname);

// Test role-based redirect
console.log('Expected redirect for', user?.role, ':', 
  user?.role === 'buyer' ? '/shop' : '/seller/dashboard'
);
```

---

**Testing completed by:** _______________
**Date:** _______________
**Environment:** Development / Staging / Production

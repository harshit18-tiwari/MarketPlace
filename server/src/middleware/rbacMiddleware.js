/**
 * Role-Based Access Control (RBAC) Middleware
 * Provides comprehensive authorization for different user roles
 */

/**
 * Check if user is a buyer
 * @param {Object} user - User object from req.user
 * @returns {Boolean}
 */
export const isBuyer = (user) => {
  return user && user.role === 'buyer';
};

/**
 * Check if user is a seller
 * @param {Object} user - User object from req.user
 * @returns {Boolean}
 */
export const isSeller = (user) => {
  return user && (user.role === 'seller' || user.role === 'admin');
};

/**
 * Check if user is an admin
 * @param {Object} user - User object from req.user
 * @returns {Boolean}
 */
export const isAdmin = (user) => {
  return user && user.role === 'admin';
};

/**
 * Middleware to ensure user is a buyer
 * Blocks sellers and admins from buyer-only actions
 */
export const buyerOnly = (req, res, next) => {
  if (!isBuyer(req.user)) {
    return res.status(403).json({
      success: false,
      message: 'Access denied. This action is only available to buyers.'
    });
  }
  next();
};

/**
 * Middleware to ensure user is a seller or admin
 * Blocks regular buyers from seller actions
 */
export const sellerOnly = (req, res, next) => {
  if (!isSeller(req.user)) {
    return res.status(403).json({
      success: false,
      message: 'Access denied. This action is only available to sellers.'
    });
  }
  next();
};

/**
 * Middleware to ensure user is an admin
 * Blocks all non-admin users
 */
export const adminOnly = (req, res, next) => {
  if (!isAdmin(req.user)) {
    return res.status(403).json({
      success: false,
      message: 'Access denied. Admin privileges required.'
    });
  }
  next();
};

/**
 * Verify ownership of a resource
 * Checks if the current user owns the resource or is an admin
 * @param {String} resourceUserId - The user ID from the resource
 * @param {Object} currentUser - The current authenticated user
 * @returns {Boolean}
 */
export const isOwnerOrAdmin = (resourceUserId, currentUser) => {
  return (
    currentUser &&
    (currentUser._id.toString() === resourceUserId.toString() || isAdmin(currentUser))
  );
};

import { useState, useEffect } from 'react';
import { formatINR } from '../utils/currency';
import { ShoppingCart, CheckCircle2, Calendar, Clock, IndianRupee, Search, Filter, X, ChevronDown, Sparkles, TrendingUp, Package } from 'lucide-react';

// Dummy rental data
const rentalProducts = [
  {
    id: 1,
    name: 'Canon EOS R5 Camera',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=300&fit=crop',
    pricePerDay: 50,
    pricePerWeek: 300,
    pricePerMonth: 1000,
    category: 'Electronics',
    description: 'Professional mirrorless camera for photography and videography'
  },
  {
    id: 2,
    name: 'Mountain Bike - Trek X-Caliber',
    image: 'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=400&h=300&fit=crop',
    pricePerDay: 25,
    pricePerWeek: 150,
    pricePerMonth: 500,
    category: 'Sports',
    description: 'High-performance mountain bike perfect for trails'
  },
  {
    id: 3,
    name: 'DJI Mavic Air 2 Drone',
    image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=400&h=300&fit=crop',
    pricePerDay: 40,
    pricePerWeek: 250,
    pricePerMonth: 850,
    category: 'Electronics',
    description: 'Professional drone with 4K camera and obstacle avoidance'
  },
  {
    id: 4,
    name: 'Gaming Laptop - ASUS ROG',
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&h=300&fit=crop',
    pricePerDay: 35,
    pricePerWeek: 220,
    pricePerMonth: 750,
    category: 'Electronics',
    description: 'High-end gaming laptop with RTX graphics'
  },
  {
    id: 5,
    name: 'GoPro Hero 11 Black',
    image: 'https://images.unsplash.com/photo-1606041011872-596597976b25?w=400&h=300&fit=crop',
    pricePerDay: 20,
    pricePerWeek: 120,
    pricePerMonth: 400,
    category: 'Electronics',
    description: 'Action camera with 5.3K video and HyperSmooth stabilization'
  },
  {
    id: 6,
    name: 'Electric Scooter - Xiaomi Pro',
    image: 'https://images.unsplash.com/photo-1559311694-ea14e3313f34?w=400&h=300&fit=crop',
    pricePerDay: 15,
    pricePerWeek: 90,
    pricePerMonth: 300,
    category: 'Transportation',
    description: 'Electric scooter with 45km range and foldable design'
  },
  {
    id: 7,
    name: 'Professional DJ Controller',
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400&h=300&fit=crop',
    pricePerDay: 30,
    pricePerWeek: 180,
    pricePerMonth: 600,
    category: 'Audio',
    description: 'Pioneer DDJ-400 DJ controller for events and practice'
  },
  {
    id: 8,
    name: 'DSLR Photography Kit',
    image: 'https://images.unsplash.com/photo-1606244864456-8bee63fce472?w=400&h=300&fit=crop',
    pricePerDay: 45,
    pricePerWeek: 270,
    pricePerMonth: 900,
    category: 'Electronics',
    description: 'Complete photography kit with lenses and accessories'
  },
  {
    id: 9,
    name: 'Camping Tent - 4 Person',
    image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=400&h=300&fit=crop',
    pricePerDay: 12,
    pricePerWeek: 70,
    pricePerMonth: 250,
    category: 'Outdoor',
    description: 'Waterproof camping tent for family adventures'
  }
];

function Rent() {
  const [products] = useState(rentalProducts);
  const [filteredProducts, setFilteredProducts] = useState(rentalProducts);
  const [selectedDurations, setSelectedDurations] = useState({});
  const [selectedDates, setSelectedDates] = useState({});
  const [notification, setNotification] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);

  // Get unique categories
  const categories = ['All', ...new Set(products.map(p => p.category))];

  // Set default durations and dates
  useEffect(() => {
    const initialDurations = {};
    const initialDates = {};
    products.forEach(product => {
      initialDurations[product.id] = 'day';
      initialDates[product.id] = new Date().toISOString().split('T')[0];
    });
    setSelectedDurations(initialDurations);
    setSelectedDates(initialDates);
  }, [products]);

  // Filter and sort products
  useEffect(() => {
    let result = [...products];

    // Search filter
    if (searchQuery) {
      result = result.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== 'All') {
      result = result.filter(product => product.category === selectedCategory);
    }

    // Sort
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.pricePerDay - b.pricePerDay);
        break;
      case 'price-high':
        result.sort((a, b) => b.pricePerDay - a.pricePerDay);
        break;
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        // featured - keep original order
        break;
    }

    setFilteredProducts(result);
  }, [searchQuery, selectedCategory, sortBy, products]);

  const handleDurationChange = (productId, duration) => {
    setSelectedDurations(prev => ({
      ...prev,
      [productId]: duration
    }));
  };

  const handleDateChange = (productId, date) => {
    setSelectedDates(prev => ({
      ...prev,
      [productId]: date
    }));
  };

  const getPriceForDuration = (product, duration) => {
    switch(duration) {
      case 'day':
        return product.pricePerDay;
      case 'week':
        return product.pricePerWeek;
      case 'month':
        return product.pricePerMonth;
      default:
        return product.pricePerDay;
    }
  };

  const addToCart = (product) => {
    const duration = selectedDurations[product.id];
    const startDate = selectedDates[product.id];
    const price = getPriceForDuration(product, duration);

    const cartItem = {
      ...product,
      rentalDuration: duration,
      rentalStartDate: startDate,
      rentalPrice: price,
      type: 'rental',
      cartId: `rental-${product.id}-${Date.now()}`
    };

    // Get existing cart
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    existingCart.push(cartItem);
    localStorage.setItem('cart', JSON.stringify(existingCart));

    // Dispatch event to update cart count
    window.dispatchEvent(new Event('cartUpdated'));

    // Show notification
    setNotification(product.name);
    setTimeout(() => setNotification(null), 3000);
  };

  const getDurationLabel = (duration) => {
    switch(duration) {
      case 'day': return '/ day';
      case 'week': return '/ week';
      case 'month': return '/ month';
      default: return '/ day';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Hero Section */}
        <div className="text-center mb-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-white text-sm font-semibold shadow-lg animate-fade-in-down">
            <Sparkles className="w-4 h-4" />
            <span>Premium Rental Marketplace</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent">
            Rent What You Need
          </h1>
          <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
            Access premium products without the commitment. Flexible durations, trusted quality.
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 mb-8 border border-gray-100">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Filter Button (Mobile) */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl font-semibold transition-colors"
            >
              <Filter className="w-5 h-5" />
              Filters
              <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>

            {/* Category Filter (Desktop) */}
            <div className="hidden md:block">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-6 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer hover:border-blue-300 transition-all"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Sort By (Desktop) */}
            <div className="hidden md:block">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-6 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer hover:border-blue-300 transition-all"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name: A to Z</option>
              </select>
            </div>
          </div>

          {/* Mobile Filters */}
          {showFilters && (
            <div className="md:hidden mt-4 pt-4 border-t border-gray-200 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name">Name: A to Z</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600 font-medium">
            <span className="text-gray-900 font-bold">{filteredProducts.length}</span> {filteredProducts.length === 1 ? 'product' : 'products'} available
          </p>
          {(searchQuery || selectedCategory !== 'All') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="text-blue-600 hover:text-blue-700 font-semibold text-sm flex items-center gap-1"
            >
              <X className="w-4 h-4" />
              Clear filters
            </button>
          )}
        </div>

        {/* Notification */}
        {notification && (
          <div className="fixed top-20 right-4 left-4 md:left-auto md:w-96 bg-white rounded-2xl shadow-2xl border-l-4 border-green-500 p-4 flex items-center gap-3 z-50 animate-fade-in-down">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <p className="text-gray-900 font-semibold">Added to cart!</p>
              <p className="text-gray-600 text-sm">{notification}</p>
            </div>
          </div>
        )}

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product, index) => (
              <div 
                key={product.id} 
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 group"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Product Image */}
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-3 right-3">
                    <div className="bg-white/95 backdrop-blur-sm text-gray-900 px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
                      {product.category}
                    </div>
                  </div>
                  <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      Popular
                    </div>
                  </div>
                </div>

                {/* Product Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>

                  {/* Price Display */}
                  <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-xl p-4 mb-4 border border-blue-100 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-2xl" />
                    <div className="relative">
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                          {formatINR(getPriceForDuration(product, selectedDurations[product.id] || 'day'))}
                        </span>
                        <span className="text-gray-600 font-semibold">
                          {getDurationLabel(selectedDurations[product.id] || 'day')}
                        </span>
                      </div>
                      <div className="mt-1 flex items-center gap-4 text-xs text-gray-500">
                        <span>Week: {formatINR(product.pricePerWeek)}</span>
                        <span>Month: {formatINR(product.pricePerMonth)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Duration Selector */}
                  <div className="mb-4">
                    <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                      <Clock className="w-4 h-4 text-blue-500" />
                      Rental Duration
                    </label>
                    <select 
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all cursor-pointer hover:border-blue-300 hover:bg-gray-100"
                      value={selectedDurations[product.id] || 'day'}
                      onChange={(e) => handleDurationChange(product.id, e.target.value)}
                    >
                      <option value="day">1 Day - {formatINR(product.pricePerDay)}</option>
                      <option value="week">1 Week - {formatINR(product.pricePerWeek)}</option>
                      <option value="month">1 Month - {formatINR(product.pricePerMonth)}</option>
                    </select>
                  </div>

                  {/* Date Picker */}
                  <div className="mb-5">
                    <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                      <Calendar className="w-4 h-4 text-blue-500" />
                      Start Date
                    </label>
                    <input 
                      type="date"
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all cursor-pointer hover:border-blue-300 hover:bg-gray-100"
                      value={selectedDates[product.id] || ''}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={(e) => handleDateChange(product.id, e.target.value)}
                    />
                  </div>

                  {/* Add to Cart Button */}
                  <button 
                    className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-200 active:scale-95"
                    onClick={() => addToCart(product)}
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
              <Package className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search or filters to find what you're looking for
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Rent;

'use client'

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import ApiHealthCheck from "../../components/ApiHealthCheck";

// API Configuration - Use relative URLs for internal API routes
const getApiUrl = (endpoint) => {
  // Always use relative URLs for internal API routes
  return endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
};

export default function Items() {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState([]);
  const [showAnimation, setShowAnimation] = useState(false);

  // Fetch items from API
  const fetchItems = async (category = 'all', search = '') => {
    try {
      setLoading(true);
      
      const params = new URLSearchParams();
      if (category !== 'all') params.append('category', category);
      if (search) params.append('search', search);

      const response = await fetch(getApiUrl(`/api/items?${params}`), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        // Add timeout and error handling
        signal: AbortSignal.timeout(5000), // 5 second timeout
      });
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status} - ${response.statusText}`);
      }
      
      const data = await response.json();
      if (data.success) {
        setItems(data.data);
      } else {
        throw new Error(data.message || 'Failed to fetch items from API');
      }
    } catch (err) {
      console.warn('Failed to fetch items:', err.message);
      // Fallback to mock data if API is not available
      setItems(getMockItems());
    } finally {
      setLoading(false);
    }
  };

  // Fetch categories from API
  const fetchCategories = async () => {
    try {
      const response = await fetch(getApiUrl('/api/categories'), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: AbortSignal.timeout(5000), // 5 second timeout
      });
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status} - ${response.statusText}`);
      }
      
      const data = await response.json();
      if (data.success) {
        setCategories(['all', ...data.data]);
      } else {
        throw new Error(data.message || 'Failed to fetch categories from API');
      }
    } catch (err) {
      console.warn('Failed to fetch categories:', err.message);
      // Fallback categories
      setCategories(['all', 'Coffee & Espresso', 'Specialty Drinks', 'Cold Drinks', 'Pastries', 'Light Meals', 'Sandwiches', 'Wraps']);
    }
  };

  // Mock data fallback
  const getMockItems = () => [
    {
      id: 1,
      name: "Signature Latte",
      description: "Our house blend with steamed milk and vanilla syrup, topped with beautiful latte art",
      price: 4.50,
      category: "Coffee & Espresso",
      image: "https://images.unsplash.com/photo-1561047029-3000c68339ca?w=400&h=300&fit=crop",
      ingredients: ["Espresso", "Steamed Milk", "Vanilla Syrup"],
      calories: 150,
      available: true,
      rating: 4.8
    },
    {
      id: 2,
      name: "Americano",
      description: "Rich, bold espresso shots with hot water for a clean, strong coffee experience",
      price: 3.50,
      category: "Coffee & Espresso",
      image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&h=300&fit=crop",
      ingredients: ["Espresso", "Hot Water"],
      calories: 5,
      available: true,
      rating: 4.6
    },
    {
      id: 3,
      name: "Cappuccino",
      description: "Perfect balance of espresso, steamed milk, and thick foam, dusted with cocoa",
      price: 4.25,
      category: "Coffee & Espresso",
      image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&h=300&fit=crop",
      ingredients: ["Espresso", "Steamed Milk", "Milk Foam", "Cocoa Powder"],
      calories: 120,
      available: true,
      rating: 4.7
    },
    {
      id: 4,
      name: "Caramel Macchiato",
      description: "Vanilla syrup, steamed milk, espresso, and rich caramel drizzle",
      price: 5.25,
      category: "Specialty Drinks",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      ingredients: ["Espresso", "Vanilla Syrup", "Steamed Milk", "Caramel Sauce"],
      calories: 240,
      available: true,
      rating: 4.9
    },
    {
      id: 5,
      name: "Blueberry Muffin",
      description: "Moist, fluffy muffin packed with fresh blueberries and a hint of lemon zest",
      price: 3.75,
      category: "Pastries",
      image: "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=400&h=300&fit=crop",
      ingredients: ["Flour", "Fresh Blueberries", "Sugar", "Eggs", "Lemon Zest"],
      calories: 220,
      available: true,
      rating: 4.7
    },
    {
      id: 6,
      name: "Avocado Toast",
      description: "Smashed avocado on multigrain bread with cherry tomatoes, feta, and herbs",
      price: 7.25,
      category: "Light Meals",
      image: "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=400&h=300&fit=crop",
      ingredients: ["Multigrain Bread", "Avocado", "Cherry Tomatoes", "Feta Cheese", "Herbs"],
      calories: 280,
      available: true,
      rating: 4.6
    }
  ];

  useEffect(() => {
    setShowAnimation(true);
    fetchCategories();
    fetchItems();
  }, []);

  useEffect(() => {
    fetchItems(selectedCategory, searchTerm);
  }, [selectedCategory, searchTerm]);

  const addToCart = (item) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (itemId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(itemId);
    } else {
      setCart(prevCart =>
        prevCart.map(item =>
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  if (loading && items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading delicious items...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className={`bg-white shadow-sm transition-all duration-700 ${
        showAnimation ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <Link href="/" className="text-2xl font-bold text-amber-600 hover:text-amber-700 transition-colors">
                LatteLounge
              </Link>
              <h1 className="mt-2 text-3xl font-bold text-gray-900">Items & Products</h1>
              <p className="text-gray-600">
                🌟 Browse our complete collection and discover amazing items!
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <ApiHealthCheck />
              {cart.length > 0 && (
                <div className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium animate-pulse">
                  {getTotalItems()} items in cart
                </div>
              )}
              <Link 
                href="/" 
                className="bg-amber-600 text-white px-6 py-2 rounded-lg hover:bg-amber-700 transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className={`bg-white border-b transition-all duration-700 ${
        showAnimation ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'
      }`} style={{ transitionDelay: '200ms' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Search */}
            <div className="flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search items..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
              />
            </div>
            
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedCategory === category
                      ? 'bg-amber-600 text-white shadow-lg'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {category === 'all' ? 'All Items' : category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Items Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {items.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No items found</h3>
            <p className="text-gray-600">Try adjusting your search or category filter</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((item, index) => (
              <div
                key={item.id}
                className={`bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 ${
                  showAnimation ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Item Image */}
                <Link href={`/items/${item.id}`} className="block">
                  <div className="relative h-48 bg-gray-200">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      onError={(e) => {
                        // Fallback to a placeholder if image fails to load
                        const target = e.target;
                        target.src = `https://via.placeholder.com/400x300/f59e0b/ffffff?text=${encodeURIComponent(item.name.substring(0, 20))}`;
                      }}
                      onLoadingComplete={(result) => {
                        // Handle successful image load
                        if (result.naturalWidth === 0) {
                          // Image failed to load properly
                          const img = result;
                          img.src = `https://via.placeholder.com/400x300/f59e0b/ffffff?text=${encodeURIComponent(item.name.substring(0, 20))}`;
                        }
                      }}
                    />
                    {item.rating && (
                      <div className="absolute top-2 right-2 bg-white bg-opacity-90 px-2 py-1 rounded-full text-sm font-medium">
                        ⭐ {item.rating}
                      </div>
                    )}
                    {!item.available && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <span className="text-white font-semibold">Out of Stock</span>
                      </div>
                    )}
                  </div>
                </Link>

                {/* Item Details */}
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <Link href={`/items/${item.id}`} className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 line-clamp-1 hover:text-amber-600 transition-colors">{item.name}</h3>
                    </Link>
                    <span className="text-amber-600 font-bold text-lg ml-2">${item.price.toFixed(2)}</span>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>
                  
                  {/* Additional Info */}
                  <div className="space-y-2 mb-4">
                    {item.category && (
                      <div className="flex items-center text-xs text-gray-500">
                        <span className="bg-gray-100 px-2 py-1 rounded-full">{item.category}</span>
                      </div>
                    )}
                    
                    {item.calories && (
                      <div className="flex items-center text-xs text-gray-500">
                        <span>🔥 {item.calories} cal</span>
                      </div>
                    )}
                    
                    {item.ingredients && item.ingredients.length > 0 && (
                      <div className="text-xs text-gray-500">
                        <span className="font-medium">Ingredients:</span> {item.ingredients.slice(0, 3).join(', ')}
                        {item.ingredients.length > 3 && '...'}
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <button
                      onClick={() => addToCart(item)}
                      disabled={!item.available}
                      className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all duration-200 ${
                        item.available
                          ? 'bg-amber-600 text-white hover:bg-amber-700 hover:shadow-lg transform hover:-translate-y-0.5'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {item.available ? 'Add to Cart' : 'Out of Stock'}
                    </button>
                    <Link
                      href={`/items/${item.id}`}
                      className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center justify-center"
                    >
                      Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Cart Summary */}
        {cart.length > 0 && (
          <div className={`mt-12 bg-white rounded-lg shadow-md p-6 transition-all duration-700 ${
            showAnimation ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`} style={{ transitionDelay: '800ms' }}>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Cart Summary</h2>
            
            <div className="space-y-3 mb-4">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between items-center py-2 border-b border-gray-200">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{item.name}</h4>
                    <p className="text-sm text-gray-600">${item.price.toFixed(2)} each</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="bg-gray-200 text-gray-700 w-8 h-8 rounded-full hover:bg-gray-300 transition-colors"
                    >
                      -
                    </button>
                    <span className="font-medium w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="bg-amber-600 text-white w-8 h-8 rounded-full hover:bg-amber-700 transition-colors"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-600 hover:text-red-800 ml-4 transition-colors"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold">Total:</span>
                <span className="text-2xl font-bold text-amber-600">${getTotalPrice()}</span>
              </div>
              <button className="w-full bg-amber-600 text-white py-3 rounded-lg font-semibold hover:bg-amber-700 transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5">
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
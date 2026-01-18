'use client'

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import ApiHealthCheck from "../../../components/ApiHealthCheck";
import Breadcrumb from "../../../components/Breadcrumb";

// API Configuration - Use relative URLs for internal API routes
const getApiUrl = (endpoint) => {
  // Always use relative URLs for internal API routes
  return endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
};

export default function ItemDetails() {
  const params = useParams();
  const router = useRouter();
  const itemId = params.id;
  
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAnimation, setShowAnimation] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [relatedItems, setRelatedItems] = useState([]);

  // Mock data fallback for single item
  const getMockItem = (id) => {
    const mockItems = [
      {
        id: 1,
        name: "Signature Latte",
        description: "Our house blend with steamed milk and vanilla syrup, topped with beautiful latte art. This carefully crafted beverage combines the rich, bold flavors of our premium espresso with the smooth, creamy texture of perfectly steamed milk. The vanilla syrup adds a subtle sweetness that complements the coffee's natural notes, while our skilled baristas create stunning latte art that makes each cup a work of art.",
        price: 4.50,
        category: "Coffee & Espresso",
        image: "https://images.unsplash.com/photo-1561047029-3000c68339ca?w=800&h=600&fit=crop",
        ingredients: ["Premium Espresso Beans", "Steamed Milk", "Vanilla Syrup", "Latte Art"],
        calories: 150,
        available: true,
        rating: 4.8,
        reviews: 127,
        preparationTime: "3-4 minutes",
        allergens: ["Milk"],
        nutritionalInfo: {
          protein: "8g",
          carbs: "18g",
          fat: "6g",
          sugar: "16g",
          caffeine: "150mg"
        },
        brewingMethod: "Espresso machine with steam wand",
        origin: "House blend of Colombian and Ethiopian beans",
        temperature: "Hot (160-170°F)",
        size: "12 oz"
      },
      {
        id: 2,
        name: "Americano",
        description: "Rich, bold espresso shots with hot water for a clean, strong coffee experience. This classic coffee drink showcases the pure essence of our premium espresso beans, diluted with hot water to create a smooth, full-bodied beverage that coffee purists love. Perfect for those who appreciate the unadulterated taste of quality coffee without any additions.",
        price: 3.50,
        category: "Coffee & Espresso",
        image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&h=600&fit=crop",
        ingredients: ["Premium Espresso Beans", "Hot Water"],
        calories: 5,
        available: true,
        rating: 4.6,
        reviews: 89,
        preparationTime: "2-3 minutes",
        allergens: [],
        nutritionalInfo: {
          protein: "0g",
          carbs: "1g",
          fat: "0g",
          sugar: "0g",
          caffeine: "225mg"
        },
        brewingMethod: "Double espresso shot with hot water",
        origin: "Single-origin Ethiopian beans",
        temperature: "Hot (180-190°F)",
        size: "12 oz"
      }
    ];
    
    return mockItems.find(item => item.id === parseInt(id)) || mockItems[0];
  };

  // Fetch single item from API
  const fetchItem = async (id) => {
    try {
      setLoading(true);
      
      const response = await fetch(getApiUrl(`/api/items/${id}`), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: AbortSignal.timeout(5000),
      });
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status} - ${response.statusText}`);
      }
      
      const data = await response.json();
      if (data.success) {
        setItem(data.data);
        // Fetch related items
        fetchRelatedItems(data.data.category);
      } else {
        throw new Error(data.message || 'Failed to fetch item from API');
      }
    } catch (err) {
      console.warn('Failed to fetch item:', err.message);
      const mockItem = getMockItem(id);
      setItem(mockItem);
      setRelatedItems([getMockItem(mockItem.id === 1 ? 2 : 1)]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch related items
  const fetchRelatedItems = async (category) => {
    try {
      const response = await fetch(getApiUrl(`/api/items?category=${encodeURIComponent(category)}`), {
        signal: AbortSignal.timeout(5000),
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          // Filter out current item and limit to 3 related items
          const related = data.data
            .filter(relatedItem => relatedItem.id !== parseInt(itemId))
            .slice(0, 3);
          setRelatedItems(related);
        }
      }
    } catch (err) {
      console.warn('Failed to fetch related items:', err.message);
    }
  };

  useEffect(() => {
    if (itemId) {
      fetchItem(itemId);
      setShowAnimation(true);
    }
  }, [itemId]);

  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleQuantityChange = (change) => {
    setQuantity(Math.max(1, quantity + change));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-amber-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 text-lg">Loading delicious details...</p>
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Item Not Found</h2>
          <p className="text-gray-600 mb-6">The item you're looking for doesn't exist.</p>
          <Link 
            href="/items" 
            className="bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors"
          >
            Back to Items
          </Link>
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link 
                href="/items" 
                className="text-amber-600 hover:text-amber-700 transition-colors"
              >
                ← Back to Items
              </Link>
              <div className="text-gray-300">|</div>
              <Link href="/" className="text-xl font-bold text-amber-600 hover:text-amber-700 transition-colors">
                LatteLounge
              </Link>
            </div>
            <div className="flex items-center space-x-2">
              <ApiHealthCheck />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className={`transition-all duration-500 ${
          showAnimation ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
        }`}>
          <Breadcrumb 
            items={[
              { label: 'Home', href: '/' },
              { label: 'Items', href: '/items' },
              { label: item?.name || 'Item Details' }
            ]}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className={`transition-all duration-700 ${
            showAnimation ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
          }`}>
            <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[500px] bg-gray-200 rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, 50vw"
                onError={(e) => {
                  e.target.src = `https://via.placeholder.com/800x600/f59e0b/ffffff?text=${encodeURIComponent(item.name.substring(0, 20))}`;
                }}
              />
              {!item.available && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <span className="text-white text-xl font-semibold bg-red-600 px-4 py-2 rounded-lg">
                    Out of Stock
                  </span>
                </div>
              )}
              {item.rating && (
                <div className="absolute top-4 right-4 bg-white bg-opacity-95 px-3 py-2 rounded-full shadow-lg">
                  <div className="flex items-center space-x-1">
                    <span className="text-yellow-400 text-lg">⭐</span>
                    <span className="font-semibold">{item.rating}</span>
                    {item.reviews && (
                      <span className="text-gray-500 text-sm">({item.reviews})</span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Product Details */}
          <div className={`transition-all duration-700 delay-200 ${
            showAnimation ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
          }`}>
            <div className="space-y-6">
              {/* Title and Price */}
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium">
                    {item.category}
                  </span>
                  {item.available ? (
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      Available
                    </span>
                  ) : (
                    <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                      Out of Stock
                    </span>
                  )}
                </div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">{item.name}</h1>
                <div className="flex items-center space-x-4">
                  <span className="text-3xl font-bold text-amber-600">${item.price.toFixed(2)}</span>
                  {item.size && (
                    <span className="text-gray-500">• {item.size}</span>
                  )}
                  {item.preparationTime && (
                    <span className="text-gray-500">• {item.preparationTime}</span>
                  )}
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>

              {/* Nutritional Info */}
              {item.nutritionalInfo && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Nutritional Information</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="bg-white p-3 rounded-lg shadow-sm border">
                      <div className="text-2xl font-bold text-amber-600">{item.calories}</div>
                      <div className="text-sm text-gray-500">Calories</div>
                    </div>
                    {Object.entries(item.nutritionalInfo).map(([key, value]) => (
                      <div key={key} className="bg-white p-3 rounded-lg shadow-sm border">
                        <div className="text-lg font-semibold text-gray-900">{value}</div>
                        <div className="text-sm text-gray-500 capitalize">{key}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Ingredients */}
              {item.ingredients && item.ingredients.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Ingredients</h3>
                  <div className="flex flex-wrap gap-2">
                    {item.ingredients.map((ingredient, index) => (
                      <span 
                        key={index}
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                      >
                        {ingredient}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Additional Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {item.origin && (
                  <div className="bg-white p-4 rounded-lg shadow-sm border">
                    <h4 className="font-semibold text-gray-900 mb-1">Origin</h4>
                    <p className="text-gray-600 text-sm">{item.origin}</p>
                  </div>
                )}
                {item.brewingMethod && (
                  <div className="bg-white p-4 rounded-lg shadow-sm border">
                    <h4 className="font-semibold text-gray-900 mb-1">Brewing Method</h4>
                    <p className="text-gray-600 text-sm">{item.brewingMethod}</p>
                  </div>
                )}
                {item.temperature && (
                  <div className="bg-white p-4 rounded-lg shadow-sm border">
                    <h4 className="font-semibold text-gray-900 mb-1">Temperature</h4>
                    <p className="text-gray-600 text-sm">{item.temperature}</p>
                  </div>
                )}
                {item.allergens && item.allergens.length > 0 && (
                  <div className="bg-white p-4 rounded-lg shadow-sm border">
                    <h4 className="font-semibold text-gray-900 mb-1">Allergens</h4>
                    <p className="text-gray-600 text-sm">{item.allergens.join(', ')}</p>
                  </div>
                )}
              </div>

              {/* Add to Cart */}
              <div className="bg-white p-6 rounded-xl shadow-lg border">
                <div className="flex items-center space-x-4 mb-4">
                  <span className="text-gray-700 font-medium">Quantity:</span>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => handleQuantityChange(-1)}
                      className="bg-gray-200 text-gray-700 w-10 h-10 rounded-full hover:bg-gray-300 transition-colors flex items-center justify-center"
                    >
                      -
                    </button>
                    <span className="font-semibold text-lg w-8 text-center">{quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(1)}
                      className="bg-amber-600 text-white w-10 h-10 rounded-full hover:bg-amber-700 transition-colors flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-700">Total:</span>
                  <span className="text-2xl font-bold text-amber-600">
                    ${(item.price * quantity).toFixed(2)}
                  </span>
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={!item.available}
                  className={`w-full py-4 rounded-lg font-semibold text-lg transition-all duration-200 ${
                    item.available
                      ? addedToCart
                        ? 'bg-green-600 text-white'
                        : 'bg-amber-600 text-white hover:bg-amber-700 hover:shadow-lg transform hover:-translate-y-0.5'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {addedToCart ? '✓ Added to Cart!' : item.available ? 'Add to Cart' : 'Out of Stock'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Related Items */}
        {relatedItems.length > 0 && (
          <div className={`mt-16 transition-all duration-700 delay-500 ${
            showAnimation ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">You Might Also Like</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedItems.map((relatedItem, index) => (
                <Link
                  key={relatedItem.id}
                  href={`/items/${relatedItem.id}`}
                  className={`bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 ${
                    showAnimation ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                  }`}
                  style={{ transitionDelay: `${600 + index * 100}ms` }}
                >
                  <div className="relative h-48 bg-gray-200">
                    <Image
                      src={relatedItem.image}
                      alt={relatedItem.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    {relatedItem.rating && (
                      <div className="absolute top-2 right-2 bg-white bg-opacity-90 px-2 py-1 rounded-full text-sm font-medium">
                        ⭐ {relatedItem.rating}
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{relatedItem.name}</h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{relatedItem.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-amber-600 font-bold text-lg">${relatedItem.price.toFixed(2)}</span>
                      <span className="text-amber-600 text-sm font-medium hover:text-amber-700">
                        View Details →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* API Status */}
        {error && (
          <div className={`mt-8 bg-orange-50 border border-orange-200 rounded-lg p-4 transition-all duration-700 delay-700 ${
            showAnimation ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <div className="flex items-center space-x-2">
              <span className="text-orange-600 text-lg">⚠️</span>
              <div>
                <p className="text-orange-800 font-medium">Using Offline Data</p>
                <p className="text-orange-700 text-sm">
                  API server unavailable. Start with: <code className="bg-orange-100 px-1 rounded">npm run server</code>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
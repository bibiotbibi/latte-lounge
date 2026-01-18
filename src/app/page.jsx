"use client";

import Image from "next/image";
import Link from "next/link";
import AuthNavbar from "../components/AuthNavbar";
import { useEffect, useState } from 'react';

// Navbar Component
function Navbar() {
  return <AuthNavbar />;
}

// Hero Section
function HeroSection() {
  return (
    <section 
      id="home" 
      className="relative pt-16 min-h-screen flex items-center overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.3)), url('https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1920&h=1080&fit=crop&crop=center')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating Coffee Beans */}
        <div className="absolute top-20 left-10 text-4xl text-amber-300 opacity-20 animate-bounce" style={{animationDelay: '0s', animationDuration: '3s'}}>☕</div>
        <div className="absolute top-40 right-20 text-3xl text-amber-400 opacity-30 animate-bounce" style={{animationDelay: '1s', animationDuration: '4s'}}>☕</div>
        <div className="absolute bottom-40 left-20 text-2xl text-amber-200 opacity-25 animate-bounce" style={{animationDelay: '2s', animationDuration: '3.5s'}}>☕</div>
        <div className="absolute bottom-20 right-10 text-4xl text-amber-300 opacity-20 animate-bounce" style={{animationDelay: '0.5s', animationDuration: '4.5s'}}>☕</div>
        
        {/* Steam Effects */}
        <div className="absolute top-32 left-1/4 w-2 h-20 bg-gradient-to-t from-transparent to-white opacity-10 animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-28 right-1/3 w-1 h-16 bg-gradient-to-t from-transparent to-white opacity-15 animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white">
            <div className="animate-fadeInUp">
              <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
                Welcome to{' '}
                <span className="text-amber-400 drop-shadow-lg animate-pulse">
                  LatteLounge
                </span>
              </h1>
            </div>
            <div className="animate-fadeInUp" style={{animationDelay: '0.3s'}}>
              <p className="text-xl lg:text-2xl text-gray-200 mb-8 leading-relaxed">
                Experience the perfect blend of premium coffee, cozy atmosphere, and exceptional service. 
                Your daily dose of happiness starts here.
              </p>
            </div>
            <div className="animate-fadeInUp flex flex-col sm:flex-row gap-4" style={{animationDelay: '0.6s'}}>
              <Link 
                href="/items"
                className="bg-amber-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-amber-700 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
              >
                Order Now
              </Link>
              <Link 
                href="/items"
                className="border-2 border-amber-400 text-amber-400 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-amber-400 hover:text-gray-900 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm"
              >
                View Items
              </Link>
            </div>
          </div>

          {/* Right Content - Animated Images */}
          <div className="relative flex justify-center items-center">
            {/* Main Coffee Cup Image */}
            <div className="relative animate-float">
              <div className="relative w-80 h-80 lg:w-96 lg:h-96">
                <Image
                  src="https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=400&fit=crop&crop=center"
                  alt="Premium Coffee Cup"
                  fill
                  className="object-cover rounded-full shadow-2xl border-4 border-amber-400"
                  sizes="(max-width: 768px) 320px, 384px"
                />
                {/* Glow Effect */}
                <div className="absolute inset-0 rounded-full bg-amber-400 opacity-20 blur-xl animate-pulse"></div>
              </div>
            </div>

            {/* Secondary Animated Image - Coffee Beans */}
            <div className="absolute -top-10 -right-10 animate-spin-slow">
              <div className="relative w-32 h-32 lg:w-40 lg:h-40">
                <Image
                  src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=200&h=200&fit=crop&crop=center"
                  alt="Coffee Beans"
                  fill
                  className="object-cover rounded-full shadow-xl border-2 border-amber-300"
                  sizes="(max-width: 768px) 128px, 160px"
                />
                {/* Rotating Border */}
                <div className="absolute inset-0 rounded-full border-2 border-dashed border-amber-300 animate-spin"></div>
              </div>
            </div>

            {/* Third Animated Image - Latte Art */}
            <div className="absolute -bottom-8 -left-8 animate-bounce-slow">
              <div className="relative w-28 h-28 lg:w-36 lg:h-36">
                <Image
                  src="https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=200&h=200&fit=crop&crop=center"
                  alt="Latte Art"
                  fill
                  className="object-cover rounded-full shadow-xl border-2 border-white"
                  sizes="(max-width: 768px) 112px, 144px"
                />
                {/* Pulsing Glow */}
                <div className="absolute inset-0 rounded-full bg-white opacity-30 blur-lg animate-pulse"></div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full">
              {/* Orbiting Dots */}
              <div className="absolute top-0 left-1/2 w-3 h-3 bg-amber-400 rounded-full animate-orbit"></div>
              <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-amber-300 rounded-full animate-orbit-reverse"></div>
              <div className="absolute left-0 top-1/2 w-2 h-2 bg-amber-500 rounded-full animate-orbit-slow"></div>
              <div className="absolute right-0 top-1/2 w-3 h-3 bg-amber-200 rounded-full animate-orbit-reverse-slow"></div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="flex flex-col items-center text-white">
            <span className="text-sm mb-2 opacity-80">Scroll Down</span>
            <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// About Section with Scroll Animation
function AboutSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('about-section');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-amber-50 to-orange-50 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-amber-200 rounded-full opacity-10 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-orange-200 rounded-full opacity-10 animate-bounce-slow"></div>
        <div className="absolute top-1/2 left-1/4 text-6xl text-amber-300 opacity-5 animate-spin-slow">☕</div>
        <div className="absolute top-1/3 right-1/3 text-4xl text-orange-300 opacity-5 animate-float">🫘</div>
      </div>

      <div id="about-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-5xl font-bold text-gray-900 mb-6 relative">
            About LatteLounge
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full"></div>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Founded with a passion for exceptional coffee and community, LatteLounge has been serving 
            the finest brews since 2015. Every cup tells a story of craftsmanship and care.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: "🌱", title: "Sustainable Sourcing", desc: "We partner with ethical farms to bring you the finest, sustainably-sourced coffee beans from around the world.", delay: "0s" },
            { icon: "👨‍🍳", title: "Expert Baristas", desc: "Our skilled baristas craft each cup with precision and passion, ensuring the perfect experience every time.", delay: "0.2s" },
            { icon: "🏠", title: "Cozy Atmosphere", desc: "Relax in our warm, inviting space designed for comfort, productivity, and meaningful connections.", delay: "0.4s" }
          ].map((item, index) => (
            <div 
              key={index}
              className={`group text-center transform transition-all duration-1000 hover:scale-105 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ animationDelay: item.delay }}
            >
              <div className="relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-8 border border-amber-100 group-hover:border-amber-300">
                {/* Floating Icon Container */}
                <div className="relative bg-gradient-to-br from-amber-100 to-orange-100 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-500 shadow-lg">
                  <span className="text-4xl animate-bounce-slow">{item.icon}</span>
                  {/* Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-orange-400 rounded-full opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500"></div>
                </div>
                
                <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-amber-700 transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                  {item.desc}
                </p>
                
                {/* Decorative Bottom Border */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-amber-400 to-orange-400 group-hover:w-full transition-all duration-500 rounded-full"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Coffee Bean Decorations */}
        <div className="flex justify-center mt-16 space-x-4">
          {[...Array(5)].map((_, i) => (
            <div 
              key={i}
              className={`w-3 h-3 bg-amber-400 rounded-full animate-bounce transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
              style={{ animationDelay: `${i * 0.1}s` }}
            ></div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Item Highlights Section with Enhanced Animation
function MenuSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('items-section');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const menuItems = [
    { 
      name: "Signature Latte", 
      price: "$4.50", 
      description: "Our house blend with steamed milk and vanilla", 
      image: "https://images.unsplash.com/photo-1561047029-3000c68339ca?w=300&h=200&fit=crop",
      popular: true 
    },
    { 
      name: "Espresso Romano", 
      price: "$3.25", 
      description: "Rich espresso with a twist of lemon", 
      image: "https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=300&h=200&fit=crop" 
    },
    { 
      name: "Caramel Macchiato", 
      price: "$5.00", 
      description: "Espresso with vanilla syrup and caramel drizzle", 
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop",
      popular: true 
    },
    { 
      name: "Croissant Sandwich", 
      price: "$7.50", 
      description: "Fresh croissant with ham, cheese, and greens", 
      image: "https://images.unsplash.com/photo-1555507036-ab794f4afe5a?w=300&h=200&fit=crop" 
    },
    { 
      name: "Blueberry Muffin", 
      price: "$3.75", 
      description: "Homemade muffin with fresh blueberries", 
      image: "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=300&h=200&fit=crop" 
    },
    { 
      name: "Avocado Toast", 
      price: "$8.00", 
      description: "Multigrain bread with smashed avocado and seasoning", 
      image: "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=300&h=200&fit=crop" 
    }
  ];

  return (
    <section id="items" className="py-20 bg-gradient-to-br from-gray-50 to-amber-50 relative overflow-hidden">
      {/* Background Coffee Steam Effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-1/4 w-1 h-32 bg-gradient-to-t from-transparent via-gray-200 to-transparent opacity-20 animate-pulse" style={{animationDelay: '0s'}}></div>
        <div className="absolute top-32 right-1/3 w-1 h-24 bg-gradient-to-t from-transparent via-gray-200 to-transparent opacity-15 animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-40 left-1/3 w-1 h-28 bg-gradient-to-t from-transparent via-gray-200 to-transparent opacity-25 animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div id="items-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-5xl font-bold text-gray-900 mb-6 relative">
            Item Highlights
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full"></div>
          </h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
            Discover our most popular items crafted with love and premium ingredients
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {menuItems.map((item, index) => (
            <div 
              key={index} 
              className={`group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:scale-105 hover:-translate-y-2 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Popular Badge */}
              {item.popular && (
                <div className="absolute top-4 right-4 z-20 bg-gradient-to-r from-amber-400 to-orange-400 text-white px-3 py-1 rounded-full text-sm font-semibold animate-pulse">
                  Popular ⭐
                </div>
              )}

              {/* Image Container */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Floating Price Tag */}
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <span className="text-amber-600 font-bold text-lg">{item.price}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-amber-700 transition-colors duration-300">
                  {item.name}
                </h3>
                <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                  {item.description}
                </p>

                {/* Add to Cart Button */}
                <button className="mt-4 w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-3 rounded-lg font-semibold opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 hover:from-amber-600 hover:to-orange-600">
                  Add to Cart
                </button>
              </div>

              {/* Decorative Corner */}
              <div className="absolute top-0 left-0 w-0 h-0 border-l-[40px] border-l-amber-400 border-b-[40px] border-b-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          ))}
        </div>

        <div className={`text-center mt-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{animationDelay: '0.8s'}}>
          <Link 
            href="/items"
            className="inline-flex items-center bg-gradient-to-r from-amber-600 to-orange-600 text-white px-10 py-4 rounded-full text-lg font-semibold hover:from-amber-700 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl group"
          >
            View All Items
            <span className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

// Services Section with Animated Cards
function ServicesSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('services-section');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const services = [
    { 
      icon: "🚚", 
      title: "Delivery", 
      desc: "Fresh coffee delivered to your doorstep within 30 minutes",
      color: "from-blue-400 to-blue-600",
      bgColor: "from-blue-50 to-blue-100"
    },
    { 
      icon: "🎉", 
      title: "Catering", 
      desc: "Perfect for events, meetings, and special occasions",
      color: "from-purple-400 to-purple-600",
      bgColor: "from-purple-50 to-purple-100"
    },
    { 
      icon: "💻", 
      title: "Co-working", 
      desc: "Free WiFi, comfortable workspace, and unlimited refills",
      color: "from-green-400 to-green-600",
      bgColor: "from-green-50 to-green-100"
    },
    { 
      icon: "🎓", 
      title: "Coffee Classes", 
      desc: "Learn the art of coffee making from our expert baristas",
      color: "from-amber-400 to-amber-600",
      bgColor: "from-amber-50 to-amber-100"
    }
  ];

  return (
    <section id="services-section" className="py-20 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d97706' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-5xl font-bold text-gray-900 mb-6 relative">
            Our Services
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full"></div>
          </h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
            More than just coffee - we offer a complete experience tailored to your needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className={`group relative text-center transform transition-all duration-1000 hover:scale-105 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Card Container */}
              <div className="relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-8 border border-gray-100 group-hover:border-transparent overflow-hidden">
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                
                {/* Icon Container */}
                <div className="relative z-10 mb-6">
                  <div className={`relative bg-gradient-to-br ${service.color} rounded-2xl w-20 h-20 mx-auto flex items-center justify-center transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-500 shadow-lg`}>
                    <span className="text-3xl animate-bounce-slow">{service.icon}</span>
                    {/* Glow Effect */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${service.color} rounded-2xl opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500`}></div>
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-gray-800 transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                    {service.desc}
                  </p>
                </div>

                {/* Learn More Button */}
                <div className="relative z-10 mt-6">
                  <button className={`bg-gradient-to-r ${service.color} text-white px-6 py-2 rounded-full font-semibold opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 hover:shadow-lg`}>
                    Learn More
                  </button>
                </div>

                {/* Floating Particles */}
                <div className="absolute top-4 right-4 w-2 h-2 bg-amber-400 rounded-full opacity-0 group-hover:opacity-100 animate-ping transition-opacity duration-500"></div>
                <div className="absolute bottom-4 left-4 w-1 h-1 bg-orange-400 rounded-full opacity-0 group-hover:opacity-100 animate-pulse transition-opacity duration-700"></div>
              </div>

              {/* Hover Shadow Effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.color} rounded-2xl opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500 -z-10`}></div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className={`text-center mt-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{animationDelay: '1s'}}>
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-8 border border-amber-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Need Something Custom?</h3>
            <p className="text-gray-700 mb-6">We're always happy to accommodate special requests and create unique experiences.</p>
            <button className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-8 py-3 rounded-full font-semibold hover:from-amber-700 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// Testimonials Section with Carousel Effect
function TestimonialsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('testimonials-section');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Regular Customer",
      text: "LatteLounge has the best coffee in town! The atmosphere is perfect for both work and relaxation. I come here every morning and it never disappoints.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Mike Chen",
      role: "Business Owner",
      text: "I hold all my client meetings here. The service is exceptional and the coffee is always perfect. The baristas know exactly how I like my cappuccino.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Emily Davis",
      role: "Student",
      text: "My favorite study spot! Great WiFi, comfortable seating, and amazing pastries. The staff is so friendly and the environment is perfect for productivity.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "David Rodriguez",
      role: "Coffee Enthusiast",
      text: "The quality of coffee here is unmatched. You can taste the difference in every sip. The baristas are true artists and the beans are always fresh.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
    }
  ];

  return (
    <section id="testimonials-section" className="py-20 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 text-8xl text-amber-200 opacity-10 animate-spin-slow">❝</div>
        <div className="absolute bottom-20 right-10 text-8xl text-orange-200 opacity-10 animate-spin-slow" style={{animationDirection: 'reverse'}}>❞</div>
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-gradient-to-br from-amber-200 to-orange-200 rounded-full opacity-10 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-gradient-to-br from-yellow-200 to-amber-200 rounded-full opacity-10 animate-bounce-slow"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-5xl font-bold text-gray-900 mb-6 relative">
            What Our Customers Say
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full"></div>
          </h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
            Don't just take our word for it - hear from our amazing community
          </p>
        </div>

        {/* Featured Testimonial */}
        <div className={`max-w-4xl mx-auto mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{animationDelay: '0.3s'}}>
          <div className="relative bg-white rounded-3xl shadow-2xl p-12 border border-amber-100 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full opacity-50 transform translate-x-16 -translate-y-16"></div>
            
            <div className="relative z-10 text-center">
              {/* Stars */}
              <div className="flex justify-center mb-6">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <span key={i} className="text-3xl text-yellow-400 animate-pulse" style={{animationDelay: `${i * 0.1}s`}}>⭐</span>
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-2xl text-gray-700 italic leading-relaxed mb-8 font-light">
                "{testimonials[currentTestimonial].text}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center justify-center space-x-4">
                <div className="relative">
                  <Image
                    src={testimonials[currentTestimonial].image}
                    alt={testimonials[currentTestimonial].name}
                    width={80}
                    height={80}
                    className="rounded-full border-4 border-amber-200 shadow-lg"
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-400 to-orange-400 opacity-0 hover:opacity-20 transition-opacity duration-300"></div>
                </div>
                <div className="text-left">
                  <p className="text-xl font-bold text-gray-900">{testimonials[currentTestimonial].name}</p>
                  <p className="text-amber-600 font-medium">{testimonials[currentTestimonial].role}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className={`group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-6 cursor-pointer transform hover:scale-105 ${currentTestimonial === index ? 'ring-2 ring-amber-400 scale-105' : ''} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ animationDelay: `${0.5 + index * 0.1}s` }}
              onClick={() => setCurrentTestimonial(index)}
            >
              {/* Active Indicator */}
              {currentTestimonial === index && (
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full flex items-center justify-center animate-pulse">
                  <span className="text-white text-xs">✓</span>
                </div>
              )}

              <div className="flex items-center space-x-3 mb-4">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  width={50}
                  height={50}
                  className="rounded-full border-2 border-amber-200"
                />
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{testimonial.name}</p>
                  <p className="text-amber-600 text-xs">{testimonial.role}</p>
                </div>
              </div>

              <div className="flex mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-sm">⭐</span>
                ))}
              </div>

              <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                "{testimonial.text}"
              </p>

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
            </div>
          ))}
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center mt-12 space-x-3">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${currentTestimonial === index ? 'bg-amber-500 scale-125' : 'bg-gray-300 hover:bg-amber-300'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// Location Section
function LocationSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Visit Us</h2>
          <p className="text-xl text-gray-600">Find us in the heart of the city</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="bg-gray-200 rounded-lg h-64 mb-6 flex items-center justify-center">
              <span className="text-gray-500 text-lg">🗺️ Interactive Map Coming Soon</span>
            </div>
          </div>
          <div>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-2">📍 Address</h3>
                <p className="text-gray-600">123 Coffee Street, Downtown District<br />City, State 12345</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">🕒 Hours</h3>
                <div className="text-gray-600">
                  <p>Monday - Friday: 6:00 AM - 9:00 PM</p>
                  <p>Saturday: 7:00 AM - 10:00 PM</p>
                  <p>Sunday: 7:00 AM - 8:00 PM</p>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">📞 Contact</h3>
                <p className="text-gray-600">Phone: (555) 123-4567<br />Email: hello@lattelounge.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Contact Section
function ContactSection() {
  return (
    <section id="contact" className="py-20 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Get In Touch</h2>
          <p className="text-xl text-gray-300">We'd love to hear from you</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-semibold mb-6">Send us a message</h3>
            <form className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-amber-600 focus:outline-none"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-amber-600 focus:outline-none"
                />
              </div>
              <div>
                <textarea
                  rows="4"
                  placeholder="Your Message"
                  className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-amber-600 focus:outline-none"
                ></textarea>
              </div>
              <button className="bg-amber-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors">
                Send Message
              </button>
            </form>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-6">Follow Us</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="text-2xl">📘</span>
                <span>Facebook: @LatteLounge</span>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-2xl">📷</span>
                <span>Instagram: @lattelounge_official</span>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-2xl">🐦</span>
                <span>Twitter: @LatteLounge</span>
              </div>
            </div>
            <div className="mt-8">
              <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
              <p className="text-gray-300 mb-4">Stay updated with our latest offers and events</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-l-lg bg-gray-800 text-white border border-gray-700 focus:border-amber-600 focus:outline-none"
                />
                <button className="bg-amber-600 text-white px-6 py-3 rounded-r-lg font-semibold hover:bg-amber-700 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Footer Component
function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold text-amber-600 mb-4">LatteLounge</h3>
            <p className="text-gray-300">
              Your premium coffee destination where quality meets comfort.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-300">
              <li><Link href="#home" className="hover:text-amber-600">Home</Link></li>
              <li><Link href="#about" className="hover:text-amber-600">About</Link></li>
              <li><Link href="#menu" className="hover:text-amber-600">Menu</Link></li>
              <li><Link href="#contact" className="hover:text-amber-600">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-300">
              <li>Dine In</li>
              <li>Takeaway</li>
              <li>Delivery</li>
              <li>Catering</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-2 text-gray-300">
              <p>123 Coffee Street</p>
              <p>City, State 12345</p>
              <p>(555) 123-4567</p>
              <p>hello@lattelounge.com</p>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; 2024 LatteLounge. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

// Main Home Component
export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <MenuSection />
      <ServicesSection />
      <TestimonialsSection />
      <LocationSection />
      <ContactSection />
      <Footer />
    </div>
  );
}

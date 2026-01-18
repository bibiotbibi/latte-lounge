# LatteLounge ☕ - Premium Coffee & Cafe Website

A modern, full-stack cafe website built with **Next.js 16** and **Express.js**, featuring comprehensive authentication, dynamic menu management, and a beautiful user interface with smooth animations.

## 🌟 Project Overview

LatteLounge is a complete e-commerce solution for a premium coffee shop, showcasing modern web development practices with React, Next.js, and Express.js. The application features a publicly accessible menu system, detailed product pages, user authentication, and a robust API backend.

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v18 or higher)
- **npm** or **yarn**

### Installation & Setup

1. **Clone & Install**
   ```bash
   git clone <repository-url>
   cd lattelounge
   npm install
   ```

2. **Environment Setup**
   ```bash
   # Copy environment template
   cp .env.local.example .env.local
   ```
   
   Update `.env.local`:
   ```env
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key-here
   NEXT_PUBLIC_API_URL=http://localhost:5000
   
   # Optional: Google OAuth
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   ```

3. **Start Development Servers**
   
   **Option A: Automatic (Windows)**
   ```bash
   start-dev.bat
   ```
   
   **Option B: Manual**
   ```bash
   # Terminal 1: API Server
   npm run server
   
   # Terminal 2: Next.js App
   npm run dev
   ```

4. **Access the Application**
   - **Website**: http://localhost:3000
   - **API**: http://localhost:5000/api/health

---

## 🗺️ Route Summary

### **Public Routes** (No Authentication Required)
| Route | Description | Features |
|-------|-------------|----------|
| `/` | Landing Page | 7 sections, animations, company info |
| `/items` | Menu & Items List | Browse all products, search, filter |
| `/items/[id]` | Item Details | Full product info, nutritional data |
| `/login` | Authentication | Credential & Google OAuth login |

### **API Routes**
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/items` | GET | Fetch all items with filtering |
| `/api/items/:id` | GET | Fetch single item details |
| `/api/categories` | GET | Fetch all product categories |
| `/api/health` | GET | API server health check |
| `/api/auth/[...nextauth]` | GET/POST | NextAuth.js authentication |

---

## ✨ Implemented Features

### 🏠 **Landing Page**
- **7 Main Sections**: Hero, About, Menu Highlights, Services, Testimonials, Location, Contact
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Smooth Animations**: Staggered entrance effects and hover interactions
- **Professional Layout**: Coffee-themed design with warm amber colors
- **Call-to-Actions**: Strategic placement of buttons and links

### 🔐 **Authentication System**
- **NextAuth.js Integration**: Secure JWT-based authentication
- **Multiple Login Methods**:
  - **Credential Login**: Hardcoded demo accounts for testing
  - **Google OAuth**: Social login integration (optional, disabled by default)
- **Session Management**: Secure HTTP-only cookies
- **Route Protection**: Middleware-based access control (currently disabled for public access)
- **Animated Login Page**: Beautiful UI with floating coffee bean animations
- **Error Handling**: Graceful handling of missing OAuth credentials

**Demo Credentials:**
- **Admin**: `admin@lattelounge.com` / `password123`
- **User**: `user@lattelounge.com` / `user123`

**Note**: Google OAuth is disabled by default to prevent configuration errors. See `GOOGLE_OAUTH_SETUP.md` for setup instructions.

### 🛒 **Menu & Product System**
- **Items List Page**: Grid layout with comprehensive product cards
- **Advanced Filtering**: Search by name, filter by category, price range
- **Item Details Pages**: Individual product pages with full specifications
- **Shopping Cart**: Add/remove items, quantity management, real-time totals
- **Product Information**: Images, ratings, ingredients, nutritional data

### 📊 **Rich Product Data**
Each item includes comprehensive information:
- **Basic Details**: Name, description, price, category
- **Visual Elements**: High-quality images with fallback system
- **Nutritional Info**: Calories, protein, carbs, fat, sugar, caffeine content
- **Specifications**: Ingredients, allergens, preparation time, serving size
- **Quality Indicators**: Customer ratings, review counts, availability status
- **Additional Details**: Origin, brewing method, temperature specifications

### 📡 **Express.js API Backend**
- **RESTful Architecture**: Clean, organized API endpoints
- **Comprehensive Data**: 15+ sample items with full product details
- **Advanced Filtering**: Search, category, and price-based filtering
- **Error Handling**: Graceful error responses and fallback systems
- **CORS Support**: Cross-origin requests enabled for development

### 🎨 **User Interface & Experience**
- **Modern Design**: Clean, professional aesthetic with coffee theme
- **Smooth Animations**: CSS transitions and transforms throughout
- **Responsive Layout**: Optimized for mobile, tablet, and desktop
- **Interactive Elements**: Hover effects, loading states, visual feedback
- **Accessibility**: Screen reader support, keyboard navigation, proper contrast

### 🔄 **Data Integration & Fallback**
- **Live API Integration**: Real-time data fetching from Express server
- **Offline Functionality**: Comprehensive mock data when API unavailable
- **Health Monitoring**: Real-time API status indicators
- **Error Recovery**: User-friendly error messages with recovery instructions
- **Performance**: Optimized loading with timeouts and caching

### 🛠️ **Development Features**
- **JSX Components**: All files converted to JSX format
- **TypeScript Ready**: Structured for easy TypeScript migration
- **Development Tools**: API testing scripts, health checks, batch startup files
- **Error Handling**: Comprehensive error boundaries and fallback systems
- **Code Organization**: Clean file structure with reusable components

---

## 🎯 Feature Explanations

### **Landing Page Sections**
1. **Hero Section**: Eye-catching introduction with call-to-action buttons
2. **About Section**: Company story with sustainable sourcing and quality focus
3. **Menu Highlights**: Featured items with prices and descriptions
4. **Services Section**: Delivery, catering, co-working space, coffee classes
5. **Testimonials**: Customer reviews with ratings and feedback
6. **Location Section**: Address, hours, contact information with map placeholder
7. **Contact Section**: Contact form, social media links, newsletter signup

### **Authentication Flow**
- **Public Access**: Landing page and menu browsing available to all users
- **Optional Login**: Enhanced features available after authentication
- **Session Persistence**: Users remain logged in across browser sessions
- **Security**: JWT tokens, HTTP-only cookies, CSRF protection

### **Product Management**
- **Dynamic Routing**: Individual pages for each product (`/items/[id]`)
- **Category Organization**: Products grouped by type (Coffee, Pastries, etc.)
- **Search Functionality**: Real-time search across product names and descriptions
- **Filter System**: Category-based filtering with visual indicators

### **API Architecture**
- **Express.js Server**: Robust backend with comprehensive endpoints
- **Data Modeling**: Structured product data with all necessary fields
- **Query Support**: URL parameters for filtering and searching
- **Response Format**: Consistent JSON responses with success/error handling

### **Responsive Design**
- **Mobile-First**: Optimized for mobile devices with progressive enhancement
- **Breakpoint System**: Tailwind CSS responsive utilities for all screen sizes
- **Touch Interactions**: Mobile-friendly buttons and navigation
- **Performance**: Optimized images and lazy loading

---

## 🛠️ Development Commands

```bash
# Development
npm run dev              # Start Next.js development server
npm run server          # Start Express.js API server
npm run dev:all         # Start both servers (requires concurrently)

# Testing & Utilities
npm run test:api        # Test API connectivity and endpoints
npm run build           # Build for production
npm run start           # Start production server
npm run lint            # Run ESLint

# Windows Batch Files
start-dev.bat           # Start both servers automatically
```

---

## 📁 Project Structure

```
lattelounge/
├── src/
│   ├── app/
│   │   ├── items/
│   │   │   ├── [id]/
│   │   │   │   └── page.jsx          # Individual item details
│   │   │   └── page.jsx              # Items list & menu
│   │   ├── login/
│   │   │   └── page.jsx              # Authentication page
│   │   ├── api/
│   │   │   └── auth/
│   │   │       ├── [...nextauth]/
│   │   │       │   └── route.jsx     # NextAuth configuration
│   │   │       └── logout/
│   │   │           └── route.jsx     # Logout endpoint
│   │   ├── layout.jsx                # Root layout with providers
│   │   ├── page.jsx                  # Landing page
│   │   └── globals.css               # Global styles
│   ├── components/
│   │   ├── AuthProvider.jsx          # NextAuth session provider
│   │   ├── AuthNavbar.jsx            # Navigation with auth status
│   │   ├── ApiHealthCheck.jsx        # API status monitoring
│   │   └── Breadcrumb.jsx            # Navigation breadcrumbs
│   └── middleware.jsx                # Route protection middleware
├── server/
│   ├── server.js                     # Express.js API server
│   └── images/                       # Static image assets
├── public/                           # Static files
├── .env.local                        # Environment variables
├── next.config.mjs                   # Next.js configuration
├── tailwind.config.js                # Tailwind CSS configuration
├── package.json                      # Dependencies and scripts
└── README.md                         # This file
```

---

## 🔧 Configuration

### **Next.js Configuration**
- **Image Optimization**: Remote patterns for Unsplash and placeholder images
- **App Router**: Modern Next.js 16 routing system
- **Middleware**: Route protection and request handling

### **Tailwind CSS**
- **Custom Theme**: Coffee-inspired color palette with amber accents
- **Responsive Design**: Mobile-first breakpoint system
- **Animations**: Custom transitions and hover effects

### **API Configuration**
- **CORS**: Enabled for cross-origin requests
- **Error Handling**: Comprehensive error responses
- **Data Validation**: Input validation and sanitization

---

## 🚀 Deployment

### **Vercel (Recommended)**
1. Connect GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push

### **Manual Deployment**
1. Build the application: `npm run build`
2. Deploy API server to your preferred platform
3. Update `NEXT_PUBLIC_API_URL` to production API URL
4. Deploy Next.js app to static hosting or serverless platform

---

## 🧪 Testing

### **API Testing**
```bash
# Test all API endpoints
npm run test:api

# Manual endpoint testing
curl http://localhost:5000/api/health
curl http://localhost:5000/api/items
curl http://localhost:5000/api/categories
```

### **Feature Testing**
- **Authentication**: Test login with demo credentials
- **Menu Browsing**: Verify filtering and search functionality
- **Item Details**: Check individual product pages
- **Responsive Design**: Test on various screen sizes
- **API Integration**: Verify online/offline functionality

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📄 License

This project is for educational and demonstration purposes. Feel free to use and modify as needed.

---

## 🆘 Troubleshooting

### **Common Issues**

**API Connection Errors**
- Ensure API server is running: `npm run server`
- Check API health: http://localhost:5000/api/health
- Verify environment variables in `.env.local`

**Build Errors**
- Clear Next.js cache: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Check for syntax errors: `npm run lint`

**Google OAuth Issues**
- Google OAuth is disabled by default to prevent errors
- Use credential login with demo accounts instead
- See `GOOGLE_OAUTH_SETUP.md` for optional Google OAuth configuration
- Error "OAuth client was not found" is resolved by conditional provider loading

For detailed troubleshooting, see `TROUBLESHOOTING.md`.

---

## 🎉 **LatteLounge - Where Great Coffee Meets Great Code!** ☕✨

**Built with ❤️ using Next.js, Express.js, and modern web technologies.**
# LatteLounge Troubleshooting Guide

## 🔧 Common Issues and Solutions

### 1. **API Connection Errors**

#### Problem: Fetch errors in items page
```
Error: API unavailable: TypeError: fetch failed
```

#### Solutions:
1. **Start the API Server**
   ```bash
   npm run server
   ```

2. **Check if server is running**
   ```bash
   npm run test:api
   ```

3. **Verify server URL**
   - API should be at: http://localhost:5000
   - Health check: http://localhost:5000/api/health

4. **Check environment variables**
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000
   ```

---

### 2. **Image Loading Issues**

#### Problem: Next.js Image hostname not configured
```
Invalid src prop on next/image, hostname "images.unsplash.com" is not configured
```

#### Solution: ✅ **Already Fixed**
The `next.config.mjs` has been updated with proper image configuration:
```javascript
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'images.unsplash.com',
    },
    {
      protocol: 'https', 
      hostname: 'via.placeholder.com',
    },
  ],
}
```

---

### 3. **Build Errors**

#### Problem: Middleware export missing
```
Middleware is missing expected function export name
```

#### Solution: ✅ **Already Fixed**
The `src/middleware.jsx` now exports a proper function:
```javascript
export function middleware(request) {
  return NextResponse.next()
}
```

#### Problem: useSearchParams Suspense boundary
```
useSearchParams() should be wrapped in a suspense boundary
```

#### Solution: ✅ **Already Fixed**
The login page now uses Suspense:
```javascript
<Suspense fallback={<LoginLoading />}>
  <LoginForm />
</Suspense>
```

---

### 4. **Development Setup**

#### Quick Start Options:

**Option 1: Automatic (Windows)**
```bash
start-dev.bat
```

**Option 2: Manual**
```bash
# Terminal 1: Start API Server
npm run server

# Terminal 2: Start Next.js App  
npm run dev
```

**Option 3: Test API Only**
```bash
npm run test:api
```

---

### 5. **API Status Indicators**

#### In the Items Page:
- 🟢 **API Online**: Live data from Express server
- 🔴 **API Offline**: Using fallback mock data
- 🟡 **Checking**: Testing connection

#### Health Check Component:
- Real-time API status in top-right corner
- Auto-refreshes every 30 seconds
- Shows connection status and error details

---

### 6. **Fallback System**

#### When API is unavailable:
- ✅ Page still works with mock data
- ✅ All features remain functional
- ✅ User-friendly error messages
- ✅ Instructions to connect API

#### Mock Data Includes:
- 6 sample items with full properties
- All categories (Coffee, Pastries, etc.)
- Images, ratings, ingredients, calories
- Shopping cart functionality

---

### 7. **Port Conflicts**

#### If ports are already in use:

**API Server (Port 5000)**
```bash
# Check what's using port 5000
netstat -ano | findstr :5000

# Kill process if needed
taskkill /PID <process_id> /F
```

**Next.js (Port 3000)**
```bash
# Next.js will automatically suggest alternative port
# Or specify custom port:
npm run dev -- -p 3001
```

---

### 8. **Environment Variables**

#### Required variables in `.env.local`:
```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here
NEXT_PUBLIC_API_URL=http://localhost:5000

# Optional: Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

#### Troubleshooting env vars:
1. Restart Next.js after changing `.env.local`
2. Variables starting with `NEXT_PUBLIC_` are available in browser
3. Other variables are server-side only

---

### 9. **CORS Issues**

#### If getting CORS errors:
The Express server already includes CORS configuration:
```javascript
app.use(cors());
```

#### For production deployment:
Update CORS to allow specific origins:
```javascript
app.use(cors({
  origin: ['http://localhost:3000', 'https://yourdomain.com']
}));
```

---

### 10. **Performance Issues**

#### Slow API responses:
- API has 5-second timeout configured
- Fallback data loads immediately if API fails
- Images have proper loading states

#### Large bundle size:
- Next.js automatically optimizes bundles
- Images are optimized with Next.js Image component
- Code splitting is automatic

---

## 🚀 **Quick Diagnostic Commands**

```bash
# Test API connectivity
npm run test:api

# Check if Next.js builds successfully  
npm run build

# Start both servers
start-dev.bat

# Check running processes
netstat -ano | findstr :3000
netstat -ano | findstr :5000
```

---

## 📞 **Getting Help**

1. **Check API Health**: Look for the status indicator in items page
2. **Review Console**: Check browser dev tools for errors
3. **Test API**: Run `npm run test:api` to verify server
4. **Restart Servers**: Close terminals and run `start-dev.bat`
5. **Clear Cache**: Delete `.next` folder and rebuild

---

## ✅ **Current Status**

All major issues have been resolved:
- ✅ API connection with fallback system
- ✅ Image hostname configuration  
- ✅ Middleware export function
- ✅ Suspense boundaries for SSR
- ✅ Error handling and user feedback
- ✅ Real-time API health monitoring

The application works both online (with API) and offline (with mock data)!
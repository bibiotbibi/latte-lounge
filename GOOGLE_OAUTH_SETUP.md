# Google OAuth Setup Guide for LatteLounge

## 🔧 Current Status

**Google OAuth is currently DISABLED** to prevent authentication errors. The application works perfectly with credential-based login using the demo accounts.

## 🚀 Quick Fix (Recommended)

**Use the demo credential login instead:**
- **Admin**: `admin@lattelounge.com` / `password123`
- **User**: `user@lattelounge.com` / `user123`

The Google OAuth button is now hidden and won't cause errors.

---

## 🛠️ How to Enable Google OAuth (Optional)

If you want to set up Google OAuth for testing or production, follow these steps:

### Step 1: Google Cloud Console Setup

1. **Go to Google Cloud Console**
   - Visit: https://console.cloud.google.com/

2. **Create or Select Project**
   - Create a new project or select an existing one
   - Note the project name for reference

3. **Enable Google+ API**
   - Go to "APIs & Services" > "Library"
   - Search for "Google+ API" 
   - Click "Enable"

4. **Create OAuth 2.0 Credentials**
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth 2.0 Client IDs"
   - Choose "Web application"

5. **Configure OAuth Settings**
   - **Name**: LatteLounge Local Development
   - **Authorized JavaScript origins**: 
     ```
     http://localhost:3000
     ```
   - **Authorized redirect URIs**:
     ```
     http://localhost:3000/api/auth/callback/google
     ```

6. **Get Credentials**
   - Copy the **Client ID** and **Client Secret**
   - Keep these secure and never commit to version control

### Step 2: Environment Configuration

1. **Update `.env.local`**
   ```env
   # Replace with your actual Google OAuth credentials
   GOOGLE_CLIENT_ID=your-actual-client-id-here
   GOOGLE_CLIENT_SECRET=your-actual-client-secret-here
   
   # Enable Google OAuth button
   NEXT_PUBLIC_GOOGLE_OAUTH_ENABLED=true
   ```

2. **Restart Development Server**
   ```bash
   # Stop current servers (Ctrl+C)
   # Then restart
   npm run dev
   ```

### Step 3: Test Google OAuth

1. **Visit Login Page**
   - Go to: http://localhost:3000/login
   - You should now see the Google sign-in button

2. **Test Google Login**
   - Click "Sign in with Google"
   - Complete Google OAuth flow
   - Should redirect back to items page

---

## 🔍 Troubleshooting Google OAuth

### Common Issues & Solutions

#### **Error 401: invalid_client**
- **Cause**: Missing or incorrect Google OAuth credentials
- **Solution**: Verify `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` in `.env.local`

#### **Error 400: redirect_uri_mismatch**
- **Cause**: Redirect URI not configured in Google Cloud Console
- **Solution**: Add `http://localhost:3000/api/auth/callback/google` to authorized redirect URIs

#### **Error 403: access_denied**
- **Cause**: Google+ API not enabled or OAuth consent screen not configured
- **Solution**: Enable Google+ API and configure OAuth consent screen

#### **Button Not Showing**
- **Cause**: `NEXT_PUBLIC_GOOGLE_OAUTH_ENABLED` not set to 'true'
- **Solution**: Set environment variable and restart server

### Debug Steps

1. **Check Environment Variables**
   ```bash
   # In your terminal, verify variables are loaded
   echo $GOOGLE_CLIENT_ID
   echo $NEXT_PUBLIC_GOOGLE_OAUTH_ENABLED
   ```

2. **Check NextAuth Configuration**
   - Verify Google provider is only added when credentials exist
   - Check browser dev tools for any console errors

3. **Test API Endpoint**
   ```bash
   # Test NextAuth providers endpoint
   curl http://localhost:3000/api/auth/providers
   ```

---

## 🏭 Production Setup

### For Production Deployment

1. **Update Authorized Origins**
   ```
   https://yourdomain.com
   ```

2. **Update Redirect URIs**
   ```
   https://yourdomain.com/api/auth/callback/google
   ```

3. **Environment Variables**
   ```env
   NEXTAUTH_URL=https://yourdomain.com
   GOOGLE_CLIENT_ID=your-production-client-id
   GOOGLE_CLIENT_SECRET=your-production-client-secret
   NEXT_PUBLIC_GOOGLE_OAUTH_ENABLED=true
   ```

4. **OAuth Consent Screen**
   - Configure for external users
   - Add privacy policy and terms of service URLs
   - Submit for verification if needed

---

## 🔒 Security Best Practices

### Environment Variables
- ✅ Never commit `.env.local` to version control
- ✅ Use different credentials for development and production
- ✅ Regularly rotate OAuth secrets
- ✅ Limit OAuth scopes to minimum required

### OAuth Configuration
- ✅ Use HTTPS in production
- ✅ Configure proper redirect URIs
- ✅ Enable OAuth consent screen
- ✅ Monitor OAuth usage in Google Cloud Console

---

## 📋 Current Application Status

### ✅ What Works Now
- **Credential Login**: Demo accounts work perfectly
- **Session Management**: JWT tokens and cookies
- **Route Protection**: Middleware-based (currently disabled for public access)
- **User Interface**: Beautiful login page with animations

### 🔧 Google OAuth Status
- **Disabled by Default**: Prevents authentication errors
- **Easy to Enable**: Follow setup guide above
- **Optional Feature**: App works great without it
- **Production Ready**: Can be enabled for production use

---

## 💡 Recommendations

### For Development
1. **Use credential login** with demo accounts
2. **Skip Google OAuth** unless specifically needed
3. **Focus on core features** first
4. **Add OAuth later** if required

### For Production
1. **Set up Google OAuth** properly with production credentials
2. **Configure OAuth consent screen** for external users
3. **Use HTTPS** for all OAuth redirects
4. **Monitor OAuth usage** and errors

---

## 🆘 Need Help?

If you encounter issues:

1. **Check the troubleshooting section** above
2. **Verify environment variables** are correct
3. **Restart development server** after changes
4. **Use credential login** as fallback
5. **Check browser console** for error messages

The application is designed to work perfectly without Google OAuth, so you can always fall back to the credential-based authentication system.

---

**Remember**: Google OAuth is optional. The LatteLounge application provides a complete authentication experience with the built-in credential system! 🔐☕
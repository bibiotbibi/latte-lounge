import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'

// Build providers array conditionally
const providers = [
  CredentialsProvider({
    name: 'credentials',
    credentials: {
      email: { label: 'Email', type: 'email' },
      password: { label: 'Password', type: 'password' }
    },
    async authorize(credentials) {
      if (!credentials?.email || !credentials?.password) {
        return null
      }

      try {
        // Use relative URL for internal API - works in both dev and production
        const baseUrl = process.env.NEXTAUTH_URL || (
          typeof window !== 'undefined' 
            ? window.location.origin 
            : 'http://localhost:3000'
        );
        
        const response = await fetch(`${baseUrl}/api/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password
          }),
        });

        if (response.ok) {
          const data = await response.json();
          if (data.success && data.data) {
            return {
              id: data.data.id,
              email: data.data.email,
              name: data.data.name,
              role: data.data.role
            }
          }
        }
      } catch (error) {
        console.warn('API authentication failed, falling back to local users:', error.message);
      }

      // Fallback to local user database - always works
      const users = [
        {
          id: '1',
          email: 'admin@lattelounge.com',
          password: 'password123',
          name: 'Admin User',
          role: 'admin'
        },
        {
          id: '2',
          email: 'user@lattelounge.com',
          password: 'user123',
          name: 'Regular User',
          role: 'user'
        }
      ];

      const user = users.find(
        user => user.email === credentials.email && user.password === credentials.password
      )

      if (user) {
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role
        }
      }

      return null
    }
  })
]

// Only add Google provider if credentials are configured
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  providers.push(
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  )
}

const authOptions = {
  providers,
  pages: {
    signIn: '/login',
    error: '/login'
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub
        session.user.role = token.role
      }
      return session
    }
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  cookies: {
    sessionToken: {
      name: process.env.NODE_ENV === 'production' 
        ? '__Secure-next-auth.session-token' 
        : 'next-auth.session-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        domain: process.env.NODE_ENV === 'production' 
          ? process.env.NEXTAUTH_URL?.replace(/https?:\/\//, '').split('/')[0]
          : undefined
      }
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development'
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
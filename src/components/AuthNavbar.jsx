'use client'

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";

export default function AuthNavbar() {
  const { data: session, status } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' });
  };

  return (
    <nav className="bg-white shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-amber-600 hover:text-amber-700 transition-colors">
              LatteLounge
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link href="#home" className="text-gray-700 hover:text-amber-600 px-3 py-2 text-sm font-medium transition-colors">
                Home
              </Link>
              <Link href="#about" className="text-gray-700 hover:text-amber-600 px-3 py-2 text-sm font-medium transition-colors">
                About
              </Link>
              <Link href="/items" className="text-gray-700 hover:text-amber-600 px-3 py-2 text-sm font-medium transition-colors">
                Items
              </Link>
              <Link href="#contact" className="text-gray-700 hover:text-amber-600 px-3 py-2 text-sm font-medium transition-colors">
                Contact
              </Link>
              
              {status === 'loading' ? (
                <div className="animate-pulse bg-gray-200 h-8 w-16 rounded"></div>
              ) : session ? (
                <>
                  <div className="relative group">
                    <button className="flex items-center text-gray-700 hover:text-amber-600 px-3 py-2 text-sm font-medium transition-colors">
                      <span className="mr-2">👋</span>
                      {session.user?.name || session.user?.email}
                      <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      <div className="px-4 py-2 text-sm text-gray-700 border-b">
                        <div className="font-medium">{session.user?.name}</div>
                        <div className="text-gray-500">{session.user?.email}</div>
                      </div>
                      <button
                        onClick={handleSignOut}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        Sign out
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <Link href="/login" className="bg-amber-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-amber-700 transition-colors">
                    Login
                  </Link>
                  <Link href="/register" className="border border-amber-600 text-amber-600 px-4 py-2 rounded-md text-sm font-medium hover:bg-amber-50 transition-colors">
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-amber-600 focus:outline-none focus:text-amber-600"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <Link href="#home" className="block text-gray-700 hover:text-amber-600 px-3 py-2 text-base font-medium">
                Home
              </Link>
              <Link href="#about" className="block text-gray-700 hover:text-amber-600 px-3 py-2 text-base font-medium">
                About
              </Link>
              <Link href="/items" className="block text-gray-700 hover:text-amber-600 px-3 py-2 text-base font-medium">
                Items
              </Link>
              <Link href="#contact" className="block text-gray-700 hover:text-amber-600 px-3 py-2 text-base font-medium">
                Contact
              </Link>
              
              {session ? (
                <>
                  <div className="px-3 py-2 text-sm text-gray-700 border-t">
                    <div className="font-medium">{session.user?.name}</div>
                    <div className="text-gray-500">{session.user?.email}</div>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="block w-full text-left text-gray-700 hover:text-amber-600 px-3 py-2 text-base font-medium"
                  >
                    Sign out
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" className="block bg-amber-600 text-white px-3 py-2 text-base font-medium rounded-md mb-2">
                    Login
                  </Link>
                  <Link href="/register" className="block border border-amber-600 text-amber-600 px-3 py-2 text-base font-medium rounded-md">
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
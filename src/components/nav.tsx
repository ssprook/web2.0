"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { AccountMenu } from './account-menu';
import { useRouter } from 'next/navigation';

export function Nav() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'getUser' }),
      });

      setIsAuthenticated(response.ok);
    } catch (error) {
      console.error('Erreur lors de la vérification de l\'authentification:', error);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const handleLogout = () => {
    setIsAuthenticated(false);
    router.push('/');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-purple-600 rounded-full p-0.5">
                <div className="w-full h-full bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none">
                    <path d="M20 4L3 9.31372L10.5 13.5M20 4L14.5 21L10.5 13.5M20 4L10.5 13.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              <span className="text-white text-xl font-semibold">Spam Detector</span>
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              <Link href="/features" className="text-white/70 hover:text-white transition-colors">
                Features
              </Link>
              <Link href="/resources" className="text-white/70 hover:text-white transition-colors">
                Resources
              </Link>
              <Link href="/pricing" className="text-white/70 hover:text-white transition-colors">
                Pricing
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {isLoading ? (
              <div className="w-24 h-10 bg-white/5 rounded-full animate-pulse" />
            ) : isAuthenticated ? (
              <AccountMenu onLogout={handleLogout} />
            ) : (
              <Link
                href="/login"
                className="bg-gradient-to-r from-red-500 to-purple-600 text-white px-6 py-2 rounded-full hover:opacity-90 transition-all"
              >
                Se connecter
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
} 
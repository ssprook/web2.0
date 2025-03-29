"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Vérifier si l'utilisateur est connecté
    const token = localStorage.getItem('authToken');
    setIsLoggedIn(!!token);

    // Écouter les changements de connexion
    const checkAuth = () => {
      const token = localStorage.getItem('authToken');
      setIsLoggedIn(!!token);
    };

    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    window.dispatchEvent(new Event('storage'));
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm bg-black/10">
      <div className="container mx-auto px-6">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-12">
            <Link 
              href="/" 
              className="flex items-center gap-4"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-purple-600 rounded-lg p-0.5">
                <div className="w-full h-full bg-black/30 backdrop-blur-sm rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none">
                    <path d="M20 4L3 9.31372L10.5 13.5M20 4L14.5 21L10.5 13.5M20 4L10.5 13.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              <span className="text-lg font-bold">Spam Checker</span>
            </Link>

            <nav className="hidden md:flex gap-8">
              <Link href="#features" className="text-gray-300 hover:text-white transition-colors">
                Features
              </Link>
              <Link href="#resources" className="text-gray-300 hover:text-white transition-colors">
                Resources
              </Link>
              <Link href="#pricing" className="text-gray-300 hover:text-white transition-colors">
                Pricing
              </Link>
            </nav>
          </div>

          {isLoggedIn ? (
            <div className="relative">
              <Button 
                variant="secondary"
                className="bg-gradient-to-r from-red-500 to-purple-600 hover:opacity-90 text-white shadow-lg px-8 flex items-center gap-2"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                  <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" fill="currentColor"/>
                  <path d="M12.0002 14.5C6.99016 14.5 2.91016 17.86 2.91016 22C2.91016 22.28 3.13016 22.5 3.41016 22.5H20.5902C20.8702 22.5 21.0902 22.28 21.0902 22C21.0902 17.86 17.0102 14.5 12.0002 14.5Z" fill="currentColor"/>
                </svg>
                Mon compte
              </Button>

              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 py-2 bg-black/90 backdrop-blur-lg rounded-xl border border-white/10 shadow-xl">
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/10"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Profil
                  </Link>
                  <Link
                    href="/settings"
                    className="block px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/10"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Paramètres
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-white/10"
                  >
                    Déconnexion
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link href="/login">
              <Button 
                variant="secondary"
                className="bg-red-500 hover:bg-red-600 text-white shadow-lg px-8"
              >
                Sign in
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

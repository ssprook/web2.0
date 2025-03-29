"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { VideoBackground } from "@/components/video-background";
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'login',
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Une erreur est survenue');
      }

      if (data.success) {
        router.push('/account');
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent relative overflow-hidden">
      <VideoBackground />
      
      {/* Effet de particules animées */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/40 to-transparent z-0"></div>

      {/* Bouton Retour */}
      <Link
        href="/"
        className="absolute top-6 left-6 flex items-center gap-2 text-white/80 hover:text-white transition-colors z-20"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Retour
      </Link>

      <div className="relative z-10 w-full max-w-4xl mx-4 bg-black/30 backdrop-blur-lg rounded-2xl overflow-hidden shadow-2xl border border-white/10">
        <div className="flex flex-col md:flex-row">
          {/* Partie gauche - Branding */}
          <div className="relative w-full md:w-5/12 bg-gradient-to-br from-red-500/20 to-purple-600/20 p-8 md:p-12 flex flex-col items-center justify-center text-center">
            <div className="absolute inset-0 backdrop-blur-sm"></div>
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-red-500 to-purple-600 rounded-2xl p-0.5 mb-6 mx-auto">
                <div className="w-full h-full bg-black/30 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <svg className="w-12 h-12 text-white" viewBox="0 0 24 24" fill="none">
                    <path d="M20 4L3 9.31372L10.5 13.5M20 4L14.5 21L10.5 13.5M20 4L10.5 13.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Spam Detector Pro</h2>
              <p className="text-white/70 text-sm mb-8">Connectez-vous pour accéder à toutes les fonctionnalités premium</p>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-white/60 text-sm">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Analyse avancée
                </div>
                <div className="flex items-center gap-2 text-white/60 text-sm">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Rapports détaillés
                </div>
                <div className="flex items-center gap-2 text-white/60 text-sm">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Support prioritaire
                </div>
              </div>
            </div>
          </div>

          {/* Partie droite - Formulaire */}
          <div className="w-full md:w-7/12 p-8 md:p-12">
            <div className="max-w-md mx-auto">
              <h3 className="text-2xl font-bold text-white mb-8">Connexion</h3>
              
              {error && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/80" htmlFor="email">
                    Email
                  </label>
                  <div className="relative">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="votre@email.com"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/50 text-white placeholder:text-white/30"
                      required
                    />
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-red-500/10 to-purple-600/10 -z-10"></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/80" htmlFor="password">
                    Mot de passe
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/50 text-white placeholder:text-white/30"
                      required
                    />
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-red-500/10 to-purple-600/10 -z-10"></div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full bg-gradient-to-r from-red-500 to-purple-600 text-white font-medium py-3 px-4 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-red-500/50 ${
                    isLoading ? 'opacity-70 cursor-wait' : 'hover:opacity-90'
                  }`}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                      </svg>
                      Connexion en cours...
                    </div>
                  ) : (
                    'Se connecter'
                  )}
                </button>

                <p className="text-center text-sm text-white/70">
                  Pas encore de compte ?{" "}
                  <Link href="/register" className="text-red-400 hover:text-red-300 font-medium">
                    Créer un compte
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
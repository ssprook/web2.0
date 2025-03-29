"use client";

import { Button } from "@/components/ui/button";
import { VideoBackground } from "@/components/video-background";
import Link from "next/link";

export default function PricingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden py-20">
      <VideoBackground />
      
      {/* Effet de gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/80 z-0"></div>

      {/* Bouton Retour */}
      <Link
        href="/"
        className="absolute top-6 left-6 flex items-center gap-2 text-white hover:text-red-400 transition-colors z-20 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/10"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Retour
      </Link>

      <div className="relative z-10 container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block mb-4 px-4 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400">
            OFFRE SPÉCIALE DE LANCEMENT
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-red-500 to-purple-600 bg-clip-text text-transparent">
            Spam Detector+
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
            Protection avancée contre les spams avec intelligence artificielle
          </p>
          
          {/* Prix */}
          <div className="inline-block mb-12">
            <div className="bg-black/30 backdrop-blur-xl rounded-2xl p-8 border-2 border-red-500 transform hover:scale-105 transition-all duration-300">
              <div className="flex items-baseline justify-center mb-4">
                <span className="text-5xl font-bold text-white">40</span>
                <span className="text-2xl text-white/70 ml-2">MAD</span>
                <span className="text-white/50 ml-2">/mois</span>
              </div>
              <Button className="bg-gradient-to-r from-red-500 to-purple-600 hover:opacity-90 text-lg py-6 px-12">
                Commencer maintenant
              </Button>
            </div>
          </div>
        </div>

        {/* Avantages */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-red-500/30 transition-all duration-300">
            <div className="text-red-400 mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Analyses Illimitées</h3>
            <p className="text-white/70">Vérifiez autant d'emails que vous le souhaitez, sans restriction</p>
          </div>

          <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-red-500/30 transition-all duration-300">
            <div className="text-purple-400 mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Détection Avancée</h3>
            <p className="text-white/70">Algorithmes d'IA de pointe pour une précision maximale</p>
          </div>

          <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-red-500/30 transition-all duration-300">
            <div className="text-red-400 mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Sécurité Garantie</h3>
            <p className="text-white/70">Protection de vos données et confidentialité assurée</p>
          </div>

          <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-red-500/30 transition-all duration-300">
            <div className="text-purple-400 mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Rapports Détaillés</h3>
            <p className="text-white/70">Analyses complètes avec statistiques et recommandations</p>
          </div>

          <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-red-500/30 transition-all duration-300">
            <div className="text-red-400 mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Analyse en Temps Réel</h3>
            <p className="text-white/70">Résultats instantanés pour une protection immédiate</p>
          </div>

          <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-red-500/30 transition-all duration-300">
            <div className="text-purple-400 mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Support Premium</h3>
            <p className="text-white/70">Assistance technique prioritaire 24/7</p>
          </div>
        </div>
      </div>
    </div>
  );
} 
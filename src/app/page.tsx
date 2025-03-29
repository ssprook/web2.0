"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SpamChecker } from "@/components/spam-checker";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { VideoBackground } from "@/components/video-background";
import { ChatBot } from "@/components/chat-bot";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { FeatureCard } from "@/components/feature-card";
import { FAQAccordion } from "@/components/faq-accordion";

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-transparent text-white relative">
      <Nav />
      <VideoBackground />
      <ChatBot />
      
      <main className="container mx-auto px-4 py-12 relative z-10">
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center animate-fade-in">
          <Badge className="bg-transparent text-primary-foreground hover:bg-primary/30 mb-8 animate-bounce-slow">
            OUTIL GRATUIT
          </Badge>
          
          <h1 className="text-7xl font-bold mb-8 tracking-tight hover:scale-105 transition-transform duration-300">
            Spam Checker
          </h1>
          
          <p className="text-gray-300 text-xl max-w-2xl mx-auto mb-12 hover:text-white transition-colors duration-300">
            Copiez/collez un message email pour détecter les mots spam.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/pricing">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-red-500 to-purple-600 hover:opacity-90 text-white shadow-lg px-8 py-6 text-lg flex items-center gap-2 group transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <svg className="w-6 h-6 group-hover:scale-110 transition-transform animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Obtenir Spam Detector+
              </Button>
            </Link>
          </div>
        </div>

        <div id="spam-checker" className="hover:scale-[1.02] transition-transform duration-500">
        <SpamChecker />
        </div>

        <section className="mt-20">
          <div className="grid grid-cols-1 gap-8 hover:scale-[1.01] transition-all duration-300">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500/20 to-purple-600/20 rounded-2xl blur opacity-50 group-hover:opacity-75 transition duration-500 animate-pulse"></div>
              
              <div className="relative p-8 bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-500">
                <h2 className="text-2xl font-display font-bold bg-gradient-to-r from-red-500 to-purple-600 bg-clip-text text-transparent mb-6 hover:scale-105 transition-transform duration-300">
                  Ne tombez plus dans les SPAM
                </h2>
                <p className="text-white/80 text-lg leading-relaxed font-light hover:text-white transition-colors duration-300">
                  Spam Checker vous aide à valider vos emails avant de les envoyer. Il détecte les mots spam qui
                  semblent peu naturels, douteux, trop prometteurs et plus encore. En reformulant ou en utilisant des synonymes,
                  vous évitez les filtres anti-spam.
                </p>
              </div>
            </div>
          </div>

          <h3 className="text-xl font-display font-semibold text-white mt-12 mb-6 hover:scale-105 transition-transform duration-300">Autres outils</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 hover:gap-8 transition-all duration-300">
            <div className="transform hover:scale-105 transition-transform duration-300">
              <FeatureCard
                title="AI Email Writer"
                description="Éliminez le stress et rendez la rédaction d'emails sans effort, grâce à notre GPT Email Writer"
              />
            </div>
            <div className="transform hover:scale-105 transition-transform duration-300">
              <FeatureCard
                title="Email Checker"
                description="Vérifiez l'adresse email de n'importe qui grâce à notre vérificateur d'email gratuit"
              />
            </div>
          </div>
        </section>

        <section className="mt-20 hover:scale-[1.01] transition-transform duration-500">
          <h2 className="text-2xl font-bold mb-6 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-red-500 hover:to-purple-600 transition-all duration-300">Comment ça marche</h2>
          <p className="text-gray-300 mb-8 hover:text-white transition-colors duration-300">
            Apprenez à détecter les mots spam dans vos emails avec ce tutoriel vidéo de 2 minutes.
          </p>
          <div className="aspect-video backdrop-blur-md bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors duration-300">
            <p className="text-gray-400">Emplacement pour le tutoriel vidéo</p>
          </div>
        </section>

        <section className="mt-20 hover:scale-[1.01] transition-transform duration-500">
          <h2 className="text-2xl font-bold mb-6 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-red-500 hover:to-purple-600 transition-all duration-300">Questions & réponses sur le vérificateur de spam</h2>
          <p className="text-gray-300 mb-8 hover:text-white transition-colors duration-300">
            Tout ce que vous devez savoir sur le SPAM.
          </p>

          <FAQAccordion />
        </section>
      </main>

      <Footer />
    </div>
  );
}

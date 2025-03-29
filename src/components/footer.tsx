import Link from "next/link";

export function Footer() {
  return (
    <footer className="relative mt-32 border-t border-white/10">
      {/* Effet de brillance amélioré */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-500/10 to-purple-600/10 pointer-events-none blur-2xl"></div>

      <div className="relative container mx-auto px-6 py-20">
        {/* Section principale */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          {/* Logo et description */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center space-x-3 mb-8 group">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-purple-600 rounded-full p-0.5 transition-transform duration-300 group-hover:scale-105">
                <div className="w-full h-full bg-black rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none">
                    <path d="M20 4L3 9.31372L10.5 13.5M20 4L14.5 21L10.5 13.5M20 4L10.5 13.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              <span className="text-white text-2xl font-display font-bold tracking-tight">Spam Detector</span>
            </Link>
            <p className="text-white/80 text-lg leading-relaxed mb-8 font-light max-w-md">
              Optimisez la délivrabilité de vos emails et évitez les filtres anti-spam grâce à nos outils d'analyse avancés.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-white/70 hover:text-white transition-all duration-300 hover:scale-110">
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
                </svg>
              </a>
              <a href="#" className="text-white/70 hover:text-white transition-all duration-300 hover:scale-110">
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.4 0 0 5.4 0 12c0 5.3 3.4 9.8 8.2 11.4.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.6-4-1.6-.5-1.4-1.2-1.8-1.2-1.8-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 1.7 2.6 1.2 3.2.9.1-.7.4-1.2.7-1.5-2.6-.3-5.4-1.3-5.4-5.9 0-1.3.5-2.4 1.1-3.2-.1-.3-.5-1.5.1-3.2 0 0 .9-.3 3 1.1.9-.2 1.8-.3 2.7-.3s1.8.1 2.7.3c2.1-1.4 3-1.1 3-1.1.6 1.7.2 2.9.1 3.2.7.8 1.1 1.9 1.1 3.2 0 4.6-2.8 5.6-5.4 5.9.4.3.7.9.7 1.9v2.8c0 .3.2.7.8.6C20.6 21.8 24 17.3 24 12c0-6.6-5.4-12-12-12"/>
                </svg>
              </a>
              <a href="#" className="text-white/70 hover:text-white transition-all duration-300 hover:scale-110">
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
          </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-white font-display text-xl font-semibold mb-6">Produits</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/features" className="text-white/80 hover:text-white transition-colors text-lg font-light hover:translate-x-1 inline-block">
                  Spam Checker
                </Link>
              </li>
              <li>
                <Link href="/features" className="text-white/80 hover:text-white transition-colors text-lg font-light hover:translate-x-1 inline-block">
                  Email Writer
                </Link>
              </li>
              <li>
                <Link href="/features" className="text-white/80 hover:text-white transition-colors text-lg font-light hover:translate-x-1 inline-block">
                  Email Checker
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-white/80 hover:text-white transition-colors text-lg font-light hover:translate-x-1 inline-block">
                  Tarifs
                </Link>
              </li>
            </ul>
          </div>

          {/* Ressources */}
          <div>
            <h3 className="text-white font-display text-xl font-semibold mb-6">Ressources</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/blog" className="text-white/80 hover:text-white transition-colors text-lg font-light hover:translate-x-1 inline-block">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/guides" className="text-white/80 hover:text-white transition-colors text-lg font-light hover:translate-x-1 inline-block">
                  Guides
                </Link>
              </li>
              <li>
                <Link href="/api" className="text-white/80 hover:text-white transition-colors text-lg font-light hover:translate-x-1 inline-block">
                  API
                </Link>
              </li>
              <li>
                <Link href="/status" className="text-white/80 hover:text-white transition-colors text-lg font-light hover:translate-x-1 inline-block">
                  Status
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Barre inférieure */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-white/60 text-base font-light">
              © 2025 spam detcor - Tous droits réservés. soufiane
        </div>
            <div className="flex space-x-8 text-base font-light">
              <Link href="/privacy" className="text-white/60 hover:text-white transition-colors hover:translate-x-1 inline-block">
                Confidentialité
          </Link>
              <Link href="/terms" className="text-white/60 hover:text-white transition-colors hover:translate-x-1 inline-block">
                Conditions
          </Link>
              <Link href="/cookies" className="text-white/60 hover:text-white transition-colors hover:translate-x-1 inline-block">
                Cookies
          </Link>
        </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

import { useState } from 'react';

interface FAQItemProps {
  question: string;
  answer: string;
}

function FAQItem({ question, answer }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative group">
      {/* Effet de brillance */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500/20 to-purple-600/20 rounded-2xl blur opacity-50 group-hover:opacity-75 transition duration-500"></div>
      
      {/* Contenu principal */}
      <div className="relative bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-500 overflow-hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full p-6 text-left flex justify-between items-center"
        >
          <h3 className="font-display text-lg text-white/90 font-semibold">{question}</h3>
          <div className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
            <svg className="w-5 h-5 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </button>
        
        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
          <div className="p-6 pt-0 text-white/70 leading-relaxed">
            {answer}
          </div>
        </div>
      </div>
    </div>
  );
}

export function FAQAccordion() {
  const faqs = [
    {
      question: "Comment fonctionne le vérificateur de spam ?",
      answer: "Notre vérificateur de spam utilise un algorithme avancé qui analyse votre texte en temps réel. Il identifie les mots et expressions couramment utilisés dans les spams, vérifie la structure de votre message et évalue plusieurs critères comme l'urgence excessive, les promesses irréalistes, et le langage commercial agressif. L'outil fournit ensuite des suggestions d'amélioration pour optimiser la délivrabilité de vos emails."
    },
    {
      question: "Qu'est-ce qu'un vérificateur de spam ?",
      answer: "Un vérificateur de spam est un outil qui analyse le contenu de vos emails pour identifier les éléments qui pourraient déclencher les filtres anti-spam. Il examine le texte, les liens, et la structure globale du message pour détecter les caractéristiques typiques des spams. Cela vous permet d'ajuster votre message avant l'envoi pour maximiser ses chances d'atteindre la boîte de réception du destinataire."
    },
    {
      question: "Où en apprendre plus sur le spam ?",
      answer: "Vous pouvez approfondir vos connaissances sur le spam à travers nos ressources dédiées : guides pratiques, articles de blog, webinaires et études de cas. Nous proposons également une newsletter hebdomadaire avec les dernières actualités et bonnes pratiques en matière de délivrabilité des emails. Notre communauté d'experts partage régulièrement ses conseils pour éviter les pièges du spam."
    },
    {
      question: "Le vérificateur de spam est-il gratuit ?",
      answer: "Oui, notre vérificateur de spam propose une version gratuite qui vous permet d'analyser vos emails et d'obtenir des recommandations de base. Pour des fonctionnalités avancées comme l'analyse approfondie, les rapports détaillés, et l'accès à notre base de données complète de mots-clés spam, nous proposons également des forfaits premium adaptés aux besoins des professionnels."
    },
    {
      question: "Le vérificateur de spam est-il sûr ?",
      answer: "Absolument. La sécurité et la confidentialité de vos données sont nos priorités. Nous utilisons un chiffrement de bout en bout pour protéger vos messages, ne stockons aucune donnée sensible, et respectons strictement le RGPD. Notre infrastructure est régulièrement auditée par des experts en sécurité indépendants pour garantir le plus haut niveau de protection."
    }
  ];

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <FAQItem key={index} question={faq.question} answer={faq.answer} />
      ))}
    </div>
  );
} 
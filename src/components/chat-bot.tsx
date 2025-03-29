"use client";

import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";

interface Message {
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    if (option === 'ai') {
      setMessages([{
        type: 'ai',
        content: 'Bonjour ! Je suis votre assistant IA. Je peux vous aider à :\n\n• Analyser vos emails pour détecter les spams\n• Expliquer comment fonctionne notre système\n• Répondre à vos questions sur la sécurité\n• Vous guider dans l\'utilisation de nos services\n\nComment puis-je vous aider aujourd\'hui ?',
        timestamp: new Date()
      }]);
    }
  };

  const handleBack = () => {
    setSelectedOption(null);
    setMessages([]);
    setInputMessage('');
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simuler une réponse de l'IA
    setTimeout(() => {
      const aiResponses = [
        "Je comprends votre question. Notre système utilise l'intelligence artificielle avancée pour détecter les spams avec une précision de 99.9%.",
        "Pour analyser un email, il vous suffit de le copier-coller dans notre interface. Notre système le traitera instantanément.",
        "La sécurité de vos données est notre priorité. Toutes les analyses sont effectuées de manière sécurisée et confidentielle.",
        "Nous utilisons des modèles d'IA entraînés sur des millions d'emails pour garantir une détection précise des spams.",
        "Vous pouvez utiliser notre service 24/7. Notre système est toujours disponible pour vous aider.",
        "Pour plus d'informations sur nos tarifs et services, je vous invite à consulter notre page de tarification."
      ];

      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      
      const aiMessage: Message = {
        type: 'ai',
        content: randomResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const renderContent = () => {
    if (selectedOption === 'agent') {
      return (
        <div className="p-6 space-y-4">
          <button 
            onClick={handleBack}
            className="flex items-center text-white/70 hover:text-white mb-4"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Retour
          </button>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <div className="font-medium">Mobile</div>
                <a href="tel:+21234354545" className="text-red-400 hover:text-red-300">+212 3435 4545</a>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <div>
                <div className="font-medium">Fixe</div>
                <a href="tel:+813453453456" className="text-purple-400 hover:text-purple-300">+81 3453 453 456</a>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <div className="font-medium">Email</div>
                <a href="mailto:aidetctor@gmail.com" className="text-red-400 hover:text-red-300">aidetctor@gmail.com</a>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (selectedOption === 'api') {
      return (
        <div className="p-6 space-y-4">
          <button 
            onClick={handleBack}
            className="flex items-center text-white/70 hover:text-white mb-4"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Retour
          </button>
          
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-purple-500/20 flex items-center justify-center">
              <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h4 className="text-lg font-semibold">API Bientôt Disponible</h4>
            <p className="text-white/70">
              Notre API sera disponible très prochainement. Laissez-nous votre email pour être informé en premier !
            </p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Votre email"
                className="flex-1 px-4 py-2 rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/50 focus:outline-none focus:border-purple-500"
              />
              <Button className="bg-purple-500 hover:bg-purple-600">
                Notifier
              </Button>
            </div>
          </div>
        </div>
      );
    }

    if (selectedOption === 'ai') {
      return (
        <div className="p-6 space-y-4 h-[500px] flex flex-col">
          <button 
            onClick={handleBack}
            className="flex items-center text-white/70 hover:text-white mb-4"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Retour
          </button>
          
          <div className="flex-1 overflow-y-auto space-y-4 pr-2">
            {messages.map((message, index) => (
              <div key={index} className={`flex items-start gap-3 ${message.type === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center mt-1 ${
                  message.type === 'user' ? 'bg-purple-500/20' : 'bg-red-500/20'
                }`}>
                  <svg className={`w-4 h-4 ${message.type === 'user' ? 'text-purple-400' : 'text-red-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <div className={`flex-1 p-3 rounded-lg border ${
                  message.type === 'user' 
                    ? 'bg-purple-500/20 border-purple-500/30' 
                    : 'bg-black/30 border-white/10'
                }`}>
                  <div className="whitespace-pre-line">{message.content}</div>
                  <div className="text-xs mt-1 opacity-50">
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-red-500/20 flex-shrink-0 flex items-center justify-center mt-1">
                  <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <div className="flex-1 p-3 rounded-lg bg-black/30 border border-white/10">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-red-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-red-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-red-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="flex gap-2 pt-4 border-t border-white/10">
            <input 
              type="text" 
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Écrivez votre message..."
              className="flex-1 px-4 py-2 rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/50 focus:outline-none focus:border-red-500"
            />
            <Button 
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isTyping}
              className="bg-gradient-to-r from-red-500 to-purple-600 hover:opacity-90 disabled:opacity-50"
            >
              Envoyer
            </Button>
          </div>
        </div>
      );
    }

    return (
      <>
        <div className="p-4 bg-gradient-to-r from-red-500/10 to-purple-600/10 border-b border-white/10">
          <h3 className="text-lg font-semibold text-white">Comment pouvons-nous vous aider ?</h3>
        </div>
        
        <div className="p-4 space-y-3">
          <button 
            className="w-full p-4 bg-black/50 hover:bg-white/10 rounded-xl border border-white/10 text-left text-white transition-colors flex items-center gap-3 group"
            onClick={() => handleOptionClick('agent')}
          >
            <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center group-hover:bg-red-500/30 transition-colors">
              <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <div className="font-medium">Parler à un agent</div>
              <div className="text-sm text-white/70">Support personnalisé</div>
            </div>
          </button>

          <button 
            className="w-full p-4 bg-black/50 hover:bg-white/10 rounded-xl border border-white/10 text-left text-white transition-colors flex items-center gap-3 group"
            onClick={() => handleOptionClick('api')}
          >
            <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center group-hover:bg-purple-500/30 transition-colors">
              <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <div>
              <div className="font-medium">Obtenir l'API</div>
              <div className="text-sm text-white/70">Documentation technique</div>
            </div>
          </button>

          <button 
            className="w-full p-4 bg-black/50 hover:bg-white/10 rounded-xl border border-white/10 text-left text-white transition-colors flex items-center gap-3 group"
            onClick={() => handleOptionClick('ai')}
          >
            <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center group-hover:bg-red-500/30 transition-colors">
              <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <div className="font-medium">Chat avec l'IA</div>
              <div className="text-sm text-white/70">Assistant intelligent</div>
            </div>
          </button>
        </div>

        <div className="p-4 bg-gradient-to-r from-red-500/5 to-purple-600/5 border-t border-white/10">
          <p className="text-xs text-center text-white/50">
            Disponible 24/7 pour vous aider
          </p>
        </div>
      </>
    );
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Bouton du chatbot */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-gradient-to-r from-red-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg hover:opacity-90 transition-all duration-300 hover:scale-105"
      >
        {isOpen ? (
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </button>

      {/* Fenêtre du chatbot */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-80 bg-black/90 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
          {renderContent()}
        </div>
      )}
    </div>
  );
} 
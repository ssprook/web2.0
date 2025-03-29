"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { VideoBackground } from "@/components/video-background";
import { Nav } from "@/components/nav";
import Cookies from 'js-cookie';

export default function AccountPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    subscription: '',
    nextPayment: ''
  });
  const [editedData, setEditedData] = useState(userData);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/auth', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            action: 'getUser'
          }),
        });

        if (!response.ok) {
          throw new Error('Non authentifié');
        }

        const data = await response.json();
        setUserData(data.user);
        setEditedData(data.user);
      } catch (error) {
        router.push('/login');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [router]);

  const handleLogout = () => {
    Cookies.remove('auth_token');
    router.push('/');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedData({
      ...editedData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'updateUser',
          name: editedData.name,
          email: editedData.email
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Une erreur est survenue');
      }

      setUserData(data.user);
      setIsEditing(false);
    } catch (error: any) {
      console.error('Erreur lors de la sauvegarde:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setEditedData(userData);
    setIsEditing(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="flex items-center gap-3">
          <svg className="animate-spin h-8 w-8 text-red-500" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
          </svg>
          <span className="text-white text-lg">Chargement...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      <Nav />
      <VideoBackground />
      
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/80" />
      
      {/* Contenu */}
      <main className="relative z-10 container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-black/30 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
            {/* En-tête du profil */}
            <div className="p-8 border-b border-white/10">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-purple-600 rounded-full p-0.5">
                  <div className="w-full h-full bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">
                      {userData.name.charAt(0)}
                    </span>
                  </div>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">{userData.name}</h1>
                  <p className="text-white/60">{userData.email}</p>
                </div>
              </div>
            </div>

            {/* Navigation des onglets */}
            <div className="border-b border-white/10">
              <div className="flex">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`px-6 py-3 text-sm font-medium transition-colors ${
                    activeTab === 'profile'
                      ? 'text-white border-b-2 border-red-500'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  Profil
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`px-6 py-3 text-sm font-medium transition-colors ${
                    activeTab === 'settings'
                      ? 'text-white border-b-2 border-red-500'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  Paramètres
                </button>
              </div>
            </div>

            {/* Contenu de l'onglet */}
            <div className="p-8">
              {activeTab === 'profile' ? (
                <div className="space-y-8">
                  {/* Informations personnelles */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-lg font-semibold text-white">Informations personnelles</h2>
                      {!isEditing ? (
                        <button
                          onClick={() => setIsEditing(true)}
                          className="text-red-400 hover:text-red-300 text-sm font-medium flex items-center gap-2"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                          </svg>
                          Modifier
                        </button>
                      ) : (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={handleCancel}
                            className="text-white/60 hover:text-white text-sm font-medium"
                          >
                            Annuler
                          </button>
                          <button
                            onClick={handleSave}
                            disabled={isSaving}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                          >
                            {isSaving ? (
                              <>
                                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                                </svg>
                                Sauvegarde...
                              </>
                            ) : (
                              'Sauvegarder'
                            )}
                          </button>
                        </div>
                      )}
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-white/70 mb-1">Nom complet</label>
                        <input
                          type="text"
                          name="name"
                          value={isEditing ? editedData.name : userData.name}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-2 bg-white/5 border rounded-lg text-white transition-colors ${
                            isEditing 
                              ? 'border-red-500/50 focus:border-red-500 focus:ring-2 focus:ring-red-500/20' 
                              : 'border-white/10'
                          }`}
                          readOnly={!isEditing}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-white/70 mb-1">Email</label>
                        <input
                          type="email"
                          name="email"
                          value={isEditing ? editedData.email : userData.email}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-2 bg-white/5 border rounded-lg text-white transition-colors ${
                            isEditing 
                              ? 'border-red-500/50 focus:border-red-500 focus:ring-2 focus:ring-red-500/20' 
                              : 'border-white/10'
                          }`}
                          readOnly={!isEditing}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Abonnement */}
                  <div>
                    <h2 className="text-lg font-semibold text-white mb-4">Abonnement</h2>
                    <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="text-white font-medium">Plan {userData.subscription}</p>
                          <p className="text-white/60 text-sm">Prochain paiement le {userData.nextPayment}</p>
                        </div>
                        <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">
                          Actif
                        </span>
                      </div>
                      <button className="text-red-400 hover:text-red-300 text-sm font-medium">
                        Gérer l'abonnement
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-8">
                  {/* Paramètres du compte */}
                  <div>
                    <h2 className="text-lg font-semibold text-white mb-4">Paramètres du compte</h2>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                        <div>
                          <p className="text-white font-medium">Notifications par email</p>
                          <p className="text-white/60 text-sm">Recevoir des mises à jour sur votre compte</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-500"></div>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Actions du compte */}
                  <div>
                    <h2 className="text-lg font-semibold text-white mb-4">Actions du compte</h2>
                    <div className="space-y-4">
                      <button
                        onClick={handleLogout}
                        className="w-full px-4 py-2 bg-red-500/20 text-red-400 rounded-lg border border-red-500/20 hover:bg-red-500/30 transition-colors"
                      >
                        Se déconnecter
                      </button>
                      <button className="w-full px-4 py-2 bg-white/5 text-white/70 rounded-lg border border-white/10 hover:bg-white/10 transition-colors">
                        Supprimer le compte
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 
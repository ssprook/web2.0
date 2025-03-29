"use client";

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Cookies from 'js-cookie';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface AccountMenuProps {
  onLogout: () => void;
}

export function AccountMenu({ onLogout }: AccountMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'logout' }),
      });

      if (response.ok) {
        onLogout();
      } else {
        console.error('Erreur lors de la déconnexion');
      }
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          className="bg-gradient-to-r from-red-500 to-purple-600 text-white px-6 py-2 rounded-full hover:opacity-90 transition-all"
        >
          Mon compte
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48 bg-black/90 backdrop-blur-lg border border-white/10">
        <DropdownMenuLabel className="text-white/70">Mon profil</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-white/10" />
        <DropdownMenuItem 
          className="text-white/70 hover:text-white hover:bg-white/10 cursor-pointer"
          onClick={() => window.location.href = '/account'}
        >
          Paramètres
        </DropdownMenuItem>
        <DropdownMenuItem 
          className="text-white/70 hover:text-white hover:bg-white/10 cursor-pointer"
          onClick={handleLogout}
        >
          Se déconnecter
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 
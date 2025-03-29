"use server";

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { jwtVerify, SignJWT } from 'jose';

// Simuler une base de données d'utilisateurs
const users = [
  {
    id: 1,
    name: 'Test User',
    email: 'test@example.com',
    password: 'password123' // Dans un vrai projet, le mot de passe devrait être hashé
  }
];

const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'your-secret-key');

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, email, password, name } = body;

    switch (action) {
      case 'register':
        if (!email || !password || !name) {
          return NextResponse.json(
            { error: 'Tous les champs sont requis' },
            { status: 400 }
          );
        }

        // Vérifier si l'utilisateur existe déjà
        if (users.some(user => user.email === email)) {
          return NextResponse.json(
            { error: 'Un compte avec cet email existe déjà' },
            { status: 400 }
          );
        }

        // Créer un nouvel utilisateur
        const newUser = {
          id: users.length + 1,
          name,
          email,
          password // Dans un vrai projet, hasher le mot de passe
        };
        users.push(newUser);

        // Créer un token
        const token = await new SignJWT({ userId: newUser.id, email: newUser.email })
          .setProtectedHeader({ alg: 'HS256' })
          .setIssuedAt()
          .setExpirationTime('24h')
          .sign(secret);

        // Créer la réponse avec le cookie
        const registerResponse = NextResponse.json({ success: true });
        registerResponse.cookies.set('auth_token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 60 * 60 * 24 // 24 heures
        });

        return registerResponse;

      case 'login':
        if (!email || !password) {
          return NextResponse.json(
            { error: 'Email et mot de passe requis' },
            { status: 400 }
          );
        }

        const user = users.find(u => u.email === email && u.password === password);
        if (!user) {
          return NextResponse.json(
            { error: 'Email ou mot de passe incorrect' },
            { status: 401 }
          );
        }

        // Créer un token
        const loginToken = await new SignJWT({ userId: user.id, email: user.email })
          .setProtectedHeader({ alg: 'HS256' })
          .setIssuedAt()
          .setExpirationTime('24h')
          .sign(secret);

        // Créer la réponse avec le cookie
        const loginResponse = NextResponse.json({ success: true });
        loginResponse.cookies.set('auth_token', loginToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 60 * 60 * 24 // 24 heures
        });

        return loginResponse;

      case 'logout':
        // Créer la réponse et supprimer le cookie
        const logoutResponse = NextResponse.json({ success: true });
        logoutResponse.cookies.delete('auth_token');
        return logoutResponse;

      case 'getUser':
        const authToken = request.headers.get('cookie')?.split(';').find(c => c.trim().startsWith('auth_token='))?.split('=')[1];
        if (!authToken) {
          return NextResponse.json(
            { error: 'Non authentifié' },
            { status: 401 }
          );
        }

        try {
          const { payload } = await jwtVerify(authToken, secret);
          const user = users.find(u => u.id === payload.userId);
          if (!user) {
            return NextResponse.json(
              { error: 'Utilisateur non trouvé' },
              { status: 404 }
            );
          }

          // Ne pas renvoyer le mot de passe
          const { password: _, ...userWithoutPassword } = user;
          return NextResponse.json({ 
            success: true,
            user: userWithoutPassword
          });
        } catch (error) {
          return NextResponse.json(
            { error: 'Token invalide' },
            { status: 401 }
          );
        }

      case 'updateUser':
        const updateToken = request.headers.get('cookie')?.split(';').find(c => c.trim().startsWith('auth_token='))?.split('=')[1];
        if (!updateToken) {
          return NextResponse.json(
            { error: 'Non authentifié' },
            { status: 401 }
          );
        }

        try {
          const { payload } = await jwtVerify(updateToken, secret);
          const userIndex = users.findIndex(u => u.id === payload.userId);
          if (userIndex === -1) {
            return NextResponse.json(
              { error: 'Utilisateur non trouvé' },
              { status: 404 }
            );
          }

          if (name) {
            users[userIndex].name = name;
          }

          const { password: _, ...updateUserWithoutPassword } = users[userIndex];
          return NextResponse.json({ 
            success: true,
            user: updateUserWithoutPassword
          });
        } catch (error) {
          return NextResponse.json(
            { error: 'Token invalide' },
            { status: 401 }
          );
        }

      default:
        return NextResponse.json(
          { error: 'Action non supportée' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Erreur d\'authentification:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
} 
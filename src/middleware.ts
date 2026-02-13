import { NextResponse } from "next/server";

/**
 * Middleware de protection des routes admin.
 * Note: L'auth réelle est gérée côté client (localStorage) car les tokens
 * ne doivent pas être exposés dans les headers de requêtes statiques.
 * Ce middleware pourrait être étendu pour vérifier un cookie httpOnly si
 * l'auth est migrée vers des cookies sécurisés.
 */
export function middleware() {
  // Les routes admin restent accessibles ; l'auth est vérifiée dans le layout
  // et les pages affichent le formulaire de login ou AuthGate si non connecté.
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};

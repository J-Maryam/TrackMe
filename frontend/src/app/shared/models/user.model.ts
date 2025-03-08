// Interface pour les données d'entrée de l'utilisateur (email et mot de passe)
export interface User {
  email: string;
  password: string;
}

// Interface pour la réponse d'authentification du serveur
export interface AuthResponse {
  token: string;
  role?: string; // Optionnel : rôle de l'utilisateur (ex. "admin" ou "caregiver")
}

// Interface pour les données d'entrée de l'utilisateur (email et mot de passe)
export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  role?: 'ROLE_ADMIN' | 'ROLE_USER';
  address?: string;
  telephone?: string;
}

// Interface pour la réponse d'authentification du serveur
export interface AuthResponse {
  token: string;
  role?: string;
}

// Interface pour les données d'entrée de l'utilisateur (email et mot de passe)
export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  role: string;
  address: string;
  phoneNumber: string;
}

// Interface pour la réponse d'authentification du serveur
export interface AuthResponse {
  token: string;
  role?: string;
}

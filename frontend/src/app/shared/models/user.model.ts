// Interface pour les données récupérées (sans password)
export interface UserResponse {
  id: string;
  username: string;
  email: string;
  role: string;
  address: string;
  phoneNumber: string;
}

// Interface pour la réponse d'authentification du serveur
export interface AuthResponse {
  token: string;
  role?: string;
}

// Interface pour les données récupérées (sans password)
export interface UserResponse {
  id: string;
  username: string;
  email: string;
  role: string;
  address: string;
  phoneNumber: string;
}

// Interface pour les données d'entrée (avec password pour création/mise à jour)
export interface User {
  id?: string; // Optionnel pour création
  username: string;
  email: string;
  password?: string; // Optionnel, utilisé pour création/mise à jour
  role: string;
  address: string;
  phoneNumber: string;
}

// Interface pour la réponse d'authentification du serveur
export interface AuthResponse {
  token: string;
  role?: string;
}

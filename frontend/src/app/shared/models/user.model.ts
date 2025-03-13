// Interface pour les données récupérées (sans password)
export interface UserResponse {
  id: string;
  username: string;
  email: string;
  role: string;
  address: string;
  phoneNumber: string;
  enabled: boolean;
}

export interface User {
  id?: string;
  username: string;
  email: string;
  password?: string;
  role: string;
  address: string;
  phoneNumber: string;
  enabled?: boolean;
}

export interface AuthResponse {
  token: string;
  role?: string;
  enabled?: boolean;
}

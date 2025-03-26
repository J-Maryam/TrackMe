// Interface pour les données récupérées (sans password)
export interface UserResponse {
  id?: number;
  username: string;
  email: string;
  role: string;
  address: string;
  phoneNumber: string;
  enabled: boolean;
}

export interface User {
  id?: number;
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
  id: number;
  username: string;
  email: string;
  role: string;
  address: string;
  phoneNumber: string;
  enabled: boolean;
}

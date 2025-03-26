import {User} from './user.model';

export interface Patient {
  id: number;
  username: string;
  dateOfBirth: string;
  user: User
}

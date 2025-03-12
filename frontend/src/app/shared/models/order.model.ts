import { Bracelet } from './bracelet.model';
import { User } from './user.model';
import { Patient } from './patient.model';

export interface Order {
  id: number;
  bracelet: Bracelet;
  user: User;
  patient: Patient;
  orderDate: string | null;
}

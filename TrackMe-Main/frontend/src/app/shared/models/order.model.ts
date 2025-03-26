import { Bracelet } from './bracelet.model';
import { User } from './user.model';
import { Patient } from './patient.model';
import {Payment} from './payment.model';

export interface Order {
  id: number;
  bracelet: Bracelet;
  user: User;
  patient: Patient;
  payment: Payment;
  orderDate: string | null;
}

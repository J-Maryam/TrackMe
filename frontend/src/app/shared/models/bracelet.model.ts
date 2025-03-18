import {Patient} from './patient.model';

export interface Bracelet {
  id: number;
  serialNumber: string;
  status: string;
  state: string;
  color: string;
  patient: Patient;
}

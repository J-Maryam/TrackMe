import {Patient} from './patient.model';

export interface Bracelet {
  id: number;
  serialNumber: string;
  status: string;
  color: string;
  patient: Patient;
}

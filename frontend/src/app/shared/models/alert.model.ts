import {Bracelet} from './bracelet.model';

export interface AlertModel {
  id: number;
  message: string;
  timestamp: string;
  status: 'UNRESOLVED' | 'RESOLVED';
  type: 'OUT_OF_SAFE_ZONE' | 'BACK_IN_SAFE_ZONE' | 'LOW_BATTERY' | 'NO_SIGNAL' | 'SOS_TRIGGERED';
  bracelet: Bracelet
}

import { FirebaseMap } from './utils';

export enum FirebaseOrderStatus {
  Pending = 'p',
  Processing = 'pr',
  Ready = 'r',
  Completed = 'c'
}

export interface FirebaseOrder {
  s: FirebaseOrderStatus;
}

export type FirebaseOrders = FirebaseMap<FirebaseOrder>;

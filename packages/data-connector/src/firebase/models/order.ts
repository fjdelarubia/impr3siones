export enum FirebaseOrderStatus {
  Pending = 'p',
  Processing = 'pr',
  Ready = 'r',
  Completed = 'c'
}

export interface FirebaseOrder {
  i: string;
  s: FirebaseOrderStatus;
}

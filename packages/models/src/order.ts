export enum OrderStatus {
  Pending = 'pending',
  Processing = 'processing',
  Ready = 'ready',
  Completed = 'completed'
}

export interface Order {
  id: string;
  status: OrderStatus;
}

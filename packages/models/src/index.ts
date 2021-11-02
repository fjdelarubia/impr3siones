export interface Order {
  id: string;
  status: 'pending' | 'processing' | 'ready' | 'completed';
}

export type ToastType = 'info' | 'warning' | 'error' | 'success';

export interface ToastMessage {
  id: string;
  type: ToastType;
  message: string;
}

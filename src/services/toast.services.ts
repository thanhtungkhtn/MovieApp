import { Status } from '@/hooks/useShowToast';

type ToastController = {
  showToast: (status: Status, message: string) => void;
} | null;

let toastControllerRef: ToastController = null;

export const setToastRef = (ref: ToastController) => {
  toastControllerRef = ref;
};

export const showToast = (status: Status, message: string) => {
  if (!toastControllerRef) {
    console.warn('Toast ref is not set');
    return
  } 
  toastControllerRef.showToast(status, message);
};

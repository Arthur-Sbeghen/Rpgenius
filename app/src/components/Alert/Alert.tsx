// utils/alert.ts
import Swal from "sweetalert2";

type AlertType = "success" | "error" | "warning" | "info" | "question";

interface AlertOptions {
  title?: string;
  text?: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
  showCancelButton?: boolean;
  showConfirmButton?: boolean;
  timer?: number;
  timerProgressBar?: boolean;
  confirmButtonColor?: string;
  html?: string;
}

export const showAlert = (
  type: AlertType,
  message: string,
  options: AlertOptions = {}
) => {
  const defaultOptions = {
    text: message,
    showCancelButton: false,
    ...options,
  };

  return Swal.fire({
    icon: type,
    theme: "dark",
    ...defaultOptions,
  });
};

// Alertas mais simples
export const Alert = {
  success: (message: string, options?: AlertOptions) =>
    showAlert("success", message, options),
  error: (message: string, options?: AlertOptions) =>
    showAlert("error", message, options),
  warning: (message: string, options?: AlertOptions) =>
    showAlert("warning", message, options),
  info: (message: string, options?: AlertOptions) =>
    showAlert("info", message, options),
  confirm: (message: string, options?: AlertOptions) =>
    showAlert("question", message, { showCancelButton: true, ...options }),
};

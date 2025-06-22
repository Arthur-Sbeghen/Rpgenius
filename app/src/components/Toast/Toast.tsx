// utils/toast.ts
import {
  toast,
  ToastContainer as ReactToastContainer,
  TypeOptions,
} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Tipos semelhantes ao Alert
export type ToastType = "success" | "error" | "warning" | "info" | "question";

export interface ToastOptions {
  position?:
    | "top-right"
    | "top-left"
    | "top-center"
    | "bottom-right"
    | "bottom-left"
    | "bottom-center";
  title?: string;
  text?: string;
  theme?: "light" | "dark" | "colored";
  message?: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
  showCancelButton?: boolean;
  showConfirmButton?: boolean;
  timer?: number;
  timerProgressBar?: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
  html?: string;
}

const showToast = (
  type: ToastType,
  message: string,
  options: ToastOptions = {}
) => {
  const finalMessage = options.text || message || options.message || "";
  const {
    title,
    cancelButtonText,
    confirmButtonText,
    showConfirmButton = type === "question" ? true : options.showConfirmButton,
    showCancelButton = type === "question" ? true : options.showCancelButton,
    onConfirm,
    onCancel,
    html,
    timer,
    timerProgressBar,
    ...toastOptions
  } = options;

  const content = (
    <div className="custom-toast">
      {title && <h4 className="toast-title">{title}</h4>}
      {html ? (
        <div dangerouslySetInnerHTML={{ __html: html }} />
      ) : (
        <p className="toast-message">{finalMessage}</p>
      )}
      {(showConfirmButton || showCancelButton) && (
        <div className="toast-buttons">
          {showCancelButton && (
            <button
              className="toast-button cancel"
              onClick={() => {
                onCancel?.();
                toast.dismiss();
              }}
            >
              {cancelButtonText}
            </button>
          )}
          {showConfirmButton && (
            <button
              className="toast-button confirm"
              onClick={() => {
                onConfirm?.();
                toast.dismiss();
              }}
            >
              {confirmButtonText}
            </button>
          )}
        </div>
      )}
    </div>
  );

  return toast(content, {
    type: type === "question" ? "default" : type,
    theme: "dark",
    position: "bottom-right",
    autoClose: 1500,
    hideProgressBar: !timerProgressBar,
    ...toastOptions,
  });
};

export const Toast = {
  success: (message: string, options?: ToastOptions) =>
    showToast("success", message, options),
  error: (message: string, options?: ToastOptions) =>
    showToast("error", message, options),
  warning: (message: string, options?: ToastOptions) =>
    showToast("warning", message, options),
  info: (message: string, options?: ToastOptions) =>
    showToast("info", message, options),
  confirm: (message: string, options?: ToastOptions) =>
    showToast("question", message, {
      showCancelButton: true,
      showConfirmButton: true,
      ...options,
    }),
  dismiss: toast.dismiss,
};

export const ToastContainer = () => (
  <div className="toast-provider">
    <ReactToastContainer
      position="top-right"
      newestOnTop
      closeOnClick={false}
      draggable
      pauseOnHover
      theme="colored"
      toastClassName="custom-toast-wrapper"
      progressClassName="toast-progress-bar"
    />
  </div>
);

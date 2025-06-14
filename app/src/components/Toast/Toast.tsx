// utils/toast.ts
import { toast, TypeOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type ToastType = TypeOptions | "question"; // Adicionamos o tipo question para compatibilidade

interface ToastOptions {
  title?: string;
  message: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
  showConfirmButton?: boolean;
  showCancelButton?: boolean;
  timer?: number;
  timerProgressBar?: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
  html?: string;
}

const showToast = (
  type: ToastType,
  message: string,
  options: Omit<ToastOptions, "message"> = {}
) => {
  const {
    title,
    confirmButtonText = "OK",
    showConfirmButton = type !== "question",
    showCancelButton = type === "question",
    onConfirm,
    onCancel,
    html,
    ...toastOptions
  } = options;

  const content = (
    <div className="custom-toast">
      {title && <h4 className="toast-title">{title}</h4>}
      {html ? (
        <div dangerouslySetInnerHTML={{ __html: html }} />
      ) : (
        <p className="toast-message">{message}</p>
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
              {options.cancelButtonText || "Cancelar"}
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
    autoClose: options.timer || (type === "error" ? 5000 : 3000),
    hideProgressBar: !options.timerProgressBar,
    closeButton: false,
    ...toastOptions,
  });
};

export const Toast = {
  success: (message: string, options?: Omit<ToastOptions, "message">) =>
    showToast("success", message, options),
  error: (message: string, options?: Omit<ToastOptions, "message">) =>
    showToast("error", message, options),
  warning: (message: string, options?: Omit<ToastOptions, "message">) =>
    showToast("warning", message, options),
  info: (message: string, options?: Omit<ToastOptions, "message">) =>
    showToast("info", message, options),
  confirm: (message: string, options?: Omit<ToastOptions, "message">) =>
    showToast("question", message, {
      showCancelButton: true,
      showConfirmButton: true,
      ...options,
    }),
  dismiss: toast.dismiss,
};

export const ToastContainer = () => (
  <div className="toast-provider">
    <ToastContainer
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

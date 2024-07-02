import React, { useEffect } from "react";

type ToastPorps = {
  message: string;
  type: "SUCCESS" | "ERROR";
  onClose: () => void;
};

function Toast({ message, type, onClose }: ToastPorps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  return (
    <div
      className={`${
        type === "SUCCESS" ? "text-green-500" : "text-red-600"
      } text-3xl`}
    >
      {message}
    </div>
  );
}

export default Toast;

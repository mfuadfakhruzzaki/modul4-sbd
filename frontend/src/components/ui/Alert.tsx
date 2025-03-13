import React from "react";

interface AlertProps {
  type: "success" | "error" | "warning" | "info";
  message: string;
  onClose?: () => void;
}

const Alert: React.FC<AlertProps> = ({ type, message, onClose }) => {
  let bgColor = "";
  let textColor = "text-black";

  switch (type) {
    case "success":
      bgColor = "bg-green-400";
      break;
    case "error":
      bgColor = "bg-primary";
      textColor = "text-white";
      break;
    case "warning":
      bgColor = "bg-accent";
      break;
    case "info":
      bgColor = "bg-secondary";
      textColor = "text-white";
      break;
  }

  return (
    <div
      className={`${bgColor} ${textColor} p-4 border-3 border-black shadow-neo mb-4`}
    >
      <div className="flex justify-between items-center">
        <div className="font-bold">{message}</div>
        {onClose && (
          <button
            onClick={onClose}
            className="font-bold text-xl"
            aria-label="Close"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
};

export default Alert;

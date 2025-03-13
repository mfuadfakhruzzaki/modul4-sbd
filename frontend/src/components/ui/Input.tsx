import React from "react";

interface InputProps {
  id: string;
  type?: string;
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
  className?: string;
}

const Input: React.FC<InputProps> = ({
  id,
  type = "text",
  label,
  placeholder,
  value,
  onChange,
  error,
  required = false,
  className = "",
}) => {
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={id} className="block mb-2 font-bold text-lg">
          {label}
          {required && <span className="text-primary ml-1">*</span>}
        </label>
      )}
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className={`neo-input ${error ? "border-primary" : ""} ${className}`}
      />
      {error && <p className="mt-1 text-primary font-medium">{error}</p>}
    </div>
  );
};

export default Input;

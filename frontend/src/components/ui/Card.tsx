import React from "react";

interface CardProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
  hover?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  title,
  className = "",
  hover = false,
}) => {
  const hoverClass = hover
    ? "hover:-translate-y-1 hover:-translate-x-1 hover:shadow-neo-lg"
    : "";

  return (
    <div className={`neo-card ${hoverClass} ${className}`}>
      {title && <h3 className="text-2xl font-bold mb-4">{title}</h3>}
      {children}
    </div>
  );
};

export default Card;

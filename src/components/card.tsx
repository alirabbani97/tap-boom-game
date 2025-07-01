import React, { ReactNode, CSSProperties } from "react";

interface CardProps {
  header?: ReactNode;
  children: ReactNode;
  actions?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

const Card: React.FC<CardProps> = ({
  header,
  children,
  actions,
  className,
  style,
}) => {
  return (
    <div
      className={`card bg-base-100 shadow-xl rounded-3xl border-2 border-primary ${
        className || ""
      }`}
      style={style}
    >
      {header && (
        <div className="card-title bg-primary text-white text-2xl font-extrabold rounded-t-3xl px-6 py-4 flex items-center justify-center">
          {header}
        </div>
      )}
      {children}
      {actions && (
        <div className="card-actions p-4 flex justify-center">{actions}</div>
      )}
    </div>
  );
};

export default Card;

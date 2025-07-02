import React from "react";

type ScreenOverlayProps = {
  show: boolean;
  children?: React.ReactNode;
  zIndex?: number;
  className?: string;
};

const ScreenOverlay: React.FC<ScreenOverlayProps> = ({
  show,
  children,
  zIndex = 40,
  className = "",
}) => {
  if (!show) return null;
  return (
    <div>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 pointer-events-auto w-full h-full left-0 top-0 z-[${zIndex}] ${className}`}
        style={{ zIndex }}
      />
      {/* Content (modal, alert, etc.) */}
      {children}
    </div>
  );
};

export default ScreenOverlay;

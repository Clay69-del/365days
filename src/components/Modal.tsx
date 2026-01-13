import React from "react";

type ModalProps = {
  open: boolean;
  title?: string;
  children?: React.ReactNode;
  onClose: () => void;
};

export default function Modal({ open, title, children, onClose }: ModalProps) {
  if (!open) return null;
  return (
    <div
      className="modalOverlay"
      role="dialog"
      aria-modal="true"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modalCard">
        {title && <h3 className="modalTitle">{title}</h3>}
        {children}
      </div>
    </div>
  );
}
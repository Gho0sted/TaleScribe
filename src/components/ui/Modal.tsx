/**
 * Generic modal wrapper
 * Универсальная обертка модального окна
 */
import React from 'react';

export const Modal = ({
  open,
  children,
}: {
  open: boolean;
  children: React.ReactNode;
}) => {
  if (!open) return null;
  return <div className="modal">{children}</div>;
};

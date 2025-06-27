/**
 * Basic styled button wrapper
 * Базовая обертка стилизованной кнопки
 */
import React from 'react';

export const Button = ({
  children,
  className = '',
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    {...props}
    className={`btn-primary text-base sm:text-sm ${className}`}
  >
    {children}
  </button>
);

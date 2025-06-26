/**
 * Basic styled button wrapper
 * Базовая обертка стилизованной кнопки
 */
import React from 'react';

export const Button = ({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button {...props}>{children}</button>
);

/**
 * Form input with shared styles
 * Поле ввода с общими стилями
 */
import React from 'react';

export const Input = ({ className = '', ...props }: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input {...props} className={`input text-base sm:text-sm ${className}`} />
);

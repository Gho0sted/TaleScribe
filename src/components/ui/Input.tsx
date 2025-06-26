/**
 * Form input with shared styles
 * Поле ввода с общими стилями
 */
import React from 'react';

export const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input {...props} />
);

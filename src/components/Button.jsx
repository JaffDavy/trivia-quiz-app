import React from 'react';
import './Button.css';

const Button = ({ onClick, children, variant = 'primary', disabled = false }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`button ${variant}`}
    >
      {children}
    </button>
  );
};

export default Button;

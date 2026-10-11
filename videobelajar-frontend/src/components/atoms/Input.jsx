import React from "react";

// Menggunakan properti dynamic 'type' agar bisa berubah menjadi 'email', 'text', atau 'password'
const Input = ({ type = "text", placeholder, className = "", ...props }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`flex-1 px-3 py-1.5 text-xs text-gray-800 focus:outline-none bg-transparent ${className}`}
      {...props}
    />
  );
};

export default Input;

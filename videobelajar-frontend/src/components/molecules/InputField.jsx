import React, { useState } from "react";
import eyeIcon from "../../assets/brands/eye-icon.png";
import Input from "../atoms/Input";

const InputField = ({
  label,
  type = "text",
  placeholder,
  name,
  required = false,
  value,
  onChange,
  children,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  return (
    <div className="mb-3.5 text-left w-full font-sans">
      <label className="block text-gray-700 text-xs font-medium mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <div className="relative flex items-center w-full h-9 px-3 py-1.5 border border-gray-300 rounded-lg focus-within:ring-1 focus-within:ring-[#2ECC71] focus-within:border-[#2ECC71] transition-all bg-white gap-2 box-border">
        {children}

        <Input
          type={isPassword && showPassword ? "text" : type}
          name={name}
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={onChange}
          className="w-full text-xs text-gray-800 focus:outline-none bg-transparent m-0 p-0 h-full placeholder-gray-300"
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="focus:outline-none shrink-0 ml-1.5"
          >
            <img
              src={eyeIcon}
              alt="Lihat Sandi"
              className={`w-4 h-4 object-contain transition-opacity duration-200 ${showPassword ? "opacity-40" : "opacity-100"}`}
            />
          </button>
        )}
      </div>
    </div>
  );
};

export default InputField;

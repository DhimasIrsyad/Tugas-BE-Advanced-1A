import React from "react";

const CategoryTabItem = ({ label, isActive, onClick }) => {
  return (
    <span
      onClick={onClick}
      className={`pb-1.5 cursor-pointer text-xs md:text-sm font-bold transition-all duration-200 whitespace-nowrap ${
        isActive
          ? "text-red-500 border-b-2 border-red-500"
          : "text-gray-500 hover:text-gray-900"
      }`}
    >
      {label}
    </span>
  );
};

export default CategoryTabItem;

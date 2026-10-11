import React from "react";

const NavLink = ({ children, onClick }) => {
  return (
    <span
      onClick={onClick}
      className="text-sm font-semibold text-gray-600 cursor-pointer hover:text-[#2ECC71] transition-all"
    >
      {children}
    </span>
  );
};

export default NavLink;

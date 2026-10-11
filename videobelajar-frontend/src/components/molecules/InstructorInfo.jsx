import React from "react";

const InstructorInfo = ({ avatar, name, role }) => {
  return (
    <div className="flex items-center gap-2 mt-2">
      <img
        src={avatar}
        alt={name}
        className="w-7 h-7 rounded-full object-cover border border-gray-100"
      />
      <div className="text-left leading-tight">
        <h4 className="text-[11px] font-bold text-gray-900">{name}</h4>
        <p className="text-[9px] text-gray-400 font-medium">{role}</p>
      </div>
    </div>
  );
};

export default InstructorInfo;

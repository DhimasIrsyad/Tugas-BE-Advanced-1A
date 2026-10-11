import React from "react";
import avatarProfil from "../../assets/courses/avatar-profil.png";

const NavAvatar = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="w-9 h-9 rounded-full bg-orange-100 border border-gray-200 overflow-hidden cursor-pointer flex items-center justify-center"
    >
      <img
        src={avatarProfil}
        alt="Profil"
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default NavAvatar;

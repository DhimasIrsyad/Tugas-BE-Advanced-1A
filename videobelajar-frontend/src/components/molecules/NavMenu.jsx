import React from "react";
import NavLink from "../atoms/NavLink";
import NavAvatar from "../atoms/NavAvatar";

const NavMenu = ({ onAction }) => {
  return (
    <div className="flex items-center gap-6">
      <NavLink onClick={() => onAction("login")}>Kategori</NavLink>
      <NavAvatar onClick={() => onAction("profile")} />
    </div>
  );
};

export default NavMenu;

import React from "react";
// Memanggil Atom CompanyLogo yang sudah dibuat pada folder atoms saat merapikan footer sebelumnya
import CompanyLogo from "../atoms/CompanyLogo";
import NavMenu from "../molecules/NavMenu";

const Navbar = ({ onNavigate }) => {
  return (
    <nav className="w-full bg-white border-b border-gray-100 px-6 md:px-12 py-4 flex justify-center sticky top-0 z-50 shadow-sm font-sans">
      <div className="w-full max-w-7xl flex justify-between items-center">
        {/* LOGO DIKUNCI DI KIRI */}
        <div onClick={() => onNavigate("home")} className="cursor-pointer">
          <CompanyLogo />
        </div>

        {/* SISI KANAN: MEMANGGIL MOLEKUL MENU NAVIGASI PROFILE */}
        <NavMenu onAction={onNavigate} />
      </div>
    </nav>
  );
};

export default Navbar;

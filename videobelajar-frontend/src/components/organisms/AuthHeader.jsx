import React from "react";
// KUNCI UTAMA: Menggunakan komponen atom CompanyLogo yang sudah ada sejak awal
import CompanyLogo from "../atoms/CompanyLogo";

const AuthHeader = ({ onNavigate }) => {
  return (
    <header className="w-full bg-white border-b border-gray-100 px-6 md:px-12 py-4 flex justify-center sticky top-0 z-50 shadow-sm font-sans">
      <div className="w-full max-w-5xl flex justify-start items-center">
        {/* Memberikan fungsi navigasi kembali ke Home saat logo diklik */}
        <div onClick={() => onNavigate("home")} className="cursor-pointer">
          {/* Cukup panggil tanpa className tambahan karena ukuran default h-9 sudah pas untuk header */}
          <CompanyLogo />
        </div>
      </div>
    </header>
  );
};

export default AuthHeader;

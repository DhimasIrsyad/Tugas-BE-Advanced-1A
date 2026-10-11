import React from "react";
import CompanyLogo from "../atoms/CompanyLogo";

const CompanyProfile = () => {
  return (
    <div className="md:col-span-4 flex flex-col items-start space-y-4 pb-4 border-b border-gray-50 md:border-none">
      {/* Memanggil Atom Logo */}
      <CompanyLogo />

      <p className="font-bold text-gray-800 text-sm leading-relaxed max-w-sm m-0">
        Gali Potensi Anda Melalui Pembelajaran Video di hariesok.id!
      </p>

      <div className="font-semibold text-gray-600 flex flex-col gap-1.5 leading-relaxed m-0 text-xs md:text-[13px]">
        <p>Jl. Usman Effendi No. 50 Lowokwaru, Malang</p>
        <p>+62-877-7123-1234</p>
      </div>
    </div>
  );
};

export default CompanyProfile;

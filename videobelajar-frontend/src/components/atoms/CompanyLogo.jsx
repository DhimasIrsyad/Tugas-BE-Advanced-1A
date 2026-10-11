import React from "react";
import logoVideobelajar from "../../assets/brands/logo-videobelajar.png";

// Kita beri props className agar jarak margin/ukurannya bisa disesuaikan dari luar
const CompanyLogo = ({ className = "" }) => {
  return (
    <div className={`h-9 flex items-center justify-start ${className}`}>
      <img
        src={logoVideobelajar}
        alt="videobelajar"
        className="h-full w-auto object-contain block m-0 p-0 text-left"
      />
    </div>
  );
};

export default CompanyLogo;

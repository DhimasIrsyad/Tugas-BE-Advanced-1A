import React from "react";
import logoVideobelajar from "../../assets/brands/logo-videobelajar.png";

// Impor komponen Atom & Molecule pendukung Atomic Design Anda
import CopyrightText from "../atoms/CopyrightText";
import CompanyProfile from "../molecules/CompanyProfile";
import FooterNavGroup from "../molecules/FooterNavGroup";
import SocialGroup from "../molecules/SocialGroup";

// KUNCI UTAMA: Mengambil data eksternal dari gudang konstanta terpisah
import { navigationData, socialData } from "../../constants/footerData";

const Footer = () => {
  return (
    <footer className="w-full bg-white border-t border-gray-100 pt-10 md:pt-14 pb-8 text-[13px] text-gray-500 font-sans">
      {/* Container utama grid */}
      <div className="max-w-5xl mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 mb-10 md:mb-12 text-left">
        {/* Memanggil Molecule Profil Perusahaan */}
        <CompanyProfile />

        {/* Area Navigasi Menu NavGroup - Datanya diambil langsung dari constants */}
        <div className="md:col-span-8 flex flex-col md:flex-row flex-wrap justify-between md:justify-end gap-1 md:gap-14 lg:gap-20">
          {navigationData.map((group, index) => (
            <FooterNavGroup
              key={index}
              title={group.title}
              links={group.links}
            />
          ))}
        </div>
      </div>

      {/* Bagian Copyright Bar Bawah */}
      <div className="max-w-5xl mx-auto px-4 md:px-6 border-t border-gray-100 pt-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-gray-500 font-medium text-left">
        {/* Memanggil Molecule Kumpulan Sosial Media - Datanya diambil langsung dari constants */}
        <div className="flex justify-start w-full md:w-auto md:order-last">
          <SocialGroup items={socialData} />
        </div>

        {/* Memanggil Atom Teks Copyright */}
        <CopyrightText>©2023 Gerobak Sayur All Rights Reserved.</CopyrightText>
      </div>
    </footer>
  );
};

export default Footer;

import React, { useState } from "react";

const FooterNavGroup = ({ title, links }) => {
  // State untuk melacak buka/tutup menu khusus di layar HP
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full md:w-auto md:min-w-[110px] border-b border-gray-100 md:border-none">
      {/* Tombol Header Menu: Di mobile bisa diklik, di desktop bertindak sebagai judul biasa */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center py-3.5 md:py-0 md:cursor-default text-left focus:outline-none"
      >
        <h5 className="font-bold text-gray-900 text-sm md:mb-4">{title}</h5>

        {/* Ikon Panah: Hanya muncul di layar HP (hidden md:block menyembunyikannya di PC) */}
        <span
          className={`text-gray-400 font-normal transition-transform duration-200 md:hidden ${isOpen ? "rotate-90" : ""}`}
        >
          <svg
            xmlns="http://w3.org"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="w-3.5 h-3.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </span>
      </button>

      {/* PERBAIKAN UTAMA: Tambahkan md:block agar di PC daftar list dipaksa tampil menyamping dan selalu terbuka */}
      <ul
        className={`font-medium text-gray-500 overflow-hidden transition-all duration-300 pb-4 md:pb-0 md:block md:space-y-3 ${isOpen ? "block space-y-3" : "hidden"}`}
      >
        {links.map((link, index) => (
          <li
            key={index}
            className="hover:text-gray-900 cursor-pointer transition-colors pl-1 md:pl-0 text-xs md:text-[13px]"
          >
            {link}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterNavGroup;

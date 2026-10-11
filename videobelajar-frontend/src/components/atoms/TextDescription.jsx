import React from "react";

const TextDescription = ({ children, variant = "section", className = "" }) => {
  // Kamus kombinasi kelas Tailwind untuk masing-masing paragraf asli Anda
  const styles = {
    // Pengganti HeroDescription (Abu-abu terang, ada md:text-xs, max-w-2xl)
    hero: "text-[11px] md:text-xs text-gray-300 font-normal leading-relaxed max-w-2xl opacity-90",

    // Pengganti NewsletterDescription (Abu-abu terang, mb-4, max-w-lg)
    newsletter:
      "text-[11px] text-gray-300 mb-4 font-normal leading-relaxed max-w-lg",

    // Pengganti SectionSubtitle (Abu-abu gelap text-gray-500, mb-4, rata kiri)
    section: "text-xs md:text-sm text-gray-500 mb-4 text-left",
  };

  return <p className={`${styles[variant]} ${className}`}>{children}</p>;
};

export default TextDescription;

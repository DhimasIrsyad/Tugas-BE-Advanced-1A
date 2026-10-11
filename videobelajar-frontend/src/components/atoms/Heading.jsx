import React from "react";

const Heading = ({ children, variant = "section", className = "" }) => {
  // Kamus kombinasi kelas Tailwind untuk masing-masing tipe judul asli Anda
  const styles = {
    // Pengganti HeroTitle (Tag h1, teks putih besar tebal)
    hero: "text-xl md:text-3xl font-extrabold text-white leading-tight tracking-wide max-w-2xl",

    // Pengganti NewsletterTitle (Tag h3, teks putih sedang tebal)
    newsletter: "text-xl font-bold text-white mb-1",

    // Pengganti SectionTitle (Tag h3, teks gray-900 dasar rata kiri)
    section: "text-xl md:text-2xl font-bold text-gray-900 mb-0.5 text-left",
  };

  // Secara dinamis menentukan tag HTML yang dipakai: 'h1' khusus untuk hero, sisanya menggunakan 'h3'
  const Tag = variant === "hero" ? "h1" : "h3";

  return <Tag className={`${styles[variant]} ${className}`}>{children}</Tag>;
};

export default Heading;

import React from "react";
import newsletterBg from "../../assets/banners/newsletter.png";

// Impor komponen Atom yang baru dibuat
import NewsletterCategory from "../atoms/NewsletterCategory";
import Heading from "../atoms/Heading";
import TextDescription from "../atoms/TextDescription";

// Impor komponen Molecule Form
import NewsletterForm from "../molecules/NewsletterForm";

const NewsletterBlock = () => {
  const handleSubscribe = (e) => {
    e.preventDefault();
  };

  return (
    <section className="w-full max-w-5xl mx-auto px-4 md:px-6 py-6 flex justify-center bg-[#fffdf3] font-sans">
      <div className="w-full relative rounded-xl overflow-hidden py-12 md:py-14 flex items-center justify-center shadow-sm bg-black">
        {/* Gambar Latar Belakang */}
        <img
          src={newsletterBg}
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover object-center z-0 pointer-events-none select-none"
        />

        {/* Overlay Kegelapan Gradasi */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/85 z-10" />

        {/* Konten Tata Letak Utama */}
        <div className="relative z-20 max-w-xl w-full text-center mx-auto flex flex-col items-center px-6">
          {/* Memanggil Atom Teks Kategori */}
          <NewsletterCategory>NEWSLETTER</NewsletterCategory>

          {/* Memanggil Atom Judul Utama */}
          <Heading variant="newsletter">Mau Belajar Lebih Banyak?</Heading>

          {/* Memanggil Atom Teks Deskripsi */}
          <TextDescription variant="newsletter">
            Daftarkan dirimu untuk mendapatkan informasi terbaru dan penawaran
            spesial dari program-program terbaik hariesok.id
          </TextDescription>

          {/* Memanggil Komponen Molecule Form */}
          <NewsletterForm onSubmit={handleSubscribe} />
        </div>
      </div>
    </section>
  );
};

export default NewsletterBlock;

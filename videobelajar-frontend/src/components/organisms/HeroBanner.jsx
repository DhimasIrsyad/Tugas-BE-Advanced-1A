import React from "react";
import Button from "../atoms/Button";
import Heading from "../atoms/Heading"; // Impor atom judul baru
import TextDescription from "../atoms/TextDescription"; // Impor atom deskripsi baru

// Memastikan path gambar Anda sudah pas sesuai perbaikan tadi
import heroBg from "../../assets/banners/banner-utama.png";

const HeroBanner = () => {
  const handleCtaClick = () => {
    console.log("Tombol CTA diklik!");
  };

  return (
    <section className="w-full max-w-5xl mx-auto px-4 md:px-6 py-6 font-sans">
      <div
        className="w-full relative rounded-2xl overflow-hidden bg-cover bg-center py-16 md:py-24 flex flex-col items-center justify-center text-center shadow-sm"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        {/* Overlay Gelap */}
        <div className="absolute inset-0 bg-black/60 z-0" />

        {/* Konten Utama */}
        <div className="relative z-10 max-w-3xl w-full px-6 flex flex-col items-center gap-4 md:gap-5">
          {/* Memanggil Atom Judul */}
          <Heading variant="hero">
            Revolusi Pembelajaran: Temukan Ilmu Baru melalui Platform Video
            Interaktif!
          </Heading>

          {/* Memanggil Atom Deskripsi */}
          <TextDescription variant="hero">
            Temukan ilmu baru yang menarik dan mendalam melalui koleksi video
            pembelajaran berkualitas tinggi. Tidak hanya itu, Anda juga dapat
            berpartisipasi dalam latihan interaktif yang akan meningkatkan
            pemahaman Anda.
          </TextDescription>

          {/* Memanggil Atom Tombol */}
          <div className="mt-2">
            <Button onClick={handleCtaClick} variant="success">
              Temukan Video Course untuk Dipelajari!
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;

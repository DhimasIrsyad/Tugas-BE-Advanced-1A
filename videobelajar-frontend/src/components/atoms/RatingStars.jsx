import React from "react";

const RatingStars = ({ rating }) => {
  // PENGAMANAN MUTLAK: Jika data rating dari API kosong/undefined, beri nilai default "0.0 0"
  const safeRating = rating || "0.0 0";

  // Memisahkan teks rating menjadi angka murni dan ulasan di dalam kurung
  const cleanRating = safeRating.replace(/[()]/g, "");
  const [score, count] = cleanRating.split(" ");

  return (
    <div className="flex items-center gap-1.5 text-[10px] font-medium font-sans">
      {/* Deretan bintang emas */}
      <span className="text-amber-400 text-xs tracking-tighter">★★★★★</span>

      {/* Skor di luar, dan jumlah ulasan di dalam kurung */}
      <span className="text-gray-800 font-bold">{score || "0.0"}</span>
      <span className="text-gray-400 font-medium">({count || "0"})</span>
    </div>
  );
};

export default RatingStars;

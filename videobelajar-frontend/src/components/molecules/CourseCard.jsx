import React from "react";
import PriceLabel from "../atoms/PriceLabel";
import RatingStars from "../atoms/RatingStars";
import InstructorInfo from "./InstructorInfo";

// KUNCI PERBAIKAN: Menambahkan parameter 'avatar' di baris destructuring props bawah ini
const CourseCard = ({
  image,
  avatar,
  title,
  desc,
  instructor,
  role,
  rating,
  price,
}) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm flex flex-col hover:shadow-md transition-shadow">
      {/* Sampul Gambar Kelas */}
      <div className="w-full aspect-[16/9] overflow-hidden bg-gray-50">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>

      {/* Konten Detail di dalam Kartu */}
      <div className="p-4 flex flex-col flex-1 text-left">
        <h3 className="text-sm font-bold text-gray-900 line-clamp-1 mb-0.5">
          {title}
        </h3>
        <p className="text-[11px] text-gray-400 font-normal line-clamp-2 leading-relaxed mb-3">
          {desc}
        </p>

        {/* Memanggil Molecule Info Instruktur */}
        <InstructorInfo avatar={avatar} name={instructor} role={role} />

        {/* Baris Bawah: Rating Bintang dan Harga */}
        <div className="flex justify-between items-center border-t border-gray-50 mt-4 pt-3">
          <RatingStars rating={rating} />
          <PriceLabel price={price} />
        </div>
      </div>
    </div>
  );
};

export default CourseCard;

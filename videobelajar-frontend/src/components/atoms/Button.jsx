import React from "react";

const Button = ({
  children,
  variant = "primary",
  type = "button",
  className = "",
  ...props
}) => {
  // Pastikan baseStyle memiliki flex items-center justify-center agar ikon + teks selalu rapi di tengah
  const baseStyle =
    "w-full py-2.5 text-xs font-bold rounded-lg transition-all shadow-sm cursor-pointer block text-center flex items-center justify-center gap-2";

  const variants = {
    // Oranye pekat (Tombol Subscribe Newsletter)
    primary:
      "md:w-auto bg-[#F39C12] hover:bg-[#E67E22] text-white px-5 h-10 md:h-9",

    // Hijau cerah (Tombol Masuk / CTA Utama Hero)
    success: "bg-[#2ECC71] hover:bg-[#27AE60] text-white",

    // Hijau krem lembut (Tombol Daftar Akun)
    subtle: "bg-[#E8F8F5] hover:bg-[#D1F2EB] text-[#2ECC71]",
  };

  return (
    <button
      type={type}
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

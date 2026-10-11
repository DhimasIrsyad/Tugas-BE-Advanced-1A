import React from "react";
import Heading from "../atoms/Heading";
import TextDescription from "../atoms/TextDescription";
import Button from "../atoms/Button";
import InputField from "../molecules/InputField";
import logoGoogle from "../../assets/brands/logo-google.png";

const LoginFormCard = ({ onNavigate }) => {
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    onNavigate("home");
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 w-full max-w-[400px] text-center font-sans flex flex-col items-center">
      {/* Judul Utama Paksa Rata Tengah */}
      <Heading className="!text-center !w-full text-gray-950 text-xl md:text-2xl font-bold mb-1 block">
        Masuk ke Akun
      </Heading>

      {/* Deskripsi Paksa Rata Tengah */}
      <TextDescription className="!text-center !w-full text-gray-400 mb-6 text-xs md:text-sm block">
        Yuk, lanjutin belajarmu di videobelajar.
      </TextDescription>

      <form onSubmit={handleLoginSubmit} className="flex flex-col w-full">
        <InputField
          label="E-Mail"
          type="email"
          placeholder="contoh@email.com"
          required
        />
        <InputField
          label="Kata Sandi"
          type="password"
          placeholder="••••••••"
          required
        />

        <div className="text-right pb-3">
          <a
            href="#forgot"
            className="text-xs text-gray-400 hover:text-gray-600 hover:underline font-medium"
          >
            Lupa Password?
          </a>
        </div>

        <div className="flex flex-col gap-3 pt-1">
          {/* MURNI ATOMIC: Memanggil varian warna hijau cerah dari komponen atom Button */}
          <Button type="submit" variant="success">
            Masuk
          </Button>

          {/* MURNI ATOMIC: Memanggil varian warna hijau krem lembut dari komponen atom Button */}
          <Button
            type="button"
            variant="subtle"
            onClick={() => onNavigate("register")}
          >
            Daftar
          </Button>
        </div>
      </form>

      <div className="relative my-4 w-full">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-100"></div>
        </div>
        <div className="relative text-xs text-gray-400 bg-white px-3 inline-block">
          atau
        </div>
      </div>

      {/* PERBAIKAN MUTLAK: Menggunakan !w-full agar lebar boks Google melar penuh 100% sejajar sempurna */}
      <Button
        type="button"
        className="!w-full border border-gray-200 bg-white hover:bg-gray-50 !text-gray-600 flex items-center justify-center gap-2"
      >
        <img
          src={logoGoogle}
          alt="Google"
          className="w-3.5 h-3.5 object-contain"
        />
        <span>Masuk dengan Google</span>
      </Button>
    </div>
  );
};

export default LoginFormCard;

import React, { useState } from "react";
import Heading from "../atoms/Heading";
import TextDescription from "../atoms/TextDescription";
import Button from "../atoms/Button";
import InputField from "../molecules/InputField";
import logoGoogle from "../../assets/brands/logo-google.png";
import flagId from "../../assets/brands/flag-id.png";
import { registerUser } from "../../services/api"; // 1. Impor fungsi API yang kita buat tadi

const RegisterFormCard = ({
  onNavigate,
  currentUser,
  onUpdateProfile,
  isProfileMode = false,
}) => {
  // 2. Sesuaikan state formData agar memiliki field yang sama dengan kebutuhan database
  const [formData, setFormData] = useState({
    fullname: isProfileMode ? currentUser.name : "",
    username: isProfileMode ? currentUser.username : "",
    email: isProfileMode ? currentUser.email : "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 3. Modifikasi fungsi submit agar menembak data ke Back-End Node.js
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (isProfileMode) {
      onUpdateProfile(formData);
      alert("Profil berhasil diperbarui!");
    } else {
      // Validasi kecocokan password di sisi Front-End terlebih dahulu
      if (formData.password !== formData.confirmPassword) {
        alert("Kata sandi dan konfirmasi kata sandi tidak cocok!");
        return;
      }

      try {
        // Kirim data ke port 8080 database Laragon lewat helper API
        const payload = {
          fullname: formData.fullname,
          username: formData.username,
          email: formData.email,
          password: formData.password,
        };

        await registerUser(payload);

        alert(
          "Pendaftaran Sukses! Silakan cek email simulasi Anda untuk verifikasi.",
        );
        onNavigate("login"); // Pindah ke halaman login setelah berhasil tersimpan di DB
      } catch (error) {
        console.error("Gagal mendaftar:", error);
        alert(
          error.response?.data?.message ||
            "Terjadi kesalahan saat mendaftar akun.",
        );
      }
    }
  };

  return (
    <div
      className={`bg-white rounded-2xl border border-gray-100 w-full text-center font-sans flex flex-col items-center ${isProfileMode ? "p-6 md:p-8 border-none md:border md:shadow-sm" : "p-6 md:p-8 shadow-sm max-w-[400px]"}`}
    >
      {isProfileMode ? (
        <div className="flex items-center gap-4 border-b border-gray-100 pb-6 mb-6 w-full text-left">
          <div className="w-16 h-16 rounded-full overflow-hidden border border-gray-200 bg-gray-50 shrink-0">
            <img
              src={currentUser.avatarUrl}
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h4 className="font-bold text-gray-900 text-base">
              {currentUser.name}
            </h4>
            <p className="text-xs text-gray-500 mb-1">{currentUser.email}</p>
            <button
              type="button"
              className="text-xs text-red-500 font-bold hover:underline cursor-pointer"
            >
              Ganti Foto Profil
            </button>
          </div>
        </div>
      ) : (
        <>
          <Heading className="!text-center !w-full text-gray-950 text-xl md:text-2xl font-bold mb-0.5 block">
            Pendaftaran Akun
          </Heading>
          <TextDescription className="!text-center !w-full text-gray-400 mb-5 text-xs md:text-sm block">
            Yuk, daftarkan akunmu sekarang juga!
          </TextDescription>
        </>
      )}

      <form
        onSubmit={handleFormSubmit}
        className="w-full flex flex-col text-left"
      >
        <div
          className={`grid grid-cols-1 gap-x-4 ${isProfileMode ? "md:grid-cols-3" : ""}`}
        >
          <InputField
            label="Nama Lengkap"
            name="fullname"
            placeholder="Nama Anda"
            value={formData.fullname}
            onChange={handleChange}
            required
          />

          {!isProfileMode && (
            <InputField
              label="Username"
              name="username"
              placeholder="username_anda"
              value={formData.username}
              onChange={handleChange}
              required
            />
          )}

          <InputField
            label="E-Mail"
            type="email"
            name="email"
            placeholder="contoh@email.com"
            value={formData.email}
            onChange={handleChange}
            required
          />

          {!isProfileMode && (
            <>
              <InputField
                label="Kata Sandi"
                type="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <InputField
                label="Konfirmasi Kata Sandi"
                type="password"
                name="confirmPassword"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </>
          )}
        </div>

        <div
          className={`pt-3 w-full flex ${isProfileMode ? "justify-end md:col-span-3" : "flex-col space-y-3"}`}
        >
          <Button
            type="submit"
            variant="success"
            className={isProfileMode ? "w-full md:w-auto px-6" : "w-full"}
          >
            {isProfileMode ? "Simpan" : "Daftar"}
          </Button>

          {!isProfileMode && (
            <Button
              type="button"
              variant="subtle"
              onClick={() => onNavigate("login")}
            >
              Masuk
            </Button>
          )}
        </div>
      </form>

      {!isProfileMode && (
        <>
          <div className="relative my-4 w-full">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-100"></div>
            </div>
            <div className="relative text-[10px] text-gray-400 bg-white px-3 inline-block">
              atau
            </div>
          </div>
          <Button
            type="button"
            className="!w-full border border-gray-200 bg-white hover:bg-gray-50 !text-gray-600 flex items-center justify-center gap-2"
          >
            <img
              src={logoGoogle}
              alt="Google"
              className="w-3.5 h-3.5 object-contain"
            />
            <span>Daftar dengan Google</span>
          </Button>
        </>
      )}
    </div>
  );
};

export default RegisterFormCard;

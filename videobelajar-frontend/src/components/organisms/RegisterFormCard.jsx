import React, { useState } from "react";
import Heading from "../atoms/Heading";
import TextDescription from "../atoms/TextDescription";
import Button from "../atoms/Button";
import InputField from "../molecules/InputField";
import logoGoogle from "../../assets/brands/logo-google.png";
import flagId from "../../assets/brands/flag-id.png";

const RegisterFormCard = ({
  onNavigate,
  currentUser,
  onUpdateProfile,
  isProfileMode = false,
}) => {
  const [formData, setFormData] = useState({
    name: isProfileMode ? currentUser.name : "",
    email: isProfileMode ? currentUser.email : "",
    phone: isProfileMode ? currentUser.phone : "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (isProfileMode) {
      onUpdateProfile(formData);
      alert("Profil berhasil diperbarui!");
    } else {
      onNavigate("login");
    }
  };

  return (
    <div
      className={`bg-white rounded-2xl border border-gray-100 w-full text-center font-sans flex flex-col items-center ${isProfileMode ? "p-6 md:p-8 border-none md:border md:shadow-sm" : "p-6 md:p-8 shadow-sm max-w-[400px]"}`}
    >
      {/* KONDISI 1: JIKA MODE PROFIL, TAMPILKAN HEADER AVATAR DI ATAS FORM */}
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
        /* KONDISI 2: JIKA MODE REGISTER, TAMPILKAN JUDUL BAWAAN */
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
        {/* Layout Grid dinamis: 3 kolom sejajar di PC saat mode profil, bertumpuk 1 kolom saat registrasi */}
        <div
          className={`grid grid-cols-1 gap-x-4 ${isProfileMode ? "md:grid-cols-3" : ""}`}
        >
          <InputField
            label="Nama Lengkap"
            name="name"
            placeholder="Nama Anda"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <InputField
            label="E-Mail"
            type="email"
            name="email"
            placeholder="contoh@email.com"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <InputField
            label="No. HP"
            name="phone"
            placeholder="812345678"
            value={formData.phone}
            onChange={(e) => {
              const safeValue = e.target.value.replace(/[^0-9]/g, "");
              setFormData((prev) => ({ ...prev, phone: safeValue }));
            }}
            required
          >
            <div className="flex items-center shrink-0 border-r border-gray-200 pr-2 mr-1 h-5 select-none">
              <img
                src={flagId}
                alt="ID"
                className="w-4 h-3 object-contain mr-1.5"
              />
              <select
                className="appearance-none bg-transparent text-xs font-semibold text-gray-800 focus:outline-none cursor-pointer pr-1"
                defaultValue="+62"
              >
                <option value="+62">+62</option>
              </select>
            </div>
          </InputField>

          {!isProfileMode && (
            <>
              <InputField
                label="Kata Sandi"
                type="password"
                placeholder="••••••••"
                required
              />
              <InputField
                label="Konfirmasi Kata Sandi"
                type="password"
                placeholder="••••••••"
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

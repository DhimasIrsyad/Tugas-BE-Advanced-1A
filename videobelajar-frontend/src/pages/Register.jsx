import React from "react";
import AuthHeader from "../components/organisms/AuthHeader";
import RegisterFormCard from "../components/organisms/RegisterFormCard"; // Mengimpor organism baru

const Register = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-[#fffdf3] flex flex-col items-center font-sans overflow-hidden">
      {/* Memanggil Organisme AuthHeader Tunggal */}
      <AuthHeader onNavigate={onNavigate} />

      {/* Container Layout Utama Tingkat Pages */}
      <main className="flex-1 flex items-center justify-center p-2 w-full">
        {/* Memanggil Organisme Kartu Form Registrasi */}
        <RegisterFormCard onNavigate={onNavigate} />
      </main>
    </div>
  );
};

export default Register;

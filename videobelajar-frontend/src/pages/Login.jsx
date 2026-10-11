import React from "react";
import AuthHeader from "../components/organisms/AuthHeader";
import LoginFormCard from "../components/organisms/LoginFormCard"; // Memanggil organism baru

const Login = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-[#fffdf3] flex flex-col items-center font-sans overflow-hidden">
      {/* Memanggil Organism Header Autentikasi */}
      <AuthHeader onNavigate={onNavigate} />

      {/* Tata letak pembungkus tingkat Pages */}
      <main className="flex-1 flex items-start md:items-center justify-center p-4 pt-8 md:pt-0 w-full">
        {/* Memanggil Organism Kartu Form Login */}
        <LoginFormCard onNavigate={onNavigate} />
      </main>
    </div>
  );
};

export default Login;

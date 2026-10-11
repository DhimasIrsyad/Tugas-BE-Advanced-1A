import React from "react";
import Navbar from "../components/organisms/Navbar";
import Footer from "../components/organisms/Footer";
import ProfileSidebar from "../components/organisms/ProfileSidebar"; // Memanggil Organism Baru
import RegisterFormCard from "../components/organisms/RegisterFormCard"; // Murni REUSE

const Profile = ({ onNavigate, currentUser, onUpdateProfile }) => {
  return (
    <div className="min-h-screen bg-[#fffdf3] text-gray-800 font-sans flex flex-col">
      {/* REUSE: Organism Navbar */}
      <Navbar onNavigate={onNavigate} />

      {/* Pembagian Makro Layout Grid Sesuai Standar Keras Atomic Design */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 md:px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* SISI KIRI: Memanggil Organism Sidebar Baru */}
          <ProfileSidebar />

          {/* SISI KANAN: Memanggil Organism Reusable RegisterFormCard */}
          <div className="md:col-span-8 w-full">
            <RegisterFormCard
              onNavigate={onNavigate}
              currentUser={currentUser}
              onUpdateProfile={onUpdateProfile}
              isProfileMode={true} // Kunci pengaktif mode profil di dalam komponen daur ulang
            />
          </div>
        </div>
      </main>

      {/* REUSE: Organism Footer */}
      <Footer />
    </div>
  );
};

export default Profile;

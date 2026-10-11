import React, { useState } from "react";
import Navbar from "../components/organisms/Navbar";
import HeroBanner from "../components/organisms/HeroBanner";
import CourseSection from "../components/organisms/CourseSection";
import NewsletterBlock from "../components/organisms/NewsletterBlock";
import Footer from "../components/organisms/Footer";

const Homepage = ({ onNavigate, currentUser }) => {
  const [isAdminMode, setIsAdminMode] = useState(false);

  return (
    <div className="min-h-screen bg-[#fffdf3] text-gray-800 font-sans">
      <Navbar onNavigate={onNavigate} />
      <HeroBanner />

      <div className="max-w-5xl mx-auto px-4 md:px-6 text-right">
        <button
          onClick={() => setIsAdminMode(!isAdminMode)}
          className={`text-xs font-bold px-3 py-1.5 rounded-lg border transition-all ${
            isAdminMode
              ? "bg-red-500 text-white border-red-500"
              : "bg-white text-gray-700 border-gray-300"
          }`}
        >
          {isAdminMode
            ? "🔒 Matikan Mode CRUD"
            : "🛠️ Aktifkan Mode CRUD (Tugas)"}
        </button>
      </div>

      {/* Sekarang CourseSection akan mengambil data Redux secara mandiri */}
      <CourseSection isAdminMode={isAdminMode} currentUser={currentUser} />

      <NewsletterBlock />
      <Footer />
    </div>
  );
};

export default Homepage;

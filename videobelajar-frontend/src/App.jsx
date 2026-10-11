import React, { useState, useEffect } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Homepage from "./pages/Homepage";
import Profile from "./pages/Profile";
import * as apiService from "./services/api";

const defaultAvatar = "https://unsplash.com";

function App() {
  const [page, setPage] = useState("home");
  const [courses, setCourses] = useState([]);

  // State Profil User Tunggal
  const [currentUser, setCurrentUser] = useState({
    name: "Jenna Ortega",
    email: "Jenna.Ortega@gmail.com",
    gender: "Perempuan",
    phone: "81234567890",
    password: "howyoulikethat",
    confirmPassword: "howyoulikethat",
    avatarUrl: defaultAvatar,
  });

  // 1. READ: Mengambil data dari MockAPI saat aplikasi pertama kali dimuat
  const fetchAllCourses = async () => {
    try {
      const data = await apiService.getCourses();
      setCourses(data);
    } catch (error) {
      console.error("Gagal mengambil data kursus:", error);
    }
  };

  useEffect(() => {
    fetchAllCourses();
  }, []);

  const handleUpdateProfile = (updatedData) => {
    setCurrentUser((prev) => ({ ...prev, ...updatedData }));
  };

  // 2. CREATE: Menambah Kursus Baru ke MockAPI (Kembali menggunakan nilai default asli Anda)
  const handleAddCourse = async (newCourse) => {
    try {
      const payload = {
        image: "https://unsplash.com",
        avatar: defaultAvatar,
        instructor: currentUser.name,
        role: "Senior Instructor",
        rating: "5.0 (1)",
        price: "Rp 150.000",
        ...newCourse,
      };
      await apiService.addCourse(payload);
      // Refresh data dari server agar sinkron
      fetchAllCourses();
    } catch (error) {
      console.error("Gagal menambah kursus:", error);
    }
  };

  // 3. UPDATE: Mengubah Kursus di MockAPI Berdasarkan ID unik dari API
  const handleUpdateCourse = async (idToUpdate, updatedCourse) => {
    try {
      await apiService.updateCourse(idToUpdate, updatedCourse);
      fetchAllCourses();
    } catch (error) {
      console.error("Gagal memperbarui kursus:", error);
    }
  };

  // 4. DELETE: Menghapus Kursus dari MockAPI Berdasarkan ID unik dari API
  const handleDeleteCourse = async (idToDelete) => {
    const konfirmasi = window.confirm(
      "Apakah Anda yakin ingin menghapus kelas ini secara permanen dari API?",
    );
    if (konfirmasi) {
      try {
        await apiService.deleteCourse(idToDelete);
        fetchAllCourses();
      } catch (error) {
        console.error("Gagal menghapus kursus:", error);
      }
    }
  };

  return (
    <div>
      {page === "home" && (
        <Homepage
          onNavigate={setPage}
          courses={courses}
          onAddCourse={handleAddCourse}
          onUpdateCourse={handleUpdateCourse}
          onDeleteCourse={handleDeleteCourse}
        />
      )}
      {page === "login" && <Login onNavigate={setPage} />}
      {page === "register" && <Register onNavigate={setPage} />}
      {page === "profile" && (
        <Profile
          onNavigate={setPage}
          currentUser={currentUser}
          onUpdateProfile={handleUpdateProfile}
        />
      )}
    </div>
  );
}

export default App;

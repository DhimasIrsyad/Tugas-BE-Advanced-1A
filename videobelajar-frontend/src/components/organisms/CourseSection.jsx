import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Heading from "../atoms/Heading";
import TextDescription from "../atoms/TextDescription";
import CategoryTabs from "../molecules/CategoryTabs";
import CourseCard from "../molecules/CourseCard";
import Button from "../atoms/Button";
import { listKategori } from "../../constants/courseMockData";
import {
  getCourses,
  addCourse,
  updateCourse,
  deleteCourse,
} from "../../services/api";

// Import Redux Actions dari store
import {
  setCourses,
  addCourseToState,
  updateCourseInState,
  deleteCourseFromState,
} from "../../store/redux/courseSlice";

const CourseSection = ({ isAdminMode, currentUser }) => {
  const dispatch = useDispatch();

  // 1. Ambil data menggunakan useSelector dari state Redux
  const courses = useSelector((state) => state.courses.list);

  // 2. State untuk mendeteksi kategori horizontal aktif yang diklik
  const [activeCategory, setActiveCategory] = useState("Semua Kelas");

  const [courseInput, setCourseInput] = useState({
    title: "",
    desc: "",
    price: "Rp 145.000",
  });
  const [editId, setEditId] = useState(null);

  // 3. Fungsi pengambil data membawa params filter kategori ke database
  const fetchAllCourses = async () => {
    try {
      const params = {};

      // Jika kategori aktif bukan "Semua Kelas", kirim nama kategorinya ke Back-End.
      if (activeCategory !== "Semua Kelas" && activeCategory !== "") {
        params.instructor = activeCategory;
      }

      const data = await getCourses(params);
      dispatch(setCourses(data)); // Masukkan hasil filter database ke Redux global
    } catch (error) {
      console.error("Gagal memuat kursus dari API:", error);
    }
  };

  // Memicu penembakan ulang data dari database Laragon setiap kali user mengeklik tab kategori baru
  useEffect(() => {
    fetchAllCourses();
  }, [activeCategory]);

  // Handler untuk ADD dan EDIT (Sudah Diperbaiki Agar Sinkron Kolom Category Database)
  // Handler untuk ADD dan EDIT (Versi Kebal Eror Format Data)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!courseInput.title.trim()) return;

    try {
      // Membersihkan format harga (mengubah "Rp 145.000" menjadi angka murni 145000 jika diperlukan)
      // Langkah ini memastikan database Laragon tidak menolak kiriman data dari form
      const cleanPrice = courseInput.price.replace(/[^0-9]/g, "");
      const finalPrice = cleanPrice
        ? `Rp ${parseInt(cleanPrice).toLocaleString("id-ID")}`
        : "Rp 145.000";

      if (editId !== null) {
        // 1. JALUR INTEGRASI EDIT
        const currentCourse = courses.find((c) => c.id === editId);
        const payloadEdit = {
          title: courseInput.title,
          desc: courseInput.desc,
          price: finalPrice,
          instructor: currentCourse?.instructor || "Jenna Ortega",
          category:
            currentCourse?.category ||
            (activeCategory !== "Semua Kelas" ? activeCategory : "Pemasaran"),
        };

        // Memanggil fungsi updateCourse instan (pastikan nama tanpa kata apiService jika sudah diubah kurung kurawal)
        const savedCourse = await updateCourse(editId, payloadEdit);
        dispatch(updateCourseInState(savedCourse));
        setEditId(null);
        alert("Kursus berhasil diperbarui di database!");
      } else {
        // 2. JALUR INTEGRASI ADD
        const payloadAdd = {
          title: courseInput.title,
          desc: courseInput.desc,
          price: finalPrice,
          image: "https://unsplash.com",
          avatar: "https://unsplash.com",
          instructor: "Jenna Ortega",
          role: "Senior Instructor",
          rating: "5.0 (1)",
          category:
            activeCategory !== "Semua Kelas" ? activeCategory : "Pemasaran",
        };

        // Memanggil fungsi addCourse instan
        const savedCourse = await addCourse(payloadAdd);
        dispatch(addCourseToState(savedCourse));
        alert("Kursus baru berhasil masuk ke database Laragon!");
      }

      // Mengembalikan inputan form ke kondisi awal yang bersih
      setCourseInput({ title: "", desc: "", price: "Rp 145.000" });
    } catch (error) {
      console.error("Aksi CRUD gagal dideteksi di browser:", error);
      alert("Aksi CRUD gagal! Periksa koneksi jembatan API Anda.");
    }
  };

  // Integrasi DELETE
  const handleDeleteCourse = async (idToDelete) => {
    const konfirmasi = window.confirm(
      "Apakah Anda yakin ingin menghapus kelas ini secara permanen dari database Laragon?",
    );
    if (konfirmasi) {
      try {
        await deleteCourse(idToDelete);
        dispatch(deleteCourseFromState(idToDelete)); // Hapus dari Redux global
        alert("Kursus berhasil dihapus secara permanen!");
      } catch (error) {
        console.error("Gagal menghapus kursus:", error);
        alert("Gagal menghapus! Cek koneksi server Anda.");
      }
    }
  };

  return (
    <section className="max-w-5xl mx-auto px-4 md:px-6 py-6 font-sans">
      <Heading variant="section">Koleksi Video Pembelajaran Unggulan</Heading>
      <TextDescription variant="section">
        Jelajahi Dunia Pengetahuan Melalui Video Kami
      </TextDescription>

      {/* Sambungkan state activeCategory dan fungsi pengubahnya ke komponen Kategori */}
      <CategoryTabs
        categories={listKategori}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      {/* FORM INPUT CRUD */}
      {isAdminMode && (
        <form
          onSubmit={handleSubmit}
          className="mb-6 bg-white p-4 rounded-xl border-2 border-dashed border-green-400 space-y-3 text-left"
        >
          <h4 className="text-xs font-bold text-green-600 uppercase tracking-wider">
            {editId !== null
              ? "📝 Edit Data Kursus via Redux & DB"
              : "✨ Tambah Kursus Baru via Redux & DB"}
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-gray-500">
                Judul Kursus
              </label>
              <input
                type="text"
                placeholder="Judul Kursus"
                value={courseInput.title}
                onChange={(e) =>
                  setCourseInput({ ...courseInput, title: e.target.value })
                }
                className="p-2 border border-gray-300 rounded-lg text-xs bg-white text-gray-800 focus:outline-none focus:border-green-500"
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-gray-500">
                Deskripsi Kursus
              </label>
              <input
                type="text"
                placeholder="Deskripsi Singkat"
                value={courseInput.desc}
                onChange={(e) =>
                  setCourseInput({ ...courseInput, desc: e.target.value })
                }
                className="p-2 border border-gray-300 rounded-lg text-xs bg-white text-gray-800 focus:outline-none focus:border-green-500"
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-gray-500">
                Harga Kursus
              </label>
              <input
                type="text"
                placeholder="Harga"
                value={courseInput.price}
                onChange={(e) =>
                  setCourseInput({ ...courseInput, price: e.target.value })
                }
                className="p-2 border border-gray-300 rounded-lg text-xs bg-white text-gray-800 focus:outline-none focus:border-green-500"
                required
              />
            </div>
          </div>
          <div className="text-right flex justify-end gap-2 items-center">
            {editId !== null && (
              <button
                type="button"
                onClick={() => {
                  setEditId(null);
                  setCourseInput({ title: "", desc: "", price: "Rp 145.000" });
                }}
                className="text-xs font-semibold text-gray-500 hover:underline mr-2"
              >
                Batal
              </button>
            )}
            <Button
              type="submit"
              variant="success"
              className="!w-auto px-4 !h-8 text-xs"
            >
              {editId !== null ? "Simpan Perubahan" : "Masukkan ke Daftar Grid"}
            </Button>
          </div>
        </form>
      )}

      {/* GRID KARTU UTAMA */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {courses.map((course) => (
          <div key={course.id} className="relative group">
            <CourseCard {...course} />
            {isAdminMode && (
              <div className="absolute inset-x-0 bottom-0 bg-black/85 p-2 flex justify-around text-xs font-bold rounded-b-xl z-30">
                <button
                  type="button"
                  onClick={() => {
                    setEditId(course.id);
                    setCourseInput({
                      title: course.title,
                      desc: course.desc,
                      price: course.price,
                    });
                  }}
                  className="text-yellow-400 hover:underline cursor-pointer"
                >
                  📝 Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteCourse(course.id)}
                  className="text-red-400 hover:underline cursor-pointer"
                >
                  ❌ Hapus
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default CourseSection;

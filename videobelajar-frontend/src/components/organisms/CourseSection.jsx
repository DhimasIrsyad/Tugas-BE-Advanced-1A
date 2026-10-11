import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Heading from "../atoms/Heading";
import TextDescription from "../atoms/TextDescription";
import CategoryTabs from "../molecules/CategoryTabs";
import CourseCard from "../molecules/CourseCard";
import Button from "../atoms/Button";
import { listKategori } from "../../constants/courseMockData";
import * as apiService from "../../services/api";

// Import Redux Actions dari store
import {
  setCourses,
  addCourseToState,
  updateCourseInState,
  deleteCourseFromState,
} from "../../store/redux/courseSlice";

const CourseSection = ({ isAdminMode, currentUser }) => {
  const dispatch = useDispatch();

  // 1. Tampilkan data menggunakan useSelector untuk mengambil dari state Redux
  const courses = useSelector((state) => state.courses.list);

  const [courseInput, setCourseInput] = useState({
    title: "",
    desc: "",
    price: "Rp 145.000",
  });
  const [editId, setEditId] = useState(null);

  // Ambil data API (GET) saat komponen dimuat
  const fetchAllCourses = async () => {
    try {
      const data = await apiService.getCourses();
      dispatch(setCourses(data)); // Simpan ke Redux
    } catch (error) {
      console.error("Gagal memuat kursus dari API:", error);
    }
  };

  useEffect(() => {
    fetchAllCourses();
  }, []);

  // Handler untuk ADD dan EDIT
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!courseInput.title.trim()) return;

    try {
      if (editId !== null) {
        // Integrasi EDIT
        const savedCourse = await apiService.updateCourse(editId, courseInput);
        dispatch(updateCourseInState(savedCourse));
        setEditId(null);
      } else {
        // Integrasi ADD
        const payload = {
          image: "https://unsplash.com",
          avatar: "https://unsplash.com",
          instructor: currentUser?.name || "Jenna Ortega",
          role: "Senior Instructor",
          rating: "5.0 (1)",
          price: "Rp 150.000",
          ...courseInput,
        };
        const savedCourse = await apiService.addCourse(payload);
        dispatch(addCourseToState(savedCourse));
      }
      setCourseInput({ title: "", desc: "", price: "Rp 145.000" });
    } catch (error) {
      console.error("Aksi CRUD gagal:", error);
    }
  };

  // Integrasi DELETE
  const handleDeleteCourse = async (idToDelete) => {
    const konfirmasi = window.confirm(
      "Apakah Anda yakin ingin menghapus kelas ini secara permanen dari API?",
    );
    if (konfirmasi) {
      try {
        await apiService.deleteCourse(idToDelete);
        dispatch(deleteCourseFromState(idToDelete)); // Hapus dari Redux global
      } catch (error) {
        console.error("Gagal menghapus kursus:", error);
      }
    }
  };

  return (
    <section className="max-w-5xl mx-auto px-4 md:px-6 py-6 font-sans">
      <Heading variant="section">Koleksi Video Pembelajaran Unggulan</Heading>
      <TextDescription variant="section">
        Jelajahi Dunia Pengetahuan Melalui Video Kami
      </TextDescription>

      <CategoryTabs categories={listKategori} />

      {/* FORM INPUT CRUD */}
      {isAdminMode && (
        <form
          onSubmit={handleSubmit}
          className="mb-6 bg-white p-4 rounded-xl border-2 border-dashed border-green-400 space-y-3 text-left"
        >
          <h4 className="text-xs font-bold text-green-600 uppercase tracking-wider">
            {editId !== null
              ? "📝 Edit Data Kursus via Redux"
              : "✨ Tambah Kursus Baru via Redux"}
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

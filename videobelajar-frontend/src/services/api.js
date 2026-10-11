import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// GET: Mengambil data dari endpoint /course lokal
export const getCourses = async () => {
  const response = await api.get("/course");
  return response.data;
};

// POST: Menambah data ke endpoint /course lokal
export const addCourse = async (courseData) => {
  const response = await api.post("/course", courseData);
  return response.data;
};

// PATCH: Mengubah data di endpoint /course/:id lokal (Menggunakan PUT/PATCH sesuai router BE)
export const updateCourse = async (id, courseData) => {
  const response = await api.patch(`/course/${id}`, courseData);
  return response.data;
};

// DELETE: Menghapus data dari endpoint /course/:id lokal
export const deleteCourse = async (id) => {
  const response = await api.delete(`/course/${id}`);
  return response.data;
};

export default api;

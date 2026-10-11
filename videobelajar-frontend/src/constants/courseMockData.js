// Gudang Data Statis khusus untuk halaman Utama

export const listKategori = [
  "Semua Kelas",
  "Pemasaran",
  "Desain",
  "Pengembangan Diri",
  "Bisnis",
];

export const sembilanCourses = Array.from({ length: 9 }, (_, index) => {
  const id = index + 1;
  return {
    title: "Big 4 Auditor Financial Analyst",
    desc: "Mulai transformasi dengan instruktur profesional, harga yang terjangkau, dan...",
    instructor: "Jenna Ortega",
    role: "Senior Accountant di Gojek",
    rating: "3.5 (86)",
    price: "Rp 300K",
    // Menggunakan path absolut relatif terhadap folder constants agar aman
    image: new URL(`../assets/courses/course-${id}.png`, import.meta.url).href,
    avatar: new URL(`../assets/courses/avatar-teacher-${id}.png`, import.meta.url).href,
  };
});

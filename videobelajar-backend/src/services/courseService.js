import mysql from "mysql2";
import dotenv from "dotenv";
import bcrypt from "bcrypt"; // Tambahan untuk keamanan password
import { v4 as uuidv4 } from "uuid";
import nodemailer from "nodemailer";

dotenv.config(); // Memuat environment variables

// 1. Connecting to Database menggunakan Pool Promise (Cukup 1 saja di atas)
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
}).promise();

// 2. Implementing DML: SELECT Semua Data dengan Fitur Filter (Category), Search, dan Sort
export const getCourses = async (queryParams) => {
  const { search, instructor, sortBy, order } = queryParams;
  
  let queryBase = "SELECT * FROM courses";
  let queryParamsArray = [];
  let conditions = [];

  // A. Fitur SEARCH: Mencari berdasarkan judul (title) menggunakan WHERE dan LIKE
  if (search) {
    conditions.push("title LIKE ?");
    queryParamsArray.push(`%${search}%`); // Menggunakan % agar pencarian bersifat fleksibel
  }

  // B. Fitur FILTER: Sekarang menyaring berdasarkan kolom category di database nyata
  if (instructor) {
    conditions.push("category = ?"); // <-- Mengubah kecocokan ke kolom category hasil solusi 2
    queryParamsArray.push(instructor);
  }

  // Jika ada kondisi search atau filter, gabungkan dengan WHERE kata kunci SQL
  if (conditions.length > 0) {
    queryBase += " WHERE " + conditions.join(" AND ");
  }

  // C. Fitur SORTING: Mengurutkan konten menggunakan ORDER BY
  // Memastikan kolom sort yang diminta aman, default diurutkan berdasarkan id
  const allowedSortFields = ["id", "title", "price", "rating"];
  const finalSortBy = allowedSortFields.includes(sortBy) ? sortBy : "id";
  
  // Memastikan urutan ASC (a-z) atau DESC (z-a), default DESC
  const finalOrder = order && order.toUpperCase() === "ASC" ? "ASC" : "DESC";

  queryBase += ` ORDER BY ${finalSortBy} ${finalOrder}`;

  // Eksekusi Query DML akhir ke database MySQL
  const [rows] = await pool.query(queryBase, queryParamsArray);
  return rows;
};

// 2. Implementing DML: SELECT Berdasarkan ID
export const getCourseById = async (id) => {
  const [rows] = await pool.query("SELECT * FROM courses WHERE id = ?", [id]);
  return rows[0]; // Mengembalikan satu objek data
};

// 2. Implementing DML: INSERT Data Baru (Sudah mendukung kolom category)
export const addCourse = async (courseData) => {
  const { title, desc, instructor, role, rating, price, image, avatar, category } = courseData; // Tambahkan category di sini
  const [result] = await pool.query(
    "INSERT INTO courses (title, `desc`, instructor, role, rating, price, image, avatar, category) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [title, desc, instructor, role, rating, price, image, avatar, category] // Tambahkan category di sini
  );
  return getCourseById(result.insertId); // Mengembalikan data utuh yang baru dibuat dari DB
};

// 2. Implementing DML: UPDATE Data Berdasarkan ID
export const updateCourse = async (id, courseData) => {
  const { title, desc, price } = courseData;
  await pool.query(
    "UPDATE courses SET title = ?, `desc` = ?, price = ? WHERE id = ?",
    [title, desc, price, id]
  );
  return getCourseById(id);
};

// 2. Implementing DML: DELETE Data Berdasarkan ID
export const deleteCourse = async (id) => {
  const [result] = await pool.query("DELETE FROM courses WHERE id = ?", [id]);
  return result.affectedRows > 0;
};

// ==========================================
// TUGAS BARU - LANGKAH 6: REGISTER USER DENGAN UNIQUE VERIFICATION TOKEN
// ==========================================
export const registerUser = async (userData) => {
  const { fullname, username, password, email } = userData;

  // 1. Enkripsi password menggunakan bcrypt
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  // 2. Generate token unik menggunakan uuid
  const verificationToken = uuidv4();

  // 3. Perintah DML: INSERT data user baru beserta token uniknya ke tabel users
  const [result] = await pool.query(
    "INSERT INTO users (fullname, username, password, email, verification_token) VALUES (?, ?, ?, ?, ?)",
    [fullname, username, hashedPassword, email, verificationToken]
  );

  // Jalankan fungsi pengirim email (Fungsi didefinisikan di bawah)
  //await sendVerificationEmail(email, verificationToken);

  // Mengembalikan data user yang baru terdaftar (tanpa password demi keamanan)
  return {
    id: result.insertId,
    fullname,
    username,
    email,
    verificationToken // Dikembalikan agar bisa kita cek nilainya di Postman
  };
};

// ==========================================
// TAHAP 6: FUNCTION SENDMAIL DENGAN NODEMAILER
// ==========================================
export const sendVerificationEmail = async (email, token) => {
  // Pengaturan server pengirim email simulasi (Menggunakan Ethereal / SMTP gratis untuk belajar)
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email", 
    port: 587,
    auth: {
      user: "margarita.cruickshank@ethereal.email", 
      pass: "dCEvJ5K1j3C2aR5Yn4",
    },
  });

  // Disesuaikan tautannya menjadi /verify-email sesuai kotak referensi tugas Anda
  const verificationLink = `http://localhost:8080/verify-email?token=${token}`;

  const mailOptions = {
    from: '"EduCourse Admin" <no-reply@educourse.com>',
    to: email,
    subject: "Verifikasi Akun EduCourse Anda",
    html: `<h3>Selamat Datang di EduCourse!</h3>
           <p>Silakan klik tautan di bawah ini untuk memverifikasi akun Anda:</p>
           <a href="${verificationLink}">Klik Disini Untuk Verifikasi Akun</a>`,
  };

  await transporter.sendMail(mailOptions);
};

// ==========================================
// TAHAP 7: SERVICE UNTUK CHECK TOKEN DI DATABASE
// ==========================================
export const verifyUserToken = async (token) => {
  // Cari user berdasarkan token yang dikirim
  const [rows] = await pool.query("SELECT * FROM users WHERE verification_token = ?", [token]);
  
  if (rows.length === 0) return false; // Token tidak ditemukan

  // Perintah DML: UPDATE status jika ditemukan, hapus tokennya agar tidak bisa dipakai ulang
  await pool.query(
    "UPDATE users SET is_verified = 1, verification_token = NULL WHERE verification_token = ?",
    [token]
  );
  return true;
};

// ==========================================
// TUGAS BARU - LANGKAH 3: LOGIN USER Helper
// ==========================================
export const getUserByEmail = async (email) => {
  // Perintah DML: SELECT data user spesifik berdasarkan email
  const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
  return rows[0]; // Mengembalikan data objek user jika ketemu
};

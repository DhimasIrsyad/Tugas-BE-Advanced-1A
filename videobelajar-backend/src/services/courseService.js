import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config(); // Memuat environment variables [00:09:52]

// 1. Connecting to Database menggunakan Pool Promise [00:04:11, 00:05:59]
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
}).promise();

// 2. Implementing DML: SELECT Semua Data [00:06:49]
export const getCourses = async () => {
  const [rows] = await pool.query("SELECT * FROM courses ORDER BY id DESC"); // [00:06:32]
  return rows;
};

// 2. Implementing DML: SELECT Berdasarkan ID [00:10:22]
export const getCourseById = async (id) => {
  const [rows] = await pool.query("SELECT * FROM courses WHERE id = ?", [id]); // [00:11:34]
  return rows[0]; // Mengembalikan satu objek data [00:13:07]
};

// 2. Implementing DML: INSERT Data Baru [00:13:39]
export const addCourse = async (courseData) => {
  const { title, desc, instructor, role, rating, price, image, avatar } = courseData;
  const [result] = await pool.query(
    "INSERT INTO courses (title, `desc`, instructor, role, rating, price, image, avatar) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    [title, desc, instructor, role, rating, price, image, avatar]
  ); // Menggunakan Prepared Statement yang aman dari SQL Injection [00:11:44, 00:13:56]
  
  return getCourseById(result.insertId); // Mengembalikan data utuh yang baru dibuat dari DB [00:17:22]
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

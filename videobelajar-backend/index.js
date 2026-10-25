import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import * as courseService from "./src/services/courseService.js"; // Import service DML [00:20:31]
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import multer from "multer";
import path from "path";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// ==========================================
// TUGAS BARU - LANGKAH 7: KONFIGURASI MULTER
// ==========================================
const storage = multer.diskStorage({
  // Menentukan folder tujuan penyimpanan file
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  // Menentukan nama file agar unik dan tidak saling menimpa
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

// Inisialisasi middleware multer
const upload = multer({ storage: storage });

// Mengizinkan folder 'uploads' diakses publik melalui browser
app.use("/uploads", express.static("uploads"));


// ==========================================
// TUGAS BARU - LANGKAH 4: MIDDLEWARE AUTENTIKASI
// ==========================================
const authenticateToken = (req, res, next) => {
  // 1. Mengambil token dari header authorization (format biasanya: Bearer TOKEN_DISINI)
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1]; // Memotong kata 'Bearer' dan mengambil tokennya saja

  // 2. Jika token tidak disertakan sama sekali di header
  if (!token) {
    return res.status(401).json({ message: "Akses ditolak, token autentikasi tidak ditemukan!" });
  }

  // 3. Menguji validitas token menggunakan jwt.verify dan secretkey yang sama seperti saat login
  const secretKey = process.env.JWT_SECRET || "kunci_rahasia_edukursus";
  
  jwt.verify(token, secretKey, (err, decodedUser) => {
    if (err) {
      // Status 403 Forbidden jika token kedaluwarsa atau tidak valid
      return res.status(403).json({ message: "Autentikasi gagal, token tidak valid atau telah kedaluwarsa!" });
    }

    // 4. Jika token valid, simpan data user hasil decode ke dalam request agar bisa dipakai di rute selanjutnya
    req.user = decodedUser;
    
    // 5. Biarkan permintaan berlanjut ke endpoint tujuan
    next();
  });
};


// ==========================================
// RUTE-RUTE LAMA (COURSE)
// ==========================================

// 3. Endpoint 1: GET All Courses [00:19:44, 00:21:13]
// 3. Endpoint 1: GET All Courses (Mendukung Query Params: Filter, Sort, & Search)
app.get("/course", async (req, res, next) => {
  try {
    // req.query mengambil parameter dari URL (misal: ?search=node)
    const data = await courseService.getCourses(req.query);
    res.status(200).json(data);
  } catch (error) {
    next(error); // Melempar error ke middleware penanganan terpusat
  }
});


// 3. Endpoint 2: GET Single Course by ID [00:22:11]
app.get("/course/:id", async (req, res, next) => {
  try {
    const data = await courseService.getCourseById(req.params.id);
    if (!data) return res.status(404).json({ message: "Kelas tidak ditemukan" });
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
});

// 3. Endpoint 3: POST Add Course [00:23:06]
app.post("/course", authenticateToken, async (req, res, next) => {
  try {
    const savedCourse = await courseService.addCourse(req.body);
    res.status(201).json(savedCourse); // 201 Created status [00:24:24]
  } catch (error) {
    next(error);
  }
});

// 3. Endpoint 4: PATCH Update Course
app.patch("/course/:id", authenticateToken, async (req, res, next) => {
  try {
    const updatedCourse = await courseService.updateCourse(req.params.id, req.body);
    if (!updatedCourse) return res.status(404).json({ message: "Kelas gagal diperbarui, ID tidak ditemukan" });
    res.status(200).json(updatedCourse);
  } catch (error) {
    next(error);
  }
});

// 3. Endpoint 5: DELETE Course
app.delete("/course/:id", authenticateToken, async (req, res, next) => {
  try {
    const isDeleted = await courseService.deleteCourse(req.params.id);
    if (!isDeleted) return res.status(404).json({ message: "Kelas gagal dihapus, ID tidak ditemukan" });
    res.status(200).json({ message: "Kelas berhasil dihapus secara permanen dari database" });
  } catch (error) {
    next(error);
  }
});

// ==========================================
// TUGAS BARU - LANGKAH 2: ENDPOINT REGISTER
// ==========================================
app.post("/register", async (req, res, next) => {
  try {
    // Memanggil fungsi registerUser yang ada di file courseService.js
    const newUser = await courseService.registerUser(req.body);
    
    // Memberikan respon sukses 201 Created
    res.status(201).json({
      message: "User berhasil didaftarkan secara aman ke database!",
      data: newUser
    });
  } catch (error) {
    // Jika username atau email sudah kembar, server tidak crash melainkan ditangkap di sini
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ message: "Username atau Email sudah terdaftar!" });
    }
    next(error); // Melempar ke penanganan eror terpusat di bawah jika ada kendala lain
  }
});

app.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // LANGKAH A: Memeriksa keberadaan user berdasarkan email
    const user = await courseService.getUserByEmail(email);
    if (!user) {
      // Status 401 Unauthorized untuk email/password salah
      return res.status(401).json({ message: "Email atau password yang dimasukkan salah" });
    }

    // LANGKAH B: Memeriksa apakah password cocok menggunakan bcrypt.compare
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Email atau password yang dimasukkan salah" });
    }

    // LANGKAH C: Jika sukses cocok, buat token autentikasi JWT
    // Kunci rahasia token menggunakan nilai dari env atau default teks rahasia
    const secretKey = process.env.JWT_SECRET || "kunci_rahasia_edukursus"; 
    const token = jwt.sign(
      { id: user.id, username: user.username, email: user.email },
      secretKey,
      { expiresIn: "1h" } // Token kedaluwarsa dalam 1 jam
    );

    // Memberikan respon sukses 200 OK beserta tokennya
    res.status(200).json({
      message: "Login berhasil!",
      token: token,
      user: {
        id: user.id,
        fullname: user.fullname,
        username: user.username,
        email: user.email
      }
    });

  } catch (error) {
    next(error); // Lempar eror jika ada kendala server internal
  }
});

// 3. Endpoint Baru - Langkah 6 (Tahap 7 & 8): GET Verifikasi Email
app.get("/verifikasi-email", async (req, res, next) => {
  try {
    const { token } = req.query; // Menangkap parameter ?token=xxx dari URL

    if (!token) {
      return res.status(400).json({ message: "Invalid Verification Token" });
    }

    // Memanggil fungsi verifikasi token ke database
    const isSuccess = await courseService.verifyUserToken(token);

    if (!isSuccess) {
      // Tahap 7: Respons jika token palsu/tidak ditemukan
      return res.status(400).json({ message: "Invalid Verification Token" });
    }

    // Tahap 8: Respons apabila sukses verifikasi
    res.status(200).json({ message: "Email Verified Successfully" });
  } catch (error) {
    next(error);
  }
});

// 3. Endpoint Baru - Langkah 7: POST Upload Image
// Parameter 'image' di dalam upload.single harus sama dengan Key yang dimasukkan di Postman
app.post("/upload", upload.single("image"), (req, res) => {
  try {
    // Jika tidak ada berkas file yang diunggah
    if (!req.file) {
      return res.status(400).json({ message: "Gagal upload, file tidak ditemukan!" });
    }

    // Membuat alamat tautan URL gambar lokal agar bisa dipanggil oleh Front-End
    const imageUrl = `http://localhost:${PORT}/uploads/${req.file.filename}`;

    // Memberikan respon sukses beserta data informasi file gambarnya
    res.status(200).json({
      message: "Image Uploaded Successfully",
      filename: req.file.filename,
      url: imageUrl
    });
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan sistem saat unggah gambar" });
  }
});



// ==========================================
// ERROR HANDLING MIDDLEWARE & LISTEN PORT
// ==========================================

// 4. Asynchronous Error Handling Middleware terpusat agar server tidak crash [00:19:13, 00:25:56]
app.use((err, req, res, next) => {
  console.error("❌ Terjadi Kendala Server:", err.message); // Log internal backend [00:26:22]
  res.status(500).json({ status: "Error", message: "Something broke down on the server!" }); // [00:26:38]
});

app.listen(PORT, () => {
  console.log(`🚀 Server REST API EduCourse aktif di http://localhost:${PORT}/course`); // [00:19:36]
});

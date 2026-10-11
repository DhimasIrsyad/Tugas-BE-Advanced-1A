import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import * as courseService from "./src/services/courseService.js"; // Import service DML [00:20:31]

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json()); // Middleware wajib agar Express bisa membaca payload JSON dari request.body [00:24:31]

// 3. Endpoint 1: GET All Courses [00:19:44, 00:21:13]
app.get("/course", async (req, res, next) => {
  try {
    const data = await courseService.getCourses();
    res.status(200).json(data);
  } catch (error) {
    next(error); // Melempar error ke middleware penanganan terpusat [00:21:02]
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
app.post("/course", async (req, res, next) => {
  try {
    const savedCourse = await courseService.addCourse(req.body);
    res.status(201).json(savedCourse); // 201 Created status [00:24:24]
  } catch (error) {
    next(error);
  }
});

// 3. Endpoint 4: PATCH Update Course
app.patch("/course/:id", async (req, res, next) => {
  try {
    const updatedCourse = await courseService.updateCourse(req.params.id, req.body);
    if (!updatedCourse) return res.status(404).json({ message: "Kelas gagal diperbarui, ID tidak ditemukan" });
    res.status(200).json(updatedCourse);
  } catch (error) {
    next(error);
  }
});

// 3. Endpoint 5: DELETE Course
app.delete("/course/:id", async (req, res, next) => {
  try {
    const isDeleted = await courseService.deleteCourse(req.params.id);
    if (!isDeleted) return res.status(404).json({ message: "Kelas gagal dihapus, ID tidak ditemukan" });
    res.status(200).json({ message: "Kelas berhasil dihapus secara permanen dari database" });
  } catch (error) {
    next(error);
  }
});

// 4. Asynchronous Error Handling Middleware terpusat agar server tidak crash [00:19:13, 00:25:56]
app.use((err, req, res, next) => {
  console.error("❌ Terjadi Kendala Server:", err.message); // Log internal backend [00:26:22]
  res.status(500).json({ status: "Error", message: "Something broke down on the server!" }); // [00:26:38]
});

app.listen(PORT, () => {
  console.log(`🚀 Server REST API EduCourse aktif di http://localhost:${PORT}/course`); // [00:19:36]
});

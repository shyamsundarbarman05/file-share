import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import multer from "multer";
import { nanoid } from "nanoid";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// File Schema
const fileSchema = new mongoose.Schema({
  fileId: { type: String, required: true, unique: true },
  originalName: { type: String, required: true },
  path: { type: String, required: true },
  size: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now, expires: "24h" }, // Files expire in 24 hours
});

const File = mongoose.model("File", fileSchema);

// Multer setup for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "/tmp"); // Use the /tmp directory for Vercel
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Routes
app.post("/api/upload", upload.single("file"), async (req, res) => {
  if (!req.file) {
    console.log("Upload attempt with no file.");
    return res.status(400).send("No file uploaded.");
  }

  try {
    console.log("File received:", req.file);
    const { originalname, path, size } = req.file;
    const fileId = nanoid(6);

    const newFile = new File({
      fileId,
      originalName: originalname,
      path,
      size,
    });

    await newFile.save();
    console.log("File saved to DB with ID:", fileId);
    res.status(200).json({ fileId });
  } catch (error) {
    console.error("Server error during upload:", error);
    res.status(500).send("Server error");
  }
});

app.get("/api/file/:fileId", async (req, res) => {
  try {
    const file = await File.findOne({ fileId: req.params.fileId });
    if (!file) {
      return res.status(404).send("File not found or expired");
    }
    res.json(file);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

app.get("/api/download/:fileId", async (req, res) => {
  try {
    const file = await File.findOne({ fileId: req.params.fileId });
    if (!file) {
      return res.status(404).send("File not found or expired");
    }
    res.download(file.path, file.originalName);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

import express from "express";
import upload from "../middlewares/multer.js";
import { uploadBanner } from "../controllers/uploadController.js";

const router = express.Router();

router.post("/banner", upload.single("image"), uploadBanner);

export default router;
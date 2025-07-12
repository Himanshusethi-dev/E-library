import { Router } from "express";
import { createBook } from "../controller/book.js";
import multer from "multer";
import path from "node:path";
import { fileURLToPath } from "node:url";
import Authenticate from "../middlewares/authenticate.js";
const bookRouter = Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const upload = multer({
  dest: path.resolve(__dirname, "../../public/data/uploads"),
  limits: "3e7",
});
bookRouter.post(
  "/",
  Authenticate,
  upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "file", maxCount: 1 },
  ]),
  createBook
);

export default bookRouter;
import createHttpError from "http-errors";
import Book from "../model/book.js";
import cloudinary from "../config/cloudinary.js";
import path from "node:path";
import fs from "node:fs"
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const createBook = async (req, res, next) => {
  try {
    // console.log(req.body);
    const {title,price,genre} = req.body;
    console.log('body',req.body);
    // console.log('files',req.files);
    const coverImageName = req.files.coverImage[0].filename;
    const coverImagePath = path.resolve(__dirname,'../../public/data/uploads',coverImageName)

    const coverImageformat = req.files.coverImage[0].mimetype.split('/').at(-1);
    // console.log("cloudinary",cloudinary)
    const coverImageFile = await cloudinary.uploader.upload(coverImagePath, {
      folder: 'book-covers',
      resource_type: "auto",
      format : coverImageformat
    });
    // console.log('coverImageFile',coverImageFile)
    const fileName = req.files.file[0].filename;
    const filePath  = path.resolve(__dirname,'../../public/data/uploads',fileName)
    const bookFile = await cloudinary.uploader.upload(filePath, {
      folder: 'books-pdf',
      resource_type: "raw",
      format : "pdf"
    });


    const newBook = await Book.create({
      title,
      genre,
      author: req.userId,
      price,
      file : bookFile.secure_url,
      coverImage : coverImageFile.secure_url,
    })
      // console.log("filePath",filePath,fileName,coverImageName,coverImagePath)

      await  fs.promises.unlink(filePath);
      await  fs.promises.unlink(coverImagePath);
    
    // Send success response
    res.status(201).json({ id : newBook._id });
    
  } catch (error) {
    console.error("Error creating book:", error);
    next(createHttpError(500, "Something went wrong while creating the book"));
  }
};


export { createBook };

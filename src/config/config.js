import { config as configuration } from "dotenv";

configuration();

const _config = {
    port : process.env.PORT,
    database_url : process.env.DATABASE_URL,
    show_error : process.env.SHOW_ERROR,
    secret_key :  process.env.SECRET_KEY,
    cloud_name : process.env.CLOUD_NAME,
    cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
    cloudinary_api_secret : process.env.CLOUDINARY_API_SECRET
}


export const config = _config;
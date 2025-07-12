import createHttpError from "http-errors";
import { config } from "../config/config.js";
export const showHome = (req, res) => {
  if (config.show_error === 'true') {
    const error = createHttpError(400, "something went wrong");
    throw error;
  } else {
    res.status(200).json("E-library");
  }
};

import { Router } from "express";
import { showHome } from "../controller/global.js"

const route = Router();
 route.get('/',showHome)

export default route;
import { Router } from "express";
import {
  getRegiones,
  getRegion,
  createRegion,
  deleteRegion,
  updateRegion,
} from "../controllers/regiones.controllers.js";

const router = Router();

router.get("/regiones", getRegiones);

router.get("/regiones/:id", getRegion);

router.post("/regiones", createRegion);

router.put("/regiones/:id", updateRegion);

router.delete("/regiones/:id", deleteRegion);

export default router;

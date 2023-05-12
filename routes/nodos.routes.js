import { Router } from "express";
import {
  getNodos,
  getNodo,
  createNodo,
  deleteNodo,
  updateNodo,
} from "../controllers/nodos.controllers.js";

const router = Router();

router.get("/nodos", getNodos);

router.get("/nodos/:id", getNodo);

router.post("/nodos", createNodo);

router.put("/nodos/:id", updateNodo);

router.delete("/nodos/:id", deleteNodo);

export default router;

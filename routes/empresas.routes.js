import { Router } from "express";
import {
  getEmpresas,
  getEmpresa,
  createEmpresa,
  deleteEmpresa,
  updateEmpresa,
} from "../controllers/empresas.controllers.js";

const router = Router();

router.get("/empresas", getEmpresas);

router.get("/empresas/:id", getEmpresa);

router.post("/empresas", createEmpresa);

router.put("/empresas/:id", updateEmpresa);

router.delete("/empresas/:id", deleteEmpresa);

export default router;

import express from "express";
import cors from 'cors';
import { PORT } from "./config.js";
import indexRoutes from "./routes/index.routes.js";
import taskRoutes from "./routes/tasks.routes.js";
import personasRoutes from "./routes/personas.routes.js";
import  empresasRoutes from "./routes/empresas.routes.js";
import regionesRoutes from "./routes/regiones.routes.js";
import nodosRoutes from "./routes/nodos.routes.js";
const app = express();

app.use (cors());
app.use(express.json());

app.use(indexRoutes);
app.use(taskRoutes);
app.use(personasRoutes);
app.use(empresasRoutes);
app.use(regionesRoutes);
app.use(nodosRoutes);
app.listen(PORT);
console.log(`Server corriendo en el ${PORT}`);

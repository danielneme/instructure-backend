//TODO:ESTA SIN INSERT y SELECT DE TABLAS MULTIPLES!!!


import { pool } from "../db.js";

export const getNodos = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM NODOS ORDER BY nombre ASC"
    );
    if (result.length === 0)
    return res.status(404).json({ message: "No hay Nodos que mostrar" });

    res.json(result);
    
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getNodo = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM NODOS WHERE idNodo = ?", [
      req.params.id,
    ]);

    if (result.length === 0)
      return res.status(404).json({ message: "Nodo inexistente" });

    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createNodo = async (req, res) => {
  try {
    const { idNodo, tipoNodo, cantRacks, cantRacks_disp, fechaPreventivo, periocidadPreventivo, nombre, idRegiones } = req.body;
    const [result] = await pool.query(
        "INSERT INTO NODOS (`idNodo`, `tipoNodo`, `cantRacks`, `cantRacks_disp`, `fechaPreventivo`, `periocidadPreventivo`,`nombre`, `idRegiones`) VALUES (?,?,?,?,?,?,?,?)",
      [idNodo, tipoNodo, cantRacks, cantRacks_disp, fechaPreventivo, periocidadPreventivo, nombre, idRegiones]
    );
    res.json({
      idNodo, 
      tipoNodo,
      cantRacks,
      cantRacks_disp,
      fechaPreventivo,
      periocidadPreventivo,
      nombre,
      idRegiones
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateNodo = async (req, res) => {
  try {
    const result = await pool.query("UPDATE NODOS SET ? WHERE idNodo = ?", [
      req.body,
      req.params.id,
    ]);
    res.json(result);
  } catch (error) {
    if (result.affectedRows === 0)
    return res.status(404).json({ message: "Nodo inexistente" });
    
    return res.status(500).json({ message: error.message });
  }
};

export const deleteNodo = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE NODOS NODOS WHERE idNodo = ?", [
      req.params.id,
    ]);

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Nodo inexistente" });

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//TODO:ESTA SIN INSERT y SELECT DE TABLAS MULTIPLES!!!

import { pool } from "../db.js";

export const getEmpresas = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM EMPRESAS ORDER BY nombre ASC"
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getEmpresa = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM EMPRESAS WHERE cuit = ?", [
      req.params.id,
    ]);

    if (result.length === 0)
      return res.status(404).json({ message: "Empresa no encontrada" });

    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createEmpresa = async (req, res) => {
  try {
    const {
      nombre,
      cuit,
      telefono,
      correo,
      tipo,
      direccion,
      provincia,
      ciudad,
      codigoPostal,
    } = req.body;
    const [result] = await pool.query(
      "INSERT INTO EMPRESAS (`nombre`, `cuit`, `telefono`, `correo`, `tipo`,`direccion`, `provincia`, `ciudad`, `codigoPostal`) VALUES (?,?,?,?,?,?,?,?,?)",

      [
        nombre,
        cuit,
        telefono,
        correo,
        tipo,
        direccion,
        provincia,
        ciudad,
        codigoPostal,
      ]
    );
    res.json({
      nombre,
      cuit,
      telefono,
      correo,
      tipo,
      direccion,
      provincia,
      ciudad,
      codigoPostal,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateEmpresa = async (req, res) => {
  try {
    const result = await pool.query("UPDATE EMPRESAS SET ? WHERE cuit = ?", [
      req.body,
      req.params.id,
    ]);
    res.json(result);
  } catch (error) {
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Empresa no encontrada" });

    return res.status(500).json({ message: error.message });
  }
};

export const deleteEmpresa = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM EMPRESAS WHERE cuit = ?", [
      req.params.id,
    ]);

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Empresa no encontrada" });

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

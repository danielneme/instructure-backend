import { pool } from "../db.js";

export const getRegiones = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM REGIONES ORDER BY idregion ASC"
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getRegion = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM REGIONES WHERE idregion = ?",
      [req.params.id]
    );

    if (result.length === 0)
      return res.status(404).json({ message: "Region inexistente" });

    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createRegion = async (req, res) => {
  try {
    const { idregion, nombre } = req.body;
    const [result] = await pool.query(
      "INSERT INTO REGIONES (`idregion`, `nombre`) VALUES (?, ?)",
      [idregion, nombre]
    );
    res.json({
      idregion,
      nombre,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateRegion = async (req, res) => {
  try {
    const result = await pool.query("UPDATE REGIONES SET ? WHERE idregion = ?", [
      req.body,
      req.params.id,
    ]);
    res.json(result);
  } catch (error) {
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Region Inexistente" });

    return res.status(500).json({ message: error.message });
  }
};

export const deleteRegion = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM REGIONES WHERE idregion = ?", [
      req.params.id,
    ]);

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Region inexistente" });

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

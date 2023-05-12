import { pool } from "../db.js";

export const getPersonas = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM PERSONAS ORDER BY username ASC"
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getPersona = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM PERSONAS WHERE dni = ?", [
      req.params.id,
    ]);

    if (result.length === 0)
      return res.status(404).json({ message: "Persona no encontrada" });

    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createPersona = async (req, res) => {
  try {
    const { username, email, password, dni, telefono, tipo_persona, empresa } = req.body;
    const [result] = await pool.query(
        "INSERT INTO PERSONAS (`username`, `email`, `password`, `dni`, `telefono`, `tipo_persona`, `empresa`) VALUES (?,?,?,?,?,?,?)",
      [username, email, password, dni, telefono, tipo_persona, empresa]
    );
    res.json({
      username, 
      email,
      password,
      dni,
      telefono,
      tipo_persona,
      empresa
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updatePersona = async (req, res) => {
  try {
    const result = await pool.query("UPDATE PERSONAS SET ? WHERE dni = ?", [
      req.body,
      req.params.id,
    ]);
    res.json(result);
  } catch (error) {
    if (result.affectedRows === 0)
    return res.status(404).json({ message: "Persona no encontrada" });
    
    return res.status(500).json({ message: error.message });
  }
};

export const deletePersona = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM PERSONAS WHERE dni = ?", [
      req.params.id,
    ]);

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Persona no encontrada" });

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
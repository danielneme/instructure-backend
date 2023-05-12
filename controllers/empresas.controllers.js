import { pool } from "../db.js";

export const getEmpresas = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT e.*, r.idregion, r.nombre AS region_nombre FROM EMPRESAS e JOIN REGIONES_x_EMPRESAS re ON e.cuit = re.EMPRESAS_cuit JOIN REGIONES r ON re.REGIONES_idregion = r.idregion ORDER BY nombre ASC"
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getEmpresa = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT e.*, r.idregion, r.nombre AS region_nombre FROM EMPRESAS e JOIN REGIONES_x_EMPRESAS re ON e.cuit = re.EMPRESAS_cuit JOIN REGIONES r ON re.REGIONES_idregion = r.idregion WHERE e.cuit = ?",
      [req.params.id]
    );

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
    const [result1] = await pool.query(
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
    const idregiones_x_empresas = req.body.idregiones_x_empresas;
    const EMPRESAS_cuit = cuit;
    const REGIONES_idregion = req.body.REGIONES_idregion;

    const [result2] = await pool.query(
      "INSERT INTO REGIONES_x_EMPRESAS (`idregiones_x_empresas`, `EMPRESAS_cuit`, `REGIONES_idregion`) VALUES (?,?,?)",
      [idregiones_x_empresas, EMPRESAS_cuit, REGIONES_idregion]
    );

    res.json({
      empresa: {
        nombre,
        cuit,
        telefono,
        correo,
        tipo,
        direccion,
        provincia,
        ciudad,
        codigoPostal,
      },
      regiones_x_empresas: {
        idregiones_x_empresas,
        EMPRESAS_cuit,
        REGIONES_idregion,
      },
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
    res.json(result1);
    res.json(result2);
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

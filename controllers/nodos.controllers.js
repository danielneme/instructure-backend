import { pool } from "../db.js";

export const getNodos = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT n.*, t.fechaInsTablero, t.breakers_usados, t.max_amperaje, t.amp_actual, t.amp_anterior, t.breakers_instalados,h.fechaInsHVAC, h.fecha_filtro, h.horas_trabajadas, h.horas_anteriores, g.fechaInsGrupo, g.fecha_bateria, g.nombre_bateria, g.nombre_filtro_aire, g.fecha_filtro_aire, g.nombre_filtro_combustible, g.fecha_filtro_combustible, g.voltaje_bateria, g.voltaje_actual, g.voltaje_anterior FROM NODOS n LEFT JOIN TABLEROS_x_NODOS t ON n.idNodo = t.NODOS_idnodo LEFT JOIN HVACS_x_NODOS h ON n.idNodo = h.NODOS_idnodo LEFT JOIN GRUPOS_x_NODOS g ON n.idNodo = g.NODOS_idnodo  ORDER BY idNodo ASC ", 
    
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
    const [result] = await pool.query("SELECT n.*, t.fechaInsTablero, t.breakers_usados, t.max_amperaje, t.amp_actual, t.amp_anterior, t.breakers_instalados,h.fechaInsHVAC, h.fecha_filtro, h.horas_trabajadas, h.horas_anteriores, g.fechaInsGrupo, g.fecha_bateria, g.nombre_bateria, g.nombre_filtro_aire, g.fecha_filtro_aire, g.nombre_filtro_combustible, g.fecha_filtro_combustible, g.voltaje_bateria, g.voltaje_actual, g.voltaje_anterior FROM NODOS n LEFT JOIN TABLEROS_x_NODOS t ON n.idNodo = t.NODOS_idnodo LEFT JOIN HVACS_x_NODOS h ON n.idNodo = h.NODOS_idnodo LEFT JOIN GRUPOS_x_NODOS g ON n.idNodo = g.NODOS_idnodo  WHERE n.idNodo = ? ", 
    
    [
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
    const {
      idNodo,
      tipoNodo,
      cantRacks,
      cantRacks_disp,
      fechaPreventivo,
      periocidadPreventivo,
      nombre,
      idRegiones,
    } = req.body;
    const [result1] = await pool.query(
      "INSERT INTO NODOS (`idNodo`, `tipoNodo`, `cantRacks`, `cantRacks_disp`, `fechaPreventivo`, `periocidadPreventivo`,`nombre`, `idRegiones`) VALUES (?,?,?,?,?,?,?,?)",
      [
        idNodo,
        tipoNodo,
        cantRacks,
        cantRacks_disp,
        fechaPreventivo,
        periocidadPreventivo,
        nombre,
        idRegiones,
      ]
    );

    const NODOS_idnodo = idNodo;
    const TABLEROS_idtablero = req.body.TABLEROS_idtablero;
    const idTABLEROS_x_NODOS = req.body.idTABLEROS_x_NODOS;
    const HVACS_idhvac = req.body.HVACS_idhvac;
    const GRUPOS_ELECTROGENOS_idgrupo_electrogeno = req.body.GRUPOS_ELECTROGENOS_idgrupo_electrogeno;
    const fechaInsTablero= req.body.fechaInsTablero;
    const breakers_usados=req.body.breakers_usados;
    const max_amperaje=req.body.max_amperaje;
    const amp_actual=req.body.amp_actual;
    const amp_anterior=req.body.amp_anterior;
    const breakers_instalados=req.body.breakers_instalados;

    const [result2] = await pool.query(
      "INSERT INTO TABLEROS_x_NODOS (`idTABLEROS_x_NODOS`, `NODOS_idnodo`, `TABLEROS_idtablero`, `fechaInsTablero`, `breakers_usados`, `max_amperaje`, `amp_actual`, `amp_anterior`, `breakers_instalados`) VALUES (?,?,?,?,?,?,?,?,?)",
      [
        idTABLEROS_x_NODOS,
        NODOS_idnodo,
        TABLEROS_idtablero,
        fechaInsTablero,
        breakers_usados,
        max_amperaje,
        amp_actual,
        amp_anterior,
        breakers_instalados,
      ]
    );

      const idhvacs_x_nodos=req.body.idhvacs_x_nodos;
      const fechaInsHVAC=req.body.fechaInsHVAC;
      const fecha_filtro= req.body.fecha_filtro;
      const horas_trabajadas=req.body.horas_trabajadas;
      const horas_anteriores=req.body.horas_anteriores;

    const [result3] = await pool.query(
      "INSERT INTO HVACS_x_NODOS (`idhvacs_x_nodos`, `NODOS_idnodo`, `HVACS_idhvac`, `fechaInsHVAC`, `fecha_filtro`, `horas_trabajadas`, `horas_anteriores`) VALUES (?,?,?,?,?,?,?)",
      [
        idhvacs_x_nodos,
        NODOS_idnodo,
        HVACS_idhvac,
        fechaInsHVAC,
        fecha_filtro,
        horas_trabajadas,
        horas_anteriores,
      ]
    );

      const idgrupos_x_nodos= req.body.idgrupos_x_nodos;
      const fechaInsGrupo=req.body.fechaInsGrupo;
      const fecha_bateria=req.body.fecha_bateria;
      const nombre_bateria= req.body.nombre_bateria;
      const nombre_filtro_aire=req.body.nombre_filtro_aire;
      const fecha_filtro_aire=req.body.fecha_filtro_aire;
      const nombre_filtro_combustible=req.body.nombre_filtro_combustible;
      const fecha_filtro_combustible=req.body.fecha_filtro_combustible;
      const voltaje_bateria=req.body.voltaje_bateria;
      const voltaje_actual=req.body.voltaje_actual;
      const voltaje_anterior=req.body.voltaje_anterior;



    const [result4] = await pool.query(
      "INSERT INTO GRUPOS_x_NODOS (`idgrupos_x_nodos`, `GRUPOS_ELECTROGENOS_idgrupo_electrogeno`, `NODOS_idnodo`, `fechaInsGrupo`, `fecha_bateria`, `nombre_bateria`, `nombre_filtro_aire`, `fecha_filtro_aire`, `nombre_filtro_combustible`, `fecha_filtro_combustible`, `voltaje_bateria`, `voltaje_actual`, `voltaje_anterior`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        idgrupos_x_nodos,
        GRUPOS_ELECTROGENOS_idgrupo_electrogeno,
        NODOS_idnodo,
        fechaInsGrupo,
        fecha_bateria,
        nombre_bateria,
        nombre_filtro_aire,
        fecha_filtro_aire,
        nombre_filtro_combustible,
        fecha_filtro_combustible,
        voltaje_bateria,
        voltaje_actual,
        voltaje_anterior,
      ]
    );

    res.json({
      nodos: {
        idNodo,
        tipoNodo,
        cantRacks,
        cantRacks_disp,
        fechaPreventivo,
        periocidadPreventivo,
        nombre,
        idRegiones,
      },
      tableros_x_nodos: {
        idTABLEROS_x_NODOS,
        NODOS_idnodo,
        TABLEROS_idtablero,
        fechaInsTablero,
        breakers_usados,
        max_amperaje,
        amp_actual,
        amp_anterior,
        breakers_instalados,
      },
      hvacs_x_nodos: {
        idhvacs_x_nodos,
        NODOS_idnodo,
        HVACS_idhvac,
        fechaInsHVAC,
        fecha_filtro,
        horas_trabajadas,
        horas_anteriores,
      },
      grupos_x_nodos: {
        idgrupos_x_nodos,
        GRUPOS_ELECTROGENOS_idgrupo_electrogeno,
        NODOS_idnodo,
        fechaInsGrupo,
        fecha_bateria,
        nombre_bateria,
        nombre_filtro_aire,
        fecha_filtro_aire,
        nombre_filtro_combustible,
        fecha_filtro_combustible,
        voltaje_bateria,
        voltaje_actual,
        voltaje_anterior,
      },
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

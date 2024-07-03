import { dataBase } from "../../../lib/config/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    switch (req.method) {
      case "GET":
        return await getDetained(req, res);
      case "POST":
        return await createDetained(req, res);
      default:
        throw new Error("Metodo invalido");
    }
  } catch (error) {
    error;
    return res.status(500).json({
      message: new Error(error).message,
      success: false,
    });
  }
}

const getDetained = async (req: NextApiRequest, res: NextApiResponse) => {
  const fecha = new Date();
  const formattedFecha = fecha.toISOString();
  dataBase.query(
    "SELECT  * FROM delincuentes",
    [formattedFecha],
    function (err, rows, fields) {
      if (err) {
        console.error(err);
        return res.status(500).json({
          message: "Error al ejecutar la consulta",
          success: false,
        });
      }
      return res.status(200).json({
        message: "Delincuentes",
        data: rows,
        success: true,
      });
    }
  );
};

const createDetained = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    nombre,
    cedula,
    file,
    pasaporte,
    ruc,
    alias,
    otros_nombres,
    condicion_cedulado,
    nacionalidad,
    fecha_nacimiento,
    lugar_nacimiento,
    edad,
    huellas,
    estado_civil,
    nombre_conyuge,
    profesion,
    domicilio,
    celular,
    celular_fijo,
    nombre_padre,
    nombre_madre,
    antecedentes_siipe,
    licencia,
    vehiculos,
    movimientos_migratorios,
    impedimento_salida,
  } = req.body;

  const query = `INSERT INTO delincuentes (
    nombre, 
    cedula, 
    file, 
    pasaporte, 
    ruc, 
    alias, 
    otros_nombres, 
    condicion_cedulado, 
    nacionalidad, 
    fecha_nacimiento, 
    lugar_nacimiento, 
    edad, 
    huellas, 
    estado_civil, 
    nombre_conyuge, 
    profesion, 
    domicilio, 
    celular, 
    celular_fijo, 
    nombre_padre, 
    nombre_madre, 
    antecedentes_siipe, 
    licencia, 
    vehiculos, 
    movimientos_migratorios, 
    impedimento_salida
    ) 
    VALUES 
    (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  dataBase.query(
    query,
    [
      nombre,
      cedula,
      file,
      pasaporte,
      ruc,
      alias,
      otros_nombres,
      condicion_cedulado,
      nacionalidad,
      fecha_nacimiento,
      lugar_nacimiento,
      edad,
      huellas,
      estado_civil,
      nombre_conyuge,
      profesion,
      domicilio,
      celular,
      celular_fijo,
      nombre_padre,
      nombre_madre,
      antecedentes_siipe,
      licencia,
      vehiculos,
      movimientos_migratorios,
      impedimento_salida,
    ],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          message: "Error al crear el delincuente",
          success: false,
        });
      }

      return res.status(201).json({
        message: "Delincuente creado con éxito",
        success: true,
      });
    }
  );
};

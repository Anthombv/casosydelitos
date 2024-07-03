import { dataBase } from "../../../lib/config/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    switch (req.method) {
      case "GET":
        return await getCrimes(req, res);
      case "POST":
        return await createCrimes(req, res);
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

const getCrimes = async (req: NextApiRequest, res: NextApiResponse) => {
  const fecha = new Date();
  const formattedFecha = fecha.toISOString();
  dataBase.query(
    "SELECT  * FROM delitos",
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
        message: "Delitos",
        data: rows,
        success: true,
      });
    }
  );
};

const createCrimes = async (req: NextApiRequest, res: NextApiResponse) => {
  const { detalle, fecha } = req.body;
  const query = `INSERT INTO delitos (detalle, fecha) VALUES (?, ?)`;
  dataBase.query(query, [detalle, fecha], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({
        message: "Error al crear el Delito",
        success: false,
      });
    }

    return res.status(201).json({
      message: "Delito creado con éxito",
      success: true,
    });
  });
};

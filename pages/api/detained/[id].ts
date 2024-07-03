import { dataBase } from "../../../lib/config/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    switch (req.method) {
      case "GET":
        return await getOneDetained(req, res);
      case "DELETE":
      //return await remove(req, res)
      default:
        throw new Error("Invalid method");
    }
  } catch (error) {
    console.error(error);
    // return the error
    return res.status(500).json({
      message: new Error(error).message,
      success: false,
    });
  }
}

const getOneDetained = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query; // Obtener el ID del delincuente desde la solicitud

  if (!id) {
    return res.status(400).json({
      message: "Falta proporcionar el ID del delincuente",
      success: false,
    });
  }

  dataBase.query(
    "SELECT * FROM delincuentes WHERE id_delincuente = ?",
    [id], // Usar el ID del delincuente como parámetro para la consulta
    function (err, rows, fields) {
      if (err) {
        console.error(err);
        return res.status(500).json({
          message: "Error al ejecutar la consulta",
          success: false,
        });
      }
      if (rows.length === 0) {
        return res.status(404).json({
          message: "No se encontró el delincuente con el ID proporcionado",
          success: false,
        });
      }
      return res.status(200).json({
        message: "Detalles del delincuente",
        data: rows[0],
        success: true,
      });
    }
  );
};

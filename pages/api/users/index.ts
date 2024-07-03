import { dataBase } from "../../../lib/config/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    switch (req.method) {
      case "GET":
        return await getClient(req, res);
      case "POST":
        return await createUser(req, res);
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

const getClient = async (req: NextApiRequest, res: NextApiResponse) => {
  const fecha = new Date();
  const formattedFecha = fecha.toISOString();
  dataBase.query(
    "SELECT  * FROM users",
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
        message: "Usuarios",
        data: rows,
        success: true,
      });
    }
  );
};

const createUser = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ message: "Método no permitido", success: false });
  }

  const { userName, password, name, email, phone, role } = req.body;

  if (
    !userName ||
    !password ||
    !name ||
    !email ||
    !phone ||
    role === undefined
  ) {
    return res.status(400).json({
      message: "Faltan datos necesarios para crear el usuario",
      success: false,
    });
  }

  const query = `INSERT INTO users (userName, password, name, email, phone, role) VALUES (?, ?, ?, ?, ?, ?)`;

  dataBase.query(
    query,
    [userName, password, name, email, phone, role],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          message: "Error al crear el usuario",
          success: false,
        });
      }

      return res.status(201).json({
        message: "Usuario creado con éxito",
        success: true,
      });
    }
  );
};

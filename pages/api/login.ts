import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  
  try {
    const { userName, password } = req.body.formData;
    console.log("usuario", userName, password)
    const response = await fetch('http://localhost:3500/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userName, password })
    });
    console.log(response)

    if (!response.ok) {
      throw new Error(`Error en el servidor de autenticación: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Datos recibidos del servidor Express:", data);
    

    return res.status(200).json(data);

  } catch (error) {
    console.error("Error de conexión con el servidor Express:", error);
    return res.status(500).json({ message: error.message });
  }
}


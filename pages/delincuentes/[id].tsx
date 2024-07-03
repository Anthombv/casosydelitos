/* eslint-disable @next/next/no-img-element */
import Router from "next/router";
import { Delincuente } from "../../models/delincuentes";
import { useEffect, useState } from "react";
import { ResponseData } from "../../models";
import HttpClient from "../../lib/utils/http_client";
import { useAuth } from "../../lib/hooks/use_auth";
import Sidebar from "../../lib/components/sidebar";

const FichaDelincuentes = () => {
  const { auth } = useAuth();
  const [delincuente, setDelincuente] = useState<Delincuente | null>(null);
  const loadData = async () => {
    if (Router.asPath !== Router.route) {
      const delincuenteID = Router.query.id as string;
      console.log(delincuenteID);
      const response: ResponseData = await HttpClient(
        "/api/detained/" + delincuenteID,
        "GET",
        auth.userName,
        auth.role
      );
      setDelincuente(response.data);
      console.log(response.data);
    } else {
      setTimeout(loadData, 1000);
    }
  };
  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const imageUrl = typeof delincuente?.file === "string" ? delincuente?.file : "";

  return (
    <>
      <div className="flex h-full">
        <div className="md:w-1/6 max-w-none">
          <Sidebar />
        </div>
        <div className="w-12/12 md:w-5/6 flex items-center justify-center">
          <div className="w-11/12 bg-white my-14">
            {delincuente ? (
              <>
                <h2 className="text-2xl text-center font-semibold text-gray-800 mb-4">
                  Información del Delincuente
                </h2>
                {imageUrl && (
                  <img
                    src={imageUrl}
                    alt={`Imagen de ${delincuente.nombre}`}
                    style={{ width: "50%", height: "auto" }}
                    className="mx-auto"
                  />
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="mb-3 mx-auto">
                    <h3 className="text-gray-600 font-semibold text-lg">
                      Datos Personales
                    </h3>
                    <p>
                      <strong>Nombre:</strong> {delincuente.nombre}
                    </p>
                    <p>
                      <strong>Cédula:</strong> {delincuente.cedula}
                    </p>
                    <p>
                      <strong>Pasaporte:</strong> {delincuente.pasaporte}
                    </p>
                    <p>
                      <strong>RUC:</strong> {delincuente.ruc}
                    </p>
                    <p>
                      <strong>Alias:</strong> {delincuente.alias}
                    </p>
                    <p>
                      <strong>Otros Nombres:</strong> {delincuente.otrosNombres}
                    </p>
                    <p>
                      <strong>Condición Cedulado:</strong>{" "}
                      {delincuente.condicionCedulado}
                    </p>
                    <p>
                      <strong>Nacionalidad:</strong> {delincuente.nacionalidad}
                    </p>
                    <p>
                      <strong>Fecha de Nacimiento:</strong>{" "}
                      {delincuente.fechaNacimiento}
                    </p>
                    <p>
                      <strong>Lugar de Nacimiento:</strong>{" "}
                      {delincuente.lugarNacimiento}
                    </p>
                    <p>
                      <strong>Edad:</strong> {delincuente.edad}
                    </p>
                    <p>
                      <strong>Estado Civil:</strong> {delincuente.estadoCivil}
                    </p>
                    <p>
                      <strong>Nombre del Cónyuge:</strong>{" "}
                      {delincuente.nombreConyuge}
                    </p>
                  </div>
                  <div className="mb-3 mx-auto">
                    <h3 className="text-gray-600 font-semibold text-lg">
                      Datos Complementarios
                    </h3>
                    <p>
                      <strong>Profesión:</strong> {delincuente.profesion}
                    </p>
                    <p>
                      <strong>Domicilio:</strong> {delincuente.domicilio}
                    </p>
                    <p>
                      <strong>Celular:</strong> {delincuente.celular}
                    </p>
                    <p>
                      <strong>Teléfono Fijo:</strong> {delincuente.celularFijo}
                    </p>
                    <p>
                      <strong>Nombre del Padre:</strong>{" "}
                      {delincuente.nombrePadre}
                    </p>
                    <p>
                      <strong>Nombre de la Madre:</strong>{" "}
                      {delincuente.nombreMadre}
                    </p>
                    <p>
                      <strong>Antecedentes SIIPe:</strong>{" "}
                      {delincuente.antecedentesSiipe}
                    </p>
                    <p>
                      <strong>Licencia:</strong> {delincuente.licencia}
                    </p>
                    <p>
                      <strong>Vehículos:</strong> {delincuente.vehiculos}
                    </p>
                    <p>
                      <strong>Movimientos Migratorios:</strong>{" "}
                      {delincuente.movimientosMigratorios}
                    </p>
                    <p>
                      <strong>Impedimento de Salida:</strong>{" "}
                      {delincuente.impedimentoSalida}
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <p>Cargando datos...</p>
            )}
            <div>
              <h3 className="text-center text-xl font-semibold">
                Casos atribuidos
              </h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FichaDelincuentes;

/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { useFormik } from "formik";
import { useAuth } from "../../hooks/use_auth";
import { LoginData } from "../../../models";
import HttpClient from "../../utils/http_client";
import { toast } from "react-toastify";
import LoadingContainer from "../../components/loading_container";

const currentYear = new Date().getFullYear();
// login de la app
const Login = () => {
  const [loading, setLoading] = useState<boolean>(false);
  // llama la funcion para iniciar sesion
  const { login } = useAuth();

  // valores del formulario
  const [initialValues, _setInitialValues] = useState<LoginData>({
    userName: "",
    password: "",
  });

  // envia los datos del formulario
  const onSubmit = async (formData: LoginData) => {
    setLoading(true);
    console.log("Enviando datos del formulario:", formData);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ formData }),
      });

      const data = await response.json(); // Convertir la respuesta en JSON

      if (response.ok) {
        console.log("Respuesta del servidor:", data);
        login(data.user); // Llama a la función de login y pasa los datos del usuario
      } else {
        throw new Error(
          data.message || "Error desconocido al intentar iniciar sesión"
        );
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      toast.error(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // maneja los datos y comportamiento del formulario
  const formik = useFormik({
    enableReinitialize: true,
    validateOnMount: true,
    validateOnBlur: true,
    validateOnChange: true,
    initialValues,
    onSubmit,
  });

  return (
    <>
      <title>Casos y delitos</title>
      <section className="min-h-screen w-full flex items-center justify-center bg-lime-100">
        <div className="container py-5">
          <div className="flex justify-center items-center m-2">
            <div className="w-full md:w-8/12 lg:w-6/12 xl:w-3/12">
              <div className="text-dark rounded-3xl bg-gradient-to-br from-slate-200 via-slate-300 to-slate-400">
                <div className="p-5 ">
                  <div className="mb-5 mt-4 ">
                    <h2
                      className="text-center"
                      style={{
                        color: "black",
                        padding: "12px",
                        fontSize: "28px",
                        fontWeight: "bold"
                      }}
                    >
                      Casos y delitos
                    </h2>
                    <h4 style={{
                        color: "black",
                        padding: "12px",
                        fontSize: "20px",
                        fontWeight: "bold"
                      }}>Inicio de sesión</h4>
                    <LoadingContainer visible={loading} miniVersion>
                      <form onSubmit={formik.handleSubmit}>
                        <div className="my-4">
                          <label className="block">Nombre de Usuario</label>
                          <input
                            type="text"
                            name="userName"
                            value={formik.values.userName}
                            onChange={formik.handleChange}
                            placeholder="Ingrese su usuario"
                            className="form-control h-8 bg-gray-200 w-full rounded pl-2"
                          />
                        </div>
                        <div className="mb-5">
                          <label className="block">Contraseña</label>
                          <input
                            type="password"
                            name="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            placeholder="Ingrese su contraseña"
                            className="form-control h-8 bg-gray-200 w-full rounded pl-2"
                          />
                        </div>

                        <button
                          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded font-semibold justify-center"
                          type="submit"
                        >
                          Iniciar Sesión
                        </button>
                      </form>
                    </LoadingContainer>
                  </div>
                  {/* <div className="flex">
                    <div className="w-1/2">
                      <img
                        src="/logoIc.png"
                        alt=""
                        width={160}
                        className="mx-auto"
                      />
                    </div>
                    <div className="w-1/2">
                      <img
                        src="/logoIg.png"
                        alt=""
                        width={160}
                        className="mx-auto"
                      />
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;

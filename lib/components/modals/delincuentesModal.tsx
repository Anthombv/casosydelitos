import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../hooks/use_auth";
import { ModalProps } from "../../../models";
import { Delincuente } from "../../../models/delincuentes";
import { toast } from "react-toastify";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import storage from "../../config/firebase/config";

const initialDetained: Delincuente = {
  id: null,
  nombre: "",
  cedula: 0,
  file: null,
  pasaporte: "",
  ruc: "",
  alias: "",
  otrosNombres: "",
  condicionCedulado: "",
  nacionalidad: "",
  fechaNacimiento: "",
  lugarNacimiento: "",
  edad: 0,
  huellas: "",
  estadoCivil: "",
  nombreConyuge: "",
  profesion: "",
  domicilio: "",
  celular: "",
  celularFijo: "",
  nombrePadre: "",
  nombreMadre: "",
  antecedentesSiipe: "",
  licencia: "",
  vehiculos: "",
  movimientosMigratorios: "",
  impedimentoSalida: "",
};

interface Props extends ModalProps<Delincuente> {
  initialData?: Delincuente;
}

const DelincuentesModal = (props: Props) => {
  const { auth } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [image, setImage] = useState<File>(null);
  const [initialValues, setInitialValues] =
    useState<Delincuente>(initialDetained);

  const handleClose = () => {
    formik.resetForm({ values: initialDetained });
    setImage(null);
    props.close();
  };

  // maneja los datos y comportamiento del formulario
  const formik = useFormik({
    enableReinitialize: true,
    validateOnMount: true,
    validateOnBlur: true,
    validateOnChange: true,
    initialValues,
    onSubmit: async (formData: Delincuente) => {
      setLoading(true);
      const file = image ?? props.initialData?.file;
      if (formData.nombre === "") {
        toast.warning("El nombre no puede estar vacio");
        return;
      }

      if (formData.file && formData.file instanceof File) {
        const file = formData.file;
        const fileRef = ref(storage, `files/${file.name}`);
        try {
          const snapshot = await uploadBytes(fileRef, file);
          const secure_url = await getDownloadURL(snapshot.ref);
          const updatedFormData = {
            ...formData,
            file: secure_url, // Actualizamos el objeto file a un CloudImage
          };
          props.onDone(updatedFormData);
          handleClose();
          console.log("Archivo subido con éxito:", secure_url);
        } catch (error) {
          console.error("Error al subir archivo: ", error);
          toast.error("Error al cargar el archivo");
        }
      } else {
        // No hay nuevo archivo para cargar, manejar datos como están
        props.onDone(formData);
        handleClose();
      }
      setLoading(false);
      console.log(file);
      handleClose();
    },
  });

  useEffect(() => {
    if (props.initialData) setInitialValues(props.initialData);
  }, [props.initialData]);

  return (
    <>
      <div
        className={`fixed inset-0 flex items-center justify-center z-50 ${
          props.visible ? "" : "hidden"
        }`}
      >
        <div className="fixed inset-0 bg-black opacity-50"></div>
        <div className="bg-white p-6 rounded shadow-lg z-10 w-2/3 h-5/6 overflow-y-auto">
          <form onSubmit={formik.handleSubmit}>
            <div className="text-center text-gray-900 text-xl mb-2 font-semibold">
              Crear Nuevo delincuente
            </div>
            <hr />
            <div className="grid md:grid-cols-2 grid-cols-1 gap-4 mb-3">
              <div>
                <label className="text-gray-700 text-sm font-bold mb-2">
                  Nombre del delincuente
                </label>

                <input
                  className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  type="text"
                  placeholder=" Nombre del delincuente"
                  name="nombre"
                  onChange={formik.handleChange}
                  value={formik.values.nombre}
                />
              </div>

              <div>
                <label className="text-gray-700 text-sm font-bold mb-2">
                  Cédula del delincuente
                </label>

                <input
                  className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  type="text"
                  placeholder="Cédula del delincuente"
                  name="cedula"
                  onChange={formik.handleChange}
                  value={formik.values.cedula}
                />
              </div>
              <div>
                <label className="text-gray-700 text-sm font-bold mb-2">
                  Pasaporte
                </label>

                <input
                  className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  type="text"
                  placeholder="Pasaporte"
                  name="pasaporte"
                  onChange={formik.handleChange}
                  value={formik.values.pasaporte}
                />
              </div>
              <div>
                <label className="text-gray-700 text-sm font-bold mb-2">
                  Ruc
                </label>

                <input
                  className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  type="text"
                  placeholder="Ruc"
                  name="ruc"
                  onChange={formik.handleChange}
                  value={formik.values.ruc}
                />
              </div>
              <div>
                <label className="text-gray-700 text-sm font-bold mb-2">
                  Alias
                </label>

                <input
                  className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  type="text"
                  placeholder="Alias"
                  name="alias"
                  onChange={formik.handleChange}
                  value={formik.values.alias}
                />
              </div>
              <div>
                <label className="text-gray-700 text-sm font-bold mb-2">
                  Foto del delincuente
                </label>
                <input
                  type="file"
                  onChange={(event) => {
                    formik.setFieldValue("file", event.currentTarget.files[0]);
                  }}
                />
              </div>
            </div>
            <hr />
            <button
              className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mb-4"
              type="submit"
            >
              Guardar
            </button>
          </form>
          <button
            className="bg-transparent hover:bg-gray-500 text-gray-700 font-semibold hover:text-white py-2 px-4 border border-gray-500 hover:border-transparent rounded"
            onClick={handleClose}
          >
            Cancelar
          </button>
        </div>
      </div>
    </>
  );
};
export default DelincuentesModal;

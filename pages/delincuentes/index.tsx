import { useEffect, useState } from "react";
import LoadingContainer from "../../lib/components/loading_container";
import Sidebar from "../../lib/components/sidebar";
import TreeTable, { ColumnData } from "../../lib/components/tree_table";
import { useAuth } from "../../lib/hooks/use_auth";
import HttpClient from "../../lib/utils/http_client";
import { toast } from "react-toastify";
import { ResponseData, User } from "../../models";
import DelincuentesModal from "../../lib/components/modals/delincuentesModal";
import { Delincuente } from "../../models/delincuentes";
import Router from "next/router";

const Delincuentes = () => {
  const { auth } = useAuth();
  const [loading, setLoading] = useState<boolean>(true);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [tableData, setTableData] = useState<Array<Delincuente>>([]);
  const [editingDetained, setEditingDetained] = useState<Delincuente | null>(
    null
  );

    const loadData = async () => {
      setLoading(true);
      const response = await HttpClient(
        "/api/detained",
        "GET",
        auth.userName,
        auth.role
      );
      if (response.success) {
        const delincuentes: Array<any> = response.data;
        const delincuenteConId = delincuentes.map(delincuente => ({
          ...delincuente,
          id: delincuente.id_delincuente
        }));
        setTableData(delincuenteConId);
        console.log(delincuenteConId)
      } else {
        toast.warning(response.message);
      }
      setLoading(false);
    };

    // ejecuta funcion al renderizar la vista
    useEffect(() => {
      loadData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

  const showModal = () => setModalVisible(true);
  const hideModal = async () => {
    if (editingDetained != null) setEditingDetained(null);
    setModalVisible(false);
    await loadData();
  };

  const columns: ColumnData[] = [
    {
      dataField: "nombre",
      caption: "Nombre",
    },
    {
      dataField: "cedula",
      caption: "Cédula",
    },
    {
      dataField: "pasaporte",
      caption: "Pasaporte",
    },
  ];

  const buttons = {
    show: (rowData: any) => {
      Router.push({
        pathname: "/delincuentes/" + (rowData.id as string),
      })
    },
    edit: (rowData: any) => {
      setEditingDetained(rowData);
      showModal();
    },
    delete: async (rowData: any) => {
      await HttpClient(
        "/api/detained/" + rowData.id,
        "DELETE",
        auth.userName,
        auth.role
      );
      await loadData();
    },
  };

  return (
    <>
      <title>Delincuentes</title>

      <div className="flex h-full">
        <div className="md:w-1/6 max-w-none">
          <Sidebar />
        </div>
        <div className="w-12/12 md:w-5/6 flex items-center justify-center">
          <div className="w-11/12 bg-white my-14">
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4 m-2">
              <h2 className="text-center text-xl font-bold">Registro de detenidos</h2>
              <div>
              <button
                className="text-center bg-transparent hover:bg-lime-500 text-lime-500 font-semibold hover:text-white py-2 px-4 border border-lime-500 hover:border-transparent rounded"
                onClick={showModal}
              >
                Crear detenido
              </button>
              </div>
              <LoadingContainer visible={loading} miniVersion>
                <TreeTable
                  dataSource={tableData}
                  columns={columns}
                  buttons={buttons}
                  searchPanel={true}
                  colors={{ headerBackground: "#F8F9F9", headerColor: "black" }}
                  paging
                  showNavigationButtons
                  showNavigationInfo
                  pageSize={10}
                  infoText={(actual, total, items) =>
                    `Página ${actual} de ${total} (${items} delincuentes)`
                  }
                />
              </LoadingContainer>
            </div>
          </div>
        </div>
        <DelincuentesModal
          visible={modalVisible}
          close={hideModal}
          initialData={editingDetained}
          onDone={async (newUser: Delincuente) => {
            const response: ResponseData =
              editingDetained == null
                ? await HttpClient(
                    "/api/detained",
                    "POST",
                    auth.userName,
                    auth.role,
                    newUser
                  )
                : await HttpClient(
                    "/api/detained",
                    "PUT",
                    auth.userName,
                    auth.role,
                    newUser
                  );
            if (response.success) {
              toast.success(
                editingDetained == null
                  ? "Delincuente creado!"
                  : "Delincuente actualizado!"
              );
            } else {
              toast.warning(response.message);
            }
          }}
        />
      </div>
    </>
  );
};
export default Delincuentes;

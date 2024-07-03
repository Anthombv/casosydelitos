import { useEffect, useState } from "react";
import { useAuth } from "../../lib/hooks/use_auth";
import { Delitos } from "../../models/casos";
import HttpClient from "../../lib/utils/http_client";
import { toast } from "react-toastify";
import Sidebar from "../../lib/components/sidebar";

const DelitosPage = () => {
  const { auth } = useAuth();
  const [loading, setLoading] = useState<boolean>(true);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [tableData, setTableData] = useState<Array<Delitos>>([]);
  const [editingDelitos, setEditingDelitos] = useState<Delitos | null>(null);

  const loadData = async () => {
    setLoading(true);
    const response = await HttpClient(
      "/api/crimes",
      "GET",
      auth.userName,
      auth.role
    );
    if (response.success) {
      const delitos: Array<any> = response.data;
      const delitosConId = delitos.map((delitos) => ({
        ...delitos,
        id: delitos.id_delito,
      }));
      setTableData(delitosConId);
      console.log(delitosConId);
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

  return (
    <>
      <div className="flex h-full">
        <div className="md:w-1/6 max-w-none">
          <Sidebar />
        </div>
        <div className="w-12/12 md:w-5/6 flex items-center justify-center">
          <div className="w-11/12 bg-white my-14"></div>
        </div>
      </div>
    </>
  );
};

export default DelitosPage;

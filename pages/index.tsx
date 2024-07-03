import Sidebar from "../lib/components/sidebar";
import { useAuth } from "../lib/hooks/use_auth";

export default function Home() {
  const { auth } = useAuth();

  return (
    <>
      <title>Casos y delitos</title>
      <div className="flex h-screen">
        <div className="md:w-1/6 max-w-none">
          <Sidebar />
        </div>
        <div className="w-12/12 md:w-5/6 bg-gray-200">
          <div
            className="mt-6 "
            style={{ display: "flex", alignItems: "center" }}
          >
            <p
              className="md:text-4xl text-xl text-center m-6"
              style={{
                display: "inline-block",
                color: "black",
                padding: "12px",
                fontSize: "40px",
                fontWeight: "bold",
              }}
            >
              <strong>Casos y delitos</strong>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

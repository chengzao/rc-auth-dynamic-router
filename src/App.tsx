import { useEffect, useState } from "react";
import { RouterProvider } from "react-router-dom";
import { getUserInfo } from "@/services/user";
import { useAppContext } from "@/app-context";
import { addRoutes, filterRoutes, gotoLogin, router } from "./router";

export function App() {
  const [loading, setLoading] = useState(true);
  const { dispatch } = useAppContext();
  const token = localStorage.getItem("token");

  const fetchData = () => {
    if (!token) {
      setLoading(false);
      gotoLogin();
      return;
    }

    getUserInfo()
      .then((res: any) => {
        const data = res.data.data || [];
        const menus = filterRoutes(data);

        dispatch({ type: "SET_MENUS", payload: menus });
        setLoading(false);

        addRoutes(router, data);
      })
      .catch((err) => {
        console.log("fetch error", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  if (loading) {
    return <div>loading...</div>;
  }

  return <RouterProvider router={router} />;
}

export default App;

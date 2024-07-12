import { Suspense } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useAppContext } from "@/app-context";
import { Loading } from "@/components/NProgress";
import { cn } from "@/lib/utils";

function Layout() {
  const { menus } = useAppContext();

  const logout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <div className="flex h-screen w-full">
      <aside className="flex h-full flex-col border-r flex-shrink-0 min-w-48">
        <section className="mb-2 border-b p-4">
          <h1>KMS DashBoard</h1>
        </section>
        <nav className="flex-1 overflow-auto my-3">
          <ul>
            {menus.map((menu, index) => (
              <li key={index} className="px-3 py-1">
                <NavLink
                  to={menu.path}
                  className={({ isActive }) =>
                    cn(
                      "block rounded p-1 hover:bg-[rgba(0,0,0,0.06)]",
                      isActive ? "active bg-[#e6f4ff] text-[#1677ff]" : ""
                    )
                  }
                >
                  {menu.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <section className="mt-auto border-t p-3 text-right">
          <span onClick={logout} className="cursor-pointer text-red-600">
            logout
          </span>
        </section>
      </aside>
      <main className="flex flex-col flex-1 pl-5">
        <Suspense fallback={<Loading />}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
}

export default Layout;

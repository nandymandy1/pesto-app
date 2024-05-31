import useToggle from "@hooks/useToggle";
import useAuth from "@store/useAuth";
import clsx from "clsx";
import { Navigate, Outlet } from "react-router-dom";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const DashboardLayout = () => {
  const { isLoggedIn } = useAuth();
  const [sidebarIsOpen, toggleSidebar] = useToggle(false);

  if (!isLoggedIn) {
    return <Navigate to="/auth/login" replace />;
  }

  return (
    <div
      className={clsx(
        "w-full h-[100vh] grid bg-[#F0F2F5] transition-all duration-300 ease-in grid-rows-[72px_1fr]",
        {
          "grid-cols-1": !sidebarIsOpen,
          "grid-cols-[300px_1fr]": sidebarIsOpen,
        }
      )}
    >
      <aside
        className={clsx(
          "row-span-2 col-span-1 h-full transition-all duration-1000 ease-in",
          {
            hidden: !sidebarIsOpen,
          }
        )}
      >
        <Sidebar />
      </aside>
      <div className="col-span-1 transition-all duration-300 ease-in">
        <Navbar toggler={toggleSidebar} showToggler />
      </div>
      <section className="row-span-1 col-span-1 p-2 overflow-y-scroll px-4 py-4">
        <Outlet />
      </section>
    </div>
  );
};

export default DashboardLayout;

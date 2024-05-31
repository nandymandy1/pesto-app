import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const PublicLayout = () => {
  return (
    <div className="w-full h-[100vh] grid bg-[#F0F2F5] transition-all duration-300 ease-in grid-rows-[72px_1fr] grid-cols-1">
      <div className="col-span-1 transition-all duration-300 ease-in">
        <Navbar />
      </div>
      <section className="row-span-1 col-span-1 p-2 overflow-y-scroll px-4 py-4">
        <Outlet />
      </section>
    </div>
  );
};

export default PublicLayout;

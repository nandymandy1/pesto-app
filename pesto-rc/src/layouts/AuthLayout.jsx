import { Navigate, Outlet } from "react-router-dom";
import AuthBg from "@assets/img/authbg1.jpeg";
import useAuth from "@store/useAuth";

const AuthLayout = () => {
  const { isLoggedIn, loading } = useAuth();

  if (isLoggedIn) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="w-full h-[100vh] grid bg-[#F0F2F5] transition-all duration-300 ease-in grid-rows-[1fr] grid-cols-1">
      <section className="row-span-1 col-span-1 overflow-y-scroll relative">
        <div className="absolute h-full w-full bg-custom-gradient">
          <img src={AuthBg} className="z-0 h-full w-full" />
        </div>
        {loading ? <p className="text-white">Loading...</p> : <Outlet />}
      </section>
    </div>
  );
};

export default AuthLayout;

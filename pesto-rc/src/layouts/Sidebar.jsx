import { Menu, Typography } from "antd";
import { RiInfinityLine } from "react-icons/ri";
import { RxDashboard } from "react-icons/rx";
import { TbInfoCircle } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

const items = [
  {
    key: "dashboard",
    icon: <RxDashboard size={24} />,
    label: <Typography.Text className="text-white">Dashboard</Typography.Text>,
  },
];

const RESPONSE_HANDLER = ({ navigate }) => ({
  dashboard: () => navigate("/dashboard"),
});

const Sidebar = () => {
  const navigate = useNavigate();
  const handleSidebarNavigator = ({ key }) =>
    RESPONSE_HANDLER({ navigate })[key]?.();

  return (
    <aside className="h-[100vh]">
      <div className="h-full w-full bg-custom-gradient shadow-md flex">
        <Menu
          theme="dark"
          mode="inline"
          items={items}
          defaultOpenKeys={["sub1"]}
          defaultSelectedKeys={["1"]}
          onClick={handleSidebarNavigator}
        />
      </div>
    </aside>
  );
};

export default Sidebar;

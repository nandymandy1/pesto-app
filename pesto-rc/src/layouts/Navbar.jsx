import { RxHamburgerMenu, RxAvatar } from "react-icons/rx";
import {
  Popover,
  Typography,
  Button,
  Avatar,
  Divider,
  notification,
} from "antd";
import useAuth from "@store/useAuth";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { useMemo } from "react";

const ICON_BTN_SIZES = {
  small: "p-2",
  large: "p-4",
  medium: "p-3",
};

const IconButton = ({ children, size = "medium", ...restProps }) => {
  return (
    <div
      {...restProps}
      className={clsx(
        "bg-transparent hover:bg-[rgba(0,0,0,0.05)] rounded-[50%] transition-all duration-500",
        ICON_BTN_SIZES[size]
      )}
    >
      {children}
    </div>
  );
};

const Account = () => {
  const { logoutUser } = useAuth();

  const handleLogoutClick = () => {
    logoutUser();
    notification.success({
      message: "Logged out Successfully.",
      description: "You are now logged out successfully.",
    });
  };

  return (
    <>
      <Divider />
      <div className="w-[300px]">
        <Button onClick={handleLogoutClick} type="default" block>
          Logout
        </Button>
      </div>
    </>
  );
};

const NavLink = ({ text, to, type = "link" }) => (
  <Link
    to={to}
    className={clsx("font-bold px-3 py-2 transition-all duration-500", {
      "text-white  bg-[#1A73E2] hover:bg-[#3688EE] rounded-[4px]":
        type !== "link",
      "text-[#19181a] hover:text-[#3688EE]": type === "link",
    })}
  >
    {text}
  </Link>
);

const PublicNav = () => {
  return (
    <div className="flex gap-3 items-center">
      <NavLink to="/auth/login" text="Login" />
      <NavLink to="/auth/register" text="Register" />
    </div>
  );
};

const PrivateNav = () => {
  return (
    <div className="flex gap-3 items-center">
      <NavLink to="/" text="Home" type="link" />
      <NavLink to="/dashboard" text="Dashboard" type="link" />
    </div>
  );
};

const Navbar = ({ toggler = () => {}, showToggler = false }) => {
  const { user, isLoggedIn } = useAuth();

  const fullName = useMemo(
    () => [user?.firstName.trim() || "", user?.lastName.trim() || ""].join(" "),
    [user]
  );

  return (
    <nav className="h-[72px] w-full bg-white  border-solid border-[1px] border-[#e7e7e7] shadow-sm px-5 flex items-center justify-between">
      {showToggler ? (
        <IconButton onClick={toggler}>
          <RxHamburgerMenu
            size={20}
            fontWeight="bold"
            color="#19181a"
            className="cursor-pointer"
          />
        </IconButton>
      ) : (
        <div></div>
      )}
      <div>
        {isLoggedIn && (
          <div className="flex items-center gap-3">
            <PrivateNav />
            <Popover
              content={<Account />}
              placement="bottomRight"
              title={
                <div className="flex flex-col gap-3 items-center pt-3">
                  <div className="flex border-solid border-[1px] border-[#e7e7e7] rounded-[50%] p-[1px]">
                    <Avatar className="bg-[#1A73E2] shadow-md" size="large">
                      {user?.firstName}
                    </Avatar>
                  </div>
                  <Typography.Title level={4}>{fullName}</Typography.Title>
                </div>
              }
            >
              <RxAvatar
                size={38}
                fontWeight={700}
                color="#19181a"
                className="cursor-pointer"
              />
            </Popover>
          </div>
        )}
        {!isLoggedIn && <PublicNav />}
      </div>
    </nav>
  );
};

export default Navbar;

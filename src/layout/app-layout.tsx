import Header from "@/components/header";
import SecondaryHeader from "@/components/secondaryHeader";

import { Outlet } from "react-router";
import { useLocation } from "react-router";

const AppLayout = () => {
  const location = useLocation();
  return (
    <>
      {location.pathname === "/" ? <Header /> : <SecondaryHeader />}
      {/* Dynamically renders the child route */}
      <Outlet />
    </>
  );
};

export default AppLayout;

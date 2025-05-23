import { Layout, Menu } from "antd";
import { useLocation } from "react-router-dom";

import { userPaths } from "../../routes/user.routes";
import { sidebarItemsGenerator } from "../../utils/sidebarItemsGenerator";

const { Sider } = Layout;

const Sidebar = ({ collapsed }: { collapsed: boolean }) => {
  const location = useLocation();
  const sidebarItems = sidebarItemsGenerator(userPaths);

  // Get the current path without the leading slash
  const currentPath = location.pathname.slice(1);

  // Find the matching route to get the name for the selected key
  const currentRoute = userPaths.find((route) => route.path === currentPath);
  const selectedKey = currentRoute?.name || "Dashboard";

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      breakpoint="lg"
      style={{
        height: "100vh",
        position: "sticky",
        top: "0",
        backgroundColor: "white",
        borderRight: "1px solid #f0f0f0",
      }}
    >
      <div
        style={{
          color: "black",
          height: "4rem",
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: collapsed ? "0.8rem" : "1.5rem",
            transition: "all 0.2s ease",
            whiteSpace: "nowrap",
            overflow: "hidden",
          }}
        >
          GlassHouse
        </h1>
      </div>
      <div style={{ borderBottom: "1px solid #f0f0f0", margin: "0 16px" }} />

      <Menu
        theme="light"
        mode="inline"
        selectedKeys={[selectedKey]}
        style={{ fontSize: "16px" }}
        items={sidebarItems}
      />
    </Sider>
  );
};

export default Sidebar;

import { Layout, Menu } from "antd";

import { userPaths } from "../../routes/user.routes";
import { sidebarItemsGenerator } from "../../utils/sidebarItemsGenerator";

const { Sider } = Layout;

const Sidebar = ({ collapsed }: { collapsed: boolean }) => {
  const sidebarItems = sidebarItemsGenerator(userPaths);

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
        defaultSelectedKeys={["dashboard"]}
        style={{ fontSize: "16px" }}
        items={sidebarItems}
      />
    </Sider>
  );
};

export default Sidebar;

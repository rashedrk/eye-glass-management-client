import { Layout, Menu } from "antd";

import { userPaths } from "../../routes/user.routes";
import { sidebarItemsGenerator } from "../../utils/sidebarItemsGenerator";

const { Sider } = Layout;

const Sidebar = () => {
  const sidebarItems = sidebarItemsGenerator(userPaths);

  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      style={{ height: "100vh", position: "sticky", top: "0" }}
    >
      <div
        style={{
          color: "white",
          height: "4rem",
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1>GlassHouse</h1>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["4"]}
        items={sidebarItems}
      />
    </Sider>
  );
};

export default Sidebar;

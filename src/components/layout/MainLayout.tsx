/* eslint-disable react-hooks/rules-of-hooks */
import { Button, Layout } from "antd";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { logout } from "../../redux/features/auth/authSlice";
import { useAppDispatch } from "../../redux/hooks";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { useState } from "react";

const { Header, Content } = Layout;



const MainLayout = () => {

  const useDispatch = useAppDispatch();

  const handleLogout = () => {
    useDispatch(logout());
  }

  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ height: "100%" }}>
      <Sidebar collapsed={collapsed} />
      <Layout>
        <Header style={{ padding: 10 , paddingLeft: 0  , display: "flex" , justifyContent: "space-between", alignItems: 'center', backgroundColor: "white"}} >
        <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
              color: "black",
            }}
            
          />
          <Button onClick={handleLogout}>LogOut</Button>
        </Header>
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;

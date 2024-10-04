import React, { useState } from "react";
import { Button, Layout, Menu, theme } from "antd";
import {
   MenuFoldOutlined,
   MenuUnfoldOutlined,
   LogoutOutlined,
} from "@ant-design/icons";
import { admin } from "../../routes/routes";
import { NavLink, useNavigate, useLocation, Outlet } from "react-router-dom";
import { Popconfirm } from "@components";
const { Header, Sider, Content } = Layout;

const App = () => {
   const [collapsed, setCollapsed] = useState(false);
   const { pathname } = useLocation();
   const navigate = useNavigate();
   const {
      token: { colorBgContainer, borderRadiusLG },
   } = theme.useToken();
   return (
      <Layout>
         <Sider trigger={null} collapsible collapsed={collapsed}>
            <div className="text-white text-2xl font-bold text-center py-4 cursor-pointer">
               Logo
            </div>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={[pathname]}>
               {admin.map((item) => (
                  <Menu.Item key={item.path} icon={item.icon}>
                     <NavLink to={item.path}>{item.content}</NavLink>
                  </Menu.Item>
               ))}
            </Menu>
         </Sider>
         <Layout>
            <Header
               className="!py-0 !px-4"
               style={{
                  padding: 0,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  background: colorBgContainer,
               }}
            >
               <Button
                  type="text"
                  icon={
                     collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
                  }
                  onClick={() => setCollapsed(!collapsed)}
                  style={{
                     fontSize: "16px",
                     width: 64,
                     height: 64,
                  }}
               />

               <Popconfirm
                  title="Logout"
                  description="Are you sure to logout?"
                  okText="Yes"
                  cancelText="No"
                  onConfirm={() => {
                     localStorage.removeItem("token");
                     navigate("/");
                  }}
                  placement="leftBottom"
               >
                  <Button
                     type="text"
                     icon={<LogoutOutlined />}
                     style={{
                        fontSize: "16px",
                        width: 64,
                        height: 64,
                     }}
                  />
               </Popconfirm>
            </Header>
            <Content
               style={{
                  margin: "24px 16px",
                  padding: 24,
                  minHeight: "calc(100vh - 64px)",
                  background: colorBgContainer,
                  borderRadius: borderRadiusLG,
                  overflow: "auto",
               }}
            >
               <Outlet />
            </Content>
         </Layout>
      </Layout>
   );
};
export default App;

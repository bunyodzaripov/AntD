import React, { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { Outlet } from "react-router";
const { Header, Sider, Content } = Layout;
import { admin } from "../../routes/routes";
import { NavLink } from "react-router-dom";
import { MenuDropdown } from "@components";
const App = () => {
   const [collapsed, setCollapsed] = useState(false);
   const {
      token: { colorBgContainer, borderRadiusLG },
   } = theme.useToken();
   return (
      <Layout className="h-[100vh]">
         <Sider trigger={null} collapsible collapsed={collapsed}>
            <div className="text-white text-2xl font-bold text-center py-4 cursor-pointer">
               Logo
            </div>
            <Menu
               theme="dark"
               mode="inline"
               defaultSelectedKeys={["1"]}
               items={admin.map((item, index) => ({
                  key: index + 1,
                  icon: item.icon,
                  label: <NavLink to={item.path}>{item.content}</NavLink>,
               }))}
            />
         </Sider>
         <Layout>
            <Header
               className="!py-0 !px-4"
               style={{
                  padding: 0,
                  display: "flex",
                  justifyContent: "space-between",
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
               <MenuDropdown />
            </Header>
            <Content
               style={{
                  margin: "24px 16px",
                  padding: 24,
                  minHeight: 280,
                  background: colorBgContainer,
                  borderRadius: borderRadiusLG,
               }}
            >
               <Outlet />
            </Content>
         </Layout>
      </Layout>
   );
};
export default App;

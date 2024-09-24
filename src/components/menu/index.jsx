import React from "react";
import { UserOutlined, SettingOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import { useNavigate } from "react-router";

const App = () => {
   const navigate = useNavigate();
   const items = [
      {
         key: "1",
         label: "My Account",
      },
      {
         type: "divider",
      },
      {
         key: "2",
         label: "settings",
         icon: <SettingOutlined />,
      },
      {
         key: "3",
         label: "Logout",
         icon: <SettingOutlined />,
         danger: true,
         onClick: () => {
            localStorage.removeItem("access_token");
            navigate("/");
         },
      },
   ];
   return (
      <Dropdown
         menu={{
            items,
         }}
      >
         <a onClick={(e) => e.preventDefault()}>
            <Space>
               Profile
               <UserOutlined />
            </Space>
         </a>
      </Dropdown>
   );
};
export default App;

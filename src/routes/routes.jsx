import {
   AppstoreOutlined,
   SettingOutlined,
   StockOutlined,
   ProductOutlined,
} from "@ant-design/icons";

const admin = [
   {
      content: "Products",
      path: "/admin-layout/",
      icon: <ProductOutlined />,
   },
   {
      content: "Category",
      path: "/admin-layout/category",
      icon: <AppstoreOutlined />,
   },
   {
      content: "Brand",
      path: "/admin-layout/brand",
      icon: <AppstoreOutlined />,
   },
   {
      content: "Brand category",
      path: "/admin-layout/brand-category",
      icon: <AppstoreOutlined />,
   },
   {
      content: "Ads",
      path: "/admin-layout/ads",
      icon: <AppstoreOutlined />,
   },
   {
      content: "Stock",
      path: "/admin-layout/stock",
      icon: <StockOutlined />,
   },
   {
      content: "Settings",
      path: "/admin-layout/settings",
      icon: <SettingOutlined />,
   },
];

export { admin };

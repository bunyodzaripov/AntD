import React from "react";
import { Popconfirm } from "antd";
const Index = (props) => {
   const {
      title,
      okText,
      cancelText,
      onConfirm,
      description,
      children,
      placement,
   } = props;
   return (
      <Popconfirm
         title={title}
         okText={okText}
         cancelText={cancelText}
         onConfirm={onConfirm}
         description={description}
         placement={placement}
      >
         {children}
      </Popconfirm>
   );
};
export default Index;

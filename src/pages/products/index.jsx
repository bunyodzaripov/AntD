import React, { useEffect, useState } from "react";
import { products } from "@service";
import { UniversalTable } from "@components";
import { Button } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
const Index = () => {
   const [data, setData] = useState([]);
   const columns = [
      {
         title: "ID",
         dataIndex: "id",
         key: "id",
         align: "center",
      },
      {
         title: "Product name",
         dataIndex: "name",
         key: "name",
         align: "center",
      },
      {
         title: "Action",
         key: "action",
         align: "center",
         render: () => (
            <div>
               <Button>
                  <DeleteOutlined />
               </Button>
               <Button style={{ marginLeft: "10px" }}>
                  <EditOutlined />
               </Button>
            </div>
         ),
      },
   ];
   const getProducts = async () => {
      try {
         const response = await products.get();
         if (response.status === 200) {
            setData(response?.data?.data?.products);
         }
      } catch (error) {
         console.log(error);
      }
   };
   useEffect(() => {
      getProducts();
   }, []);
   return (
      <div>
         <UniversalTable
            columns={columns}
            dataSource={data}
            pagination={{ pageSize: 5 }}
         />
      </div>
   );
};

export default Index;
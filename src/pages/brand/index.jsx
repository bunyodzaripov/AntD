import React, { useEffect, useState } from "react";
import { brand } from "@service";
import { UniversalTable } from "@components";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button } from "antd";
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
         title: "Brand name",
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
   const getBrand = async () => {
      try {
         const response = await brand.get();
         if (response.status === 200) {
            setData(response?.data?.data?.brands);
         }
      } catch (error) {
         console.log(error);
      }
   };
   useEffect(() => {
      getBrand();
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

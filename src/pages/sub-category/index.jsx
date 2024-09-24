import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { subCategory } from "@service";
import { UniversalTable } from "@components";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button } from "antd";
const Index = () => {
   const [data, setData] = useState([]);
   const { id } = useParams();
   const columns = [
      {
         title: "ID",
         dataIndex: "id",
         key: "id",
         align: "center",
      },
      {
         title: "Sub category name",
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
   const getSubCategory = async () => {
      try {
         const response = await subCategory.get(id);
         if (response.status === 200) {
            setData(response?.data?.data?.subcategories);
         }
      } catch (error) {
         console.log(error);
      }
   };
   useEffect(() => {
      getSubCategory();
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

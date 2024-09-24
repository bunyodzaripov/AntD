import React, { useEffect, useState } from "react";
import { adsCategory } from "@service";
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
         title: "Image",
         dataIndex: "image",
         key: "image",
         align: "center",
         render: (image) => <img src={image} alt="image" />,
      },
      {
         title: "Position",
         dataIndex: "position",
         key: "position",
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
   const getAds = async () => {
      try {
         const response = await adsCategory.get();
         if (response.status === 200) {
            setData(response?.data?.data);
         }
      } catch (error) {
         console.log(error);
      }
   };
   useEffect(() => {
      getAds();
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

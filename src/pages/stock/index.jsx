import React, { useEffect, useState } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Tooltip } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus } from "@fortawesome/free-regular-svg-icons";
import { stock } from "@service";
import { UniversalTable } from "@components";
import { Stock } from "@modals";
const Index = () => {
   const [data, setData] = useState([]);
   const [update, setUpdate] = useState({});
   const [open, setOpen] = useState(false);
   const openModal = () => {
      setOpen(true);
   };
   useEffect(() => {
      getData();
   }, []);
   const getData = async () => {
      try {
         const res = await stock.get();
         if (res.status === 200) {
            setData(res?.data?.data?.stocks);
         }
      } catch (error) {
         console.log(error);
      }
   };
   const deleteData = async (id) => {
      try {
         const res = await stock.delete(id);
         if (res.status === 200) {
            getData();
         }
      } catch (error) {
         console.log(error);
      }
   };
   const editData = (item) => {
      setUpdate(item);
      setOpen(true);
   };
   const columns = [
      {
         title: "ID",
         dataIndex: "id",
         key: "id",
         align: "center",
      },
      {
         title: "Stock Name",
         dataIndex: "name",
         key: "name",
         align: "center",
      },
      {
         title: "Action",
         key: "action",
         align: "center",
         render: (item) => (
            <div>
               <Popconfirm
                  title="Delete the stock"
                  description="Are you sure to delete this stock?"
                  okText="Yes"
                  onConfirm={() => deleteData(item.id)}
                  cancelText="No"
               >
                  <Tooltip title="Delete">
                     <Button>
                        <DeleteOutlined />
                     </Button>
                  </Tooltip>
               </Popconfirm>
               <Tooltip title="Edit">
                  <Button
                     style={{ marginLeft: "10px" }}
                     onClick={() => editData(item)}
                  >
                     <EditOutlined />
                  </Button>
               </Tooltip>
            </div>
         ),
      },
   ];
   return (
      <>
         <Stock
            open={open}
            setOpen={setOpen}
            update={update}
            getData={getData}
         />
         <div className="flex justify-end mb-4">
            <Button onClick={openModal}>
               <FontAwesomeIcon icon={faSquarePlus} />
               <span className="ml-2">Add New Stock</span>
            </Button>
         </div>
         <UniversalTable
            columns={columns}
            dataSource={data}
            pagination={{ pageSize: 5 }}
         />
      </>
   );
};

export default Index;

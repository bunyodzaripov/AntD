import React, { useEffect, useState } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Tooltip } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus } from "@fortawesome/free-regular-svg-icons";
import { adsCategory } from "@service";
import { UniversalTable } from "@components";
import { AdsCategory } from "@modals";

const Index = () => {
   const [data, setData] = useState([]);
   const [open, setOpen] = useState(false);
   const openModal = () => {
      setOpen(true);
   };
   const handleClose = () => {
      setOpen(false);
   };
   useEffect(() => {
      getData();
   }, []);
   const getData = async () => {
      try {
         const res = await adsCategory.get();
         if (res.status === 200) {
            setData(res?.data?.data);
         }
      } catch (error) {
         console.log(error);
      }
   };
   const deleteCategory = async (id) => {
      try {
         const res = await adsCategory.delete(id);
         if (res.status === 200) {
            getData();
         }
      } catch (error) {
         console.log(error);
      }
   };
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
         render: (item) => (
            <div>
               <Popconfirm
                  title="Delete the category"
                  description="Are you sure to delete this category?"
                  okText="Yes"
                  onConfirm={() => deleteCategory(item.id)}
                  cancelText="No"
               >
                  <Tooltip title="Delete">
                     <Button>
                        <DeleteOutlined />
                     </Button>
                  </Tooltip>
               </Popconfirm>
            </div>
         ),
      },
   ];
   return (
      <>
         <AdsCategory
            open={open}
            setOpen={setOpen}
            getData={getData}
            handleClose={handleClose}
         />
         <div className="flex justify-end mb-4">
            <Button onClick={openModal}>
               <FontAwesomeIcon icon={faSquarePlus} />
               <span className="ml-2">Add New Banner</span>
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

import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { subCategory } from "@service";
import { UniversalTable } from "@components";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button, Input, Space } from "antd";
const { Search } = Input;
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus } from "@fortawesome/free-regular-svg-icons";
import { SubCategoryModal } from "@components";
const Index = () => {
   const [data, setData] = useState([]);
   const [open, setOpen] = useState(false);
   const [update, setUpdate] = useState({});
   const { id } = useParams();
   const openModal = () => {
      setOpen(true);
   };
   const handleClose = () => {
      setOpen(false);
   };
   const columns = [
      {
         title: "ID",
         dataIndex: "id",
         key: "id",
         align: "center",
      },
      {
         title: "Subcategory",
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
               <Button onClick={() => deleteSubCategory(item.id)}>
                  <DeleteOutlined />
               </Button>
               <Button
                  style={{ marginLeft: "10px" }}
                  onClick={() => editSubCategory(item)}
               >
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
   const deleteSubCategory = async (id) => {
      try {
         const res = await subCategory.delete(id);
         if (res.status === 200) {
            getSubCategory();
         }
      } catch (error) {
         console.log(error);
      }
   };
   const editSubCategory = (item) => {
      setUpdate(item);
      setOpen(true);
   };
   useEffect(() => {
      getSubCategory();
   }, []);
   const onSearch = (value, _e, info) => {
      console.log(value, _e, info);
   };
   return (
      <div>
         <SubCategoryModal
            open={open}
            handleClose={handleClose}
            update={update}
            setUpdate={setUpdate}
            id={id}
            getSubCategory={getSubCategory}
         />
         <div className="flex justify-between mb-4">
            <Space direction="vertical">
               <Search
                  placeholder="Search category"
                  onSearch={onSearch}
                  allowClear
               />
            </Space>
            <Button onClick={openModal}>
               <FontAwesomeIcon icon={faSquarePlus} />
               <span className="ml-2">Add New Subcategory</span>
            </Button>
         </div>
         <UniversalTable
            columns={columns}
            dataSource={data}
            pagination={{ pageSize: 5 }}
         />
      </div>
   );
};

export default Index;

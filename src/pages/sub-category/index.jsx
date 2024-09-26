import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button, Input, Space } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus } from "@fortawesome/free-regular-svg-icons";
import { useNavigate, useLocation } from "react-router-dom";
import { subCategory } from "@service";
import { UniversalTable, Popconfirm } from "@components";
import { SubCategory } from "@modals";
const { Search } = Input;
const Index = () => {
   const [data, setData] = useState([]);
   const [open, setOpen] = useState(false);
   const [update, setUpdate] = useState({});
   const [total, setTotal] = useState();
   const [params, setParams] = useState({
      search: "",
      limit: 3,
      page: 1,
   });
   const { id } = useParams();
   const navigate = useNavigate();
   const { search } = useLocation();
   useEffect(() => {
      getSubCategory();
   }, [params]);
   useEffect(() => {
      const params = new URLSearchParams(search);
      const page = Number(params.get("page")) || 1;
      const limit = Number(params.get("limit")) || 3;
      setParams((prev) => ({
         ...prev,
         page: page,
         limit: limit,
      }));
   }, [search]);
   const openModal = () => {
      setOpen(true);
   };
   const handleClose = () => {
      setOpen(false);
      setUpdate({});
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
               <Popconfirm
                  title="Delete the subcategory"
                  description="Are you sure to delete this subcategory?"
                  okText="Yes"
                  onConfirm={() => deleteSubCategory(item.id)}
                  cancelText="No"
               >
                  <Button>
                     <DeleteOutlined />
                  </Button>
               </Popconfirm>
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
            setTotal(response?.data?.data?.count);
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
   const onSearch = (value, _e, info) => {
      console.log(value, _e, info);
   };
   const handleTableChange = (pagination) => {
      const { current = 1, pageSize = 10 } = pagination;
      setParams((prev) => ({
         ...prev,
         page: current,
         limit: pageSize,
      }));
      const current_params = new URLSearchParams(search);
      current_params.set("page", `${current}`);
      current_params.set("limit", `${pageSize}`);
      navigate(`?${current_params}`);
   };
   return (
      <div>
         <SubCategory
            open={open}
            handleClose={handleClose}
            update={update}
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
            pagination={{
               current: params.page,
               pageSize: params.limit,
               total: total,
               showSizeChanger: true,
               pageSizeOptions: [2, 3, 5, 10, 20],
            }}
            handleChange={handleTableChange}
         />
      </div>
   );
};

export default Index;

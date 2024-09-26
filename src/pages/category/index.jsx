import React, { useEffect, useState } from "react";
import { Button, Input, Space } from "antd";
import {
   EditOutlined,
   DeleteOutlined,
   FolderViewOutlined,
} from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import { UniversalTable, Popconfirm } from "@components";
import { category } from "@service";
import { Category } from "@modals";

const { Search } = Input;
const Index = () => {
   const [open, setOpen] = useState(false);
   const [data, setData] = useState([]);
   const [update, setUpdate] = useState({});
   const [total, setTotal] = useState();
   const [params, setParams] = useState({
      search: "",
      limit: 3,
      page: 1,
   });
   const navigate = useNavigate();
   const { search } = useLocation();
   useEffect(() => {
      getCategory();
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
         title: "Category name",
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
                  title="Delete the category"
                  description="Are you sure to delete this category?"
                  okText="Yes"
                  onConfirm={() => deleteCategory(item.id)}
                  cancelText="No"
               >
                  <Button>
                     <DeleteOutlined />
                  </Button>
               </Popconfirm>
               <Button
                  style={{ marginLeft: "10px" }}
                  onClick={() => editCategory(item)}
               >
                  <EditOutlined />
               </Button>
               <Button
                  style={{ marginLeft: "10px" }}
                  onClick={() => viewCategory(item.id)}
               >
                  <FolderViewOutlined />
               </Button>
            </div>
         ),
      },
   ];
   const getCategory = async () => {
      const response = await category.get(params);
      if (response.status === 200) {
         setData(response?.data?.data?.categories);
         setTotal(response?.data?.data?.count);
      }
   };
   const deleteCategory = async (id) => {
      const response = await category.delete(id);
      if (response.status === 200) {
         getCategory();
      }
   };
   const editCategory = async (item) => {
      setUpdate(item);
      setOpen(true);
   };
   const viewCategory = async (id) => {
      navigate(`/admin-layout/sub-category/${id}`);
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
         <Category
            open={open}
            handleClose={handleClose}
            update={update}
            getCategory={getCategory}
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
               <span className="ml-2">Add new category</span>
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

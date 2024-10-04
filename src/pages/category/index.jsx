import React, { useEffect, useState } from "react";
import { Button, Input, Tooltip } from "antd";
import {
   EditOutlined,
   DeleteOutlined,
   FolderViewOutlined,
} from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus } from "@fortawesome/free-regular-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
import { UniversalTable, Popconfirm } from "@components";
import { category } from "@service";
import { Category } from "@modals";
const Index = () => {
   const [open, setOpen] = useState(false);
   const [data, setData] = useState([]);
   const [update, setUpdate] = useState({});
   const [total, setTotal] = useState();
   const [params, setParams] = useState({
      search: "",
      limit: "",
      page: "",
   });
   const navigate = useNavigate();
   const { search } = useLocation();
   useEffect(() => {
      getCategory();
   }, [params]);
   useEffect(() => {
      const params = new URLSearchParams(search);
      const page = Number(params.get("page")) || 1;
      const limit = Number(params.get("limit")) || 5;
      const search_val = params.get("search") || "";
      setParams((prev) => ({
         ...prev,
         search: search_val,
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
   const handleTableChange = (pagination) => {
      const { current, pageSize } = pagination;
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
   const handleSearch = (event) => {
      setParams((prev) => ({
         ...prev,
         search: event.target.value,
      }));
      const search_params = new URLSearchParams(search);
      search_params.set("search", event.target.value);
      navigate(`?${search_params}`);
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
                  <Tooltip title="Delete">
                     <Button>
                        <DeleteOutlined />
                     </Button>
                  </Tooltip>
               </Popconfirm>
               <Tooltip title="Edit">
                  <Button
                     style={{ marginLeft: "10px" }}
                     onClick={() => editCategory(item)}
                  >
                     <EditOutlined />
                  </Button>
               </Tooltip>
               <Tooltip title="View">
                  <Button
                     style={{ marginLeft: "10px" }}
                     onClick={() => viewCategory(item.id)}
                  >
                     <FolderViewOutlined />
                  </Button>
               </Tooltip>
            </div>
         ),
      },
   ];
   return (
      <>
         <Category
            open={open}
            handleClose={handleClose}
            update={update}
            getCategory={getCategory}
         />
         <div className="flex justify-between mb-4">
            <Input
               placeholder="Search category..."
               className="w-[300px]"
               onChange={handleSearch}
               allowClear
            />
            <Button onClick={openModal}>
               <FontAwesomeIcon icon={faSquarePlus} />
               <span className="ml-2">Add New Category</span>
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
      </>
   );
};
export default Index;

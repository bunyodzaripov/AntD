import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus } from "@fortawesome/free-regular-svg-icons";
import { useNavigate, useLocation } from "react-router-dom";
import { subCategory } from "@service";
import { UniversalTable, Popconfirm } from "@components";
import { SubCategory } from "@modals";
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
   return (
      <>
         <SubCategory
            open={open}
            handleClose={handleClose}
            update={update}
            id={id}
            getSubCategory={getSubCategory}
         />
         <div className="flex justify-between mb-4">
            <Input
               placeholder="Search Subcategory..."
               className="w-[300px]"
               onChange={handleSearch}
               allowClear
            />
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
      </>
   );
};

export default Index;

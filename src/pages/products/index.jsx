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
import { products } from "@service";
import { Products } from "@modals";

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
      getData();
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
   const getData = async () => {
      const res = await products.get(params);
      if (res.status === 200) {
         setData(res?.data?.data?.products);
         setTotal(res?.data?.data?.count);
      }
   };
   const deleteData = async (id) => {
      const res = await products.delete(id);
      if (res.status === 200) {
         getData();
      }
   };
   const editData = async (item) => {
      setUpdate(item);
      setOpen(true);
   };
   const viewData = async (id) => {
      navigate(`/admin-layout/product-details/${id}`);
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
         title: "Product name",
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
                  title="Delete the product"
                  description="Are you sure to delete this product?"
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
               <Tooltip title="View">
                  <Button
                     style={{ marginLeft: "10px" }}
                     onClick={() => viewData(item.id)}
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
         <Products
            open={open}
            setOpen={setOpen}
            update={update}
            getData={getData}
         />
         <div className="flex justify-between mb-4">
            <Input
               placeholder="Search Product..."
               className="w-[300px]"
               onChange={handleSearch}
               allowClear
            />
            <Button onClick={openModal}>
               <FontAwesomeIcon icon={faSquarePlus} />
               <span className="ml-2">Add New Product</span>
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

import React, { useEffect, useState } from "react";
import { Button, Input, Select, Tooltip } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus } from "@fortawesome/free-regular-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
import { UniversalTable, Popconfirm } from "@components";
import { brand, brandCategory } from "@service";
import { BrandCategory } from "@modals";
const Index = () => {
   const [open, setOpen] = useState(false);
   const [data, setData] = useState([]);
   const [update, setUpdate] = useState({});
   const [total, setTotal] = useState();
   const [brandData, setBrandData] = useState([]);
   const [params, setParams] = useState({
      search: "",
      limit: "",
      page: "",
   });
   const navigate = useNavigate();
   const { search } = useLocation();
   useEffect(() => {
      getData();
      getBrand();
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
   const getData = async () => {
      const res = await brandCategory.get(params);
      if (res.status === 200) {
         setData(res?.data?.data?.brandCategories);
         setTotal(res?.data?.data?.count);
      }
   };
   const getBrand = async () => {
      const res = await brand.get();
      if (res.status === 200) {
         setBrandData(res?.data?.data?.brands);
      }
   };
   const deleteData = async (id) => {
      const res = await brandCategory.delete(id);
      if (res.status === 200) {
         getData();
      }
   };
   const editData = async (item) => {
      setUpdate(item);
      setOpen(true);
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
   const handleFilter = async (value) => {
      try {
         const res = await brandCategory.getBrand(value);
         console.log(res.data.data.brandCategories);
         setData(res?.data?.data?.brandCategories);
         setTotal(res?.data?.data?.count);
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
         title: "Brand category name",
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
                  title="Delete the brand"
                  description="Are you sure to delete this brand?"
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
         <BrandCategory
            open={open}
            handleClose={handleClose}
            update={update}
            getData={getData}
            brandData={brandData}
         />
         <div className="flex justify-between mb-4">
            <div>
               <Input
                  placeholder="Search brand category..."
                  className="w-[300px]"
                  onChange={handleSearch}
                  allowClear
               />
               <Select
                  placeholder="Filter"
                  allowClear
                  onChange={(value) => handleFilter(value)}
                  style={{ width: 120, marginLeft: 10 }}
               >
                  {brandData?.map((item) => (
                     <Select.Option key={item.id} value={item.id}>
                        {item.name}
                     </Select.Option>
                  ))}
               </Select>
            </div>
            <Button onClick={openModal}>
               <FontAwesomeIcon icon={faSquarePlus} />
               <span className="ml-2">Add New Brand Category</span>
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

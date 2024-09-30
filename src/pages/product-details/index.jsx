import React, { useEffect, useState } from "react";
import { Card, Typography, Button, Descriptions } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
const { Title, Text } = Typography;
import { useParams } from "react-router";
import { products, productDetails } from "@service";
import { ProductDetails } from "@modals";

const Index = () => {
   const { id } = useParams();
   const [data, setData] = useState([]);
   const [productData, setProductData] = useState([]);
   const [open, setOpen] = useState(false);
   const [update, setUpdate] = useState({});
   useEffect(() => {
      getData();
   }, [id]);
   const openModal = () => {
      setOpen(true);
   };
   const getData = async () => {
      try {
         const res = await products.getOne(id);
         if (res.status === 200) {
            setData(res?.data?.data?.product_detail || {});
            setProductData(res?.data?.data?.product || {});
         }
      } catch (error) {
         console.error(error);
      }
   };
   const editData = () => {
      setUpdate(data);
      setOpen(true);
   };
   const deleteData = async () => {
      const res = await productDetails.delete(data.id);
      if (res.status === 200) {
         getData();
      }
   };
   const discountedPrice = productData.price
      ? productData.price - (productData.price * data.discount) / 100
      : 0;
   const isDisable = Object.keys(data).length > 0;
   return (
      <Card
         style={{
            width: 1000,
            color: "black",
            borderRadius: "10px",
            margin: "20px auto",
            padding: "20px",
         }}
      >
         <ProductDetails
            id={id}
            getData={getData}
            data={data}
            open={open}
            setOpen={setOpen}
            update={update}
         />
         <Title
            level={3}
            style={{
               color: "black",
               textAlign: "center",
               marginBottom: "50px",
            }}
         >
            {productData?.name || "Product name"}
         </Title>
         <Descriptions
            column={1}
            labelStyle={{ color: "black", fontWeight: "bold" }}
            contentStyle={{ color: "black" }}
         >
            <Descriptions.Item label="Description">
               {data?.description || ""}
            </Descriptions.Item>
            <Descriptions.Item label="Product colors">
               {data?.colors?.length > 0 ? data.colors.join(", ") : ""}
            </Descriptions.Item>
            <Descriptions.Item label="Product quantity">
               {data?.quantity ?? ""}
            </Descriptions.Item>
            <Descriptions.Item label="Product discount">
               {data?.discount != null ? `${data.discount}%` : "0%"}
            </Descriptions.Item>
            <Descriptions.Item label="Product price">
               {productData?.price ? (
                  <>
                     <Text delete style={{ marginRight: 8 }}>
                        {productData.price}
                     </Text>
                     <Text strong style={{ color: "#E0E0E0" }}>
                        {discountedPrice.toFixed(2)} $
                     </Text>
                  </>
               ) : (
                  ""
               )}
            </Descriptions.Item>
         </Descriptions>
         <div
            style={{
               display: "flex",
               justifyContent: "space-between",
               alignItems: "center",
               marginTop: "20px",
            }}
         >
            <Button
               type="primary"
               style={{ marginRight: "10px" }}
               onClick={openModal}
               disabled={isDisable}
            >
               Add Details
            </Button>
            <div className="flex">
               <Button
                  onClick={editData}
                  style={{
                     marginRight: "10px",
                  }}
               >
                  <EditOutlined />
               </Button>
               <Button onClick={deleteData}>
                  <DeleteOutlined />
               </Button>
            </div>
         </div>
      </Card>
   );
};

export default Index;

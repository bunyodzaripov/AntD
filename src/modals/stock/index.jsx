import React, { useEffect, useState } from "react";
import { Button, Col, Drawer, Form, Input, Row, Select } from "antd";
import { products, category, brand, brandCategory, stock } from "@service";
const { Option } = Select;

const App = (props) => {
   const { open, getData, setOpen, update } = props;
   const [form] = Form.useForm();
   const [categoryData, setCategoryData] = useState([]);
   const [brandData, setBrandData] = useState([]);
   const [productsData, setProductsData] = useState([]);
   console.log(update);

   useEffect(() => {
      if (update.id) {
         form.setFieldsValue({
            category_id: update.category_id?.id,
            brand_id: update.brand_id,
            product_id: update.product_id?.id,
            quantity: parseInt(update.quantity),
         });
      } else {
         form.resetFields();
      }
   }, [update, form]);
   useEffect(() => {
      getCategory();
      getProduct();
   }, []);

   const getCategory = async () => {
      const res = await category.get();
      setCategoryData(res?.data?.data?.categories);
   };

   const getProduct = async () => {
      const res = await products.get();
      setProductsData(res?.data?.data?.products);
   };

   const handleSubmit = async (values) => {
      const newdata = {
         category_id: parseInt(values.category_id),
         brand_id: parseInt(values.brand_id),
         product_id: parseInt(values.product_id),
         quantity: parseInt(values.quantity),
      };
      try {
         if (update.id) {
            const res = await stock.update(update.id, newdata);
            if (res.status === 200) {
               handleClose();
               getData();
            }
         } else {
            const res = await stock.create(newdata);
            if (res.status === 201) {
               handleClose();
               getData();
            }
         }
      } catch (error) {
         console.log(error);
      }
   };

   const handleChange = async (value, inputName) => {
      try {
         if (inputName === "category_id") {
            const res = await brand.getCategory(value);
            setBrandData(res?.data?.data?.brands);
         }
      } catch (error) {
         console.log(error);
      }
   };

   const handleClose = () => {
      form.resetFields();
      setOpen(false);
   };
   return (
      <>
         <Drawer
            width={520}
            onClose={handleClose}
            open={open}
            styles={{
               body: {
                  paddingBottom: 80,
               },
            }}
         >
            <h1 className="text-2xl font-semibold mb-4">Add new stock</h1>
            <Form form={form} layout="vertical" onFinish={handleSubmit}>
               <Row gutter={16}>
                  <Col span={12}>
                     <Form.Item
                        name="category_id"
                        label="Select category"
                        rules={[
                           {
                              required: true,
                              message: "Please choose the category",
                           },
                        ]}
                     >
                        <Select
                           allowClear
                           showSearch
                           onChange={(value) =>
                              handleChange(value, "category_id")
                           }
                        >
                           {categoryData?.map((item, index) => (
                              <Option value={item.id} key={index}>
                                 {item.name}
                              </Option>
                           ))}
                        </Select>
                     </Form.Item>
                  </Col>
                  <Col span={12}>
                     <Form.Item
                        name="brand_id"
                        label="Select brand"
                        rules={[
                           {
                              required: true,
                              message: "Please choose the brand",
                           },
                        ]}
                     >
                        <Select
                           allowClear
                           showSearch
                           onChange={(value) => handleChange(value, "brand_id")}
                           disabled={!form.getFieldValue("category_id")}
                        >
                           {brandData?.map((item, index) => (
                              <Option value={item.id} key={index}>
                                 {item.name}
                              </Option>
                           ))}
                        </Select>
                     </Form.Item>
                  </Col>
               </Row>
               <Row gutter={16}>
                  <Col span={12}>
                     <Form.Item
                        name="product_id"
                        label="Select Product"
                        rules={[
                           {
                              required: true,
                              message: "Please choose the brand category",
                           },
                        ]}
                     >
                        <Select
                           allowClear
                           showSearch
                           onChange={(value) =>
                              handleChange(value, "product_id")
                           }
                        >
                           {productsData?.map((item, index) => (
                              <Option value={item.id} key={index}>
                                 {item.name}
                              </Option>
                           ))}
                        </Select>
                     </Form.Item>
                  </Col>
                  <Col span={12}>
                     <Form.Item
                        name="quantity"
                        label="Quantity"
                        rules={[
                           {
                              required: true,
                              message: "Please enter the quantity",
                           },
                        ]}
                     >
                        <Input type="number" />
                     </Form.Item>
                  </Col>
               </Row>
               <Row gutter={16}>
                  <Col span={24}>
                     <Form.Item>
                        <Button
                           htmlType="submit"
                           type="primary"
                           className="mt-10 py-4"
                        >
                           Add
                        </Button>
                        <Button className="ml-2" onClick={handleClose}>
                           cancel
                        </Button>
                     </Form.Item>
                  </Col>
               </Row>
            </Form>
         </Drawer>
      </>
   );
};
export default App;

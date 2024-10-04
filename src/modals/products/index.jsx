import React, { useEffect, useState } from "react";
import { Button, Col, Drawer, Form, Input, Row, Select, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { products, category, brand, brandCategory } from "@service";
const { Option } = Select;

const App = (props) => {
   const { open, getData, setOpen, update } = props;
   const [form] = Form.useForm();
   const [categoryData, setCategoryData] = useState([]);
   const [brandData, setBrandData] = useState([]);
   const [brandCategoryData, setBrandCategoryData] = useState([]);

   useEffect(() => {
      if (update.id) {
         form.setFieldsValue({
            name: update.name,
            price: update.price,
            category_id: update.category_id,
            brand_id: update.brand_id,
            brand_category_id: update.brand_category_id,
         });
      } else {
         form.resetFields();
      }
   }, [update, form]);
   useEffect(() => {
      getCategory();
   }, []);

   const getCategory = async () => {
      const res = await category.get();
      setCategoryData(res?.data?.data?.categories);
   };

   const handleSubmit = async (values) => {
      const editData = {
         name: values.name,
         price: parseInt(values.price),
         category_id: parseInt(values.category_id),
         brand_id: parseInt(values.brand_id),
         brand_category_id: parseInt(values.brand_category_id),
      };

      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("price", values.price);
      formData.append("category_id", parseInt(values.category_id));
      formData.append("brand_id", values.brand_id);
      formData.append("brand_category_id", values.brand_category_id);
      if (values.file && values.file.file) {
         formData.append("file", values.file.file);
      }

      try {
         if (update.id) {
            const res = await products.update(update.id, editData);
            if (res.status === 200) {
               handleClose();
               getData();
            }
         } else {
            const res = await products.create(formData);
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
         } else if (inputName === "brand_id") {
            const res = await brandCategory.getBrand(value);
            setBrandCategoryData(res?.data?.data?.brandCategories);
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
            width={720}
            onClose={handleClose}
            open={open}
            styles={{
               body: {
                  paddingBottom: 80,
               },
            }}
         >
            <h1 className="text-2xl font-semibold mb-4">Add Product</h1>
            <Form form={form} layout="vertical" onFinish={handleSubmit}>
               <Row gutter={16}>
                  <Col span={12}>
                     <Form.Item
                        label="Product Name"
                        name="name"
                        rules={[
                           {
                              required: true,
                              message: "Please enter product name",
                           },
                        ]}
                     >
                        <Input allowClear />
                     </Form.Item>
                  </Col>
                  <Col span={12}>
                     <Form.Item
                        label="Product price"
                        name="price"
                        rules={[
                           {
                              required: true,
                              message: "Please enter url",
                           },
                        ]}
                     >
                        <Input type="number" allowClear />
                     </Form.Item>
                  </Col>
               </Row>
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
                        name="brand_category_id"
                        label="Select brand category"
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
                              handleChange(value, "brand_category_id")
                           }
                           disabled={!form.getFieldValue("brand_id")}
                        >
                           {brandCategoryData?.map((item, index) => (
                              <Option value={item.id} key={index}>
                                 {item.name}
                              </Option>
                           ))}
                        </Select>
                     </Form.Item>
                  </Col>
                  <Col span={12}>
                     {!update.id && (
                        <Form.Item
                           name="files"
                           label="Product image"
                           rules={[
                              {
                                 required: true,
                                 message: "Please upload product image",
                              },
                           ]}
                        >
                           <Upload
                              beforeUpload={() => false}
                              maxCount={5}
                              listType="picture"
                              action={
                                 "https://www.mocky.io/v2/5cc8019d300000980a055e76"
                              }
                           >
                              <Button
                                 className="w-full"
                                 icon={<UploadOutlined />}
                              >
                                 Upload Logo
                              </Button>
                           </Upload>
                        </Form.Item>
                     )}
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

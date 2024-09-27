import React, { useEffect, useState } from "react";
import { Button, Modal, Input, Form, Select, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { brand } from "@service";
const Index = (props) => {
   const [form] = Form.useForm();
   const { open, handleClose, getData, update } = props;
   useEffect(() => {
      if (update.id) {
         form.setFieldsValue({
            name: update.name,
         });
      } else {
         form.resetFields();
      }
   }, [update, form]);
   const handleSubmit = async (values) => {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("category_id", values.category_id);
      formData.append("description", values.description);
      formData.append("file", values.file.file);
      try {
         if (update.id) {
            const res = await brand.update(update.id, formData, {
               headers: {
                  "Content-Type": "multipart/form-data",
               },
            });
            if (res.status === 200) {
               handleClose();
               getData();
            }
         } else {
            const res = await brand.create(formData, {
               headers: {
                  "Content-Type": "multipart/form-data",
               },
            });
            if (res.status === 201) {
               handleClose();
               getData();
            }
         }
      } catch (error) {
         console.log(error);
      }
   };
   return (
      <>
         <Modal
            open={open}
            title="Add new brand"
            onCancel={handleClose}
            width={500}
            footer={
               <div
                  style={{
                     display: "flex",
                     justifyContent: "flex-start",
                     gap: "10px",
                  }}
               >
                  <Button
                     type={("submit", "primary")}
                     form="basic"
                     htmlType="submit"
                  >
                     Add
                  </Button>
                  <Button onClick={handleClose}>Cancel</Button>
               </div>
            }
         >
            <Form form={form} id="basic" name="basic" onFinish={handleSubmit}>
               <Form.Item
                  label="Brand name"
                  name="name"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  rules={[
                     {
                        required: true,
                        message: "Please input brand name!",
                     },
                  ]}
               >
                  <Input allowClear />
               </Form.Item>
               <Form.Item
                  label="Category"
                  name="category_id"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  rules={[
                     {
                        required: true,
                        message: "Please select category!",
                     },
                  ]}
               >
                  <Select
                     showSearch
                     allowClear
                     placeholder="Search category"
                     filterOption={(input, option) =>
                        (option?.label ?? "")
                           .toLowerCase()
                           .includes(input.toLowerCase())
                     }
                     options={[
                        {
                           value: "569",
                           label: "Jack",
                        },
                        {
                           value: "2",
                           label: "Lucy",
                        },
                        {
                           value: "3",
                           label: "Tom",
                        },
                     ]}
                  />
               </Form.Item>
               <Form.Item
                  label="Description"
                  name="description"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  rules={[
                     {
                        required: true,
                        message: "Please input description!",
                     },
                  ]}
               >
                  <Input.TextArea allowClear />
               </Form.Item>
               <Form.Item
                  label="Brand logo"
                  name="file"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  rules={[
                     {
                        required: true,
                        message: "Please upload brand logo!",
                     },
                  ]}
               >
                  <Upload
                     beforeUpload={() => false}
                     maxCount={1}
                     listType="picture"
                     action={"https://www.mocky.io/v2/5cc8019d300000980a055e76"}
                  >
                     <Button className="w-full" icon={<UploadOutlined />}>
                        Upload Logo
                     </Button>
                  </Upload>
               </Form.Item>
            </Form>
         </Modal>
      </>
   );
};
export default Index;

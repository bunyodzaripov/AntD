import React, { useEffect } from "react";
import { Button, Modal, Input, Form, Select } from "antd";
import { brandCategory } from "@service";
const Index = (props) => {
   const [form] = Form.useForm();
   const { open, handleClose, getData, update, brandData } = props;
   useEffect(() => {
      if (update.id) {
         form.setFieldsValue({
            name: update.name,
            brand_id: update.brand_id,
         });
      } else {
         form.resetFields();
      }
   }, [update, form]);
   const handleSubmit = async (values) => {
      try {
         if (update.id) {
            const res = await brandCategory.update(update.id, values);
            if (res.status === 200) {
               handleClose();
               getData();
            }
         } else {
            const res = await brandCategory.create(values);
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
            title="Add new brand category"
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
                  label="Brand category name"
                  name="name"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  rules={[
                     {
                        required: true,
                        message: "Please input brand category name!",
                     },
                  ]}
               >
                  <Input allowClear />
               </Form.Item>
               <Form.Item
                  label="Brands"
                  name="brand_id"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  rules={[
                     {
                        required: true,
                        message: "Please select a brand!",
                     },
                  ]}
               >
                  <Select
                     allowClear
                     showSearch
                     placeholder="Select a brand"
                     filterOption={(input, option) =>
                        (option?.label ?? "")
                           .toLowerCase()
                           .includes(input.toLowerCase())
                     }
                  >
                     {brandData?.map((item, index) => (
                        <Select.Option value={item.id} key={index}>
                           {item.name}
                        </Select.Option>
                     ))}
                  </Select>
               </Form.Item>
            </Form>
         </Modal>
      </>
   );
};
export default Index;

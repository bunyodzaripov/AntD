import React, { useEffect } from "react";
import { Button, Modal, Input, Form } from "antd";
import { subCategory } from "@service";
const Index = (props) => {
   const [form] = Form.useForm();
   const { open, handleClose, getSubCategory, update, id } = props;
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
      try {
         if (update.id) {
            const response = await subCategory.update(update.id, {
               name: values.name,
               parent_category_id: parseInt(id),
            });
            if (response.status === 200) {
               handleClose();
               getSubCategory();
            }
         } else {
            const response = await subCategory.create({
               name: values.name,
               parent_category_id: parseInt(id),
            });

            if (response.status === 201) {
               handleClose();
               getSubCategory();
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
            title="Add New Subcategory"
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
                  <Button type="primary" form="basic" htmlType="submit">
                     Add
                  </Button>
                  <Button onClick={handleClose}>Cancel</Button>
               </div>
            }
         >
            <Form form={form} id="basic" name="basic" onFinish={handleSubmit}>
               <Form.Item
                  label="Subcategory name"
                  name="name"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  rules={[
                     {
                        required: true,
                        message: "Please input subcategory name!",
                     },
                  ]}
               >
                  <Input />
               </Form.Item>
            </Form>
         </Modal>
      </>
   );
};
export default Index;

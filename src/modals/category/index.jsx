import React from "react";
import { Button, Modal, Input, Form } from "antd";
import { category } from "@service";
const App = (props) => {
   const [form] = Form.useForm();
   const {
      open,
      handleClose,
      getCategory,
      update,
      setUpdate = () => {},
   } = props;
   const onFinish = async (values) => {
      try {
         if (update.id) {
            console.log(update, "update");

            const response = await category.update(update.id, values);
            if (response.status === 200) {
               handleClose();
               getCategory();
               setUpdate({});
               form.resetFields();
            }
         } else {
            const response = await category.create(values);
            if (response.status === 201) {
               handleClose();
               getCategory();
               form.resetFields();
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
            title="Add new category"
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
            <Form form={form} id="basic" name="basic" onFinish={onFinish}>
               <Form.Item
                  label="Category name"
                  name="name"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  rules={[
                     {
                        required: true,
                        message: "Please input category name!",
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

export default App;

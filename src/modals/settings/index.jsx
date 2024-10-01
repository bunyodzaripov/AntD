import React, { useEffect } from "react";
import { Button, Modal, Input, Form } from "antd";
import { settings } from "@service";
const Index = (props) => {
   const [form] = Form.useForm();
   const { open, setOpen, user, getUser } = props;

   useEffect(() => {
      if (user) {
         form.setFieldsValue({
            first_name: user.first_name,
            last_name: user.last_name,
            phone_number: user.phone_number,
            email: user.email,
            password: user.password,
         });
      }
   }, [user, form]);
   const handleSubmit = async (values) => {
      try {
         const res = await settings.update(user.id, values);
         if (res.status === 200) {
            getUser();
            handleClose;
         }
      } catch (error) {
         console.log(error);
      }
   };

   const handleClose = () => {
      setOpen(false);
      form.resetFields();
   };
   return (
      <>
         <Modal
            open={open}
            title="Update account"
            onCancel={handleClose}
            width={450}
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
                  label="First Name"
                  name="first_name"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  rules={[
                     {
                        required: true,
                        message: "Please input your first name!",
                     },
                  ]}
               >
                  <Input allowClear />
               </Form.Item>
               <Form.Item
                  label="Last Name"
                  name="last_name"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  rules={[
                     {
                        required: true,
                        message: "Please input your last name!",
                     },
                  ]}
               >
                  <Input allowClear />
               </Form.Item>
               <Form.Item
                  label="Phone Number"
                  name="phone_number"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  rules={[
                     {
                        required: true,
                        message: "Please input your phone number!",
                     },
                  ]}
               >
                  <Input allowClear />
               </Form.Item>
               <Form.Item
                  label="Email"
                  name="email"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  rules={[
                     {
                        required: true,
                        message: "Please input your email!",
                     },
                     {
                        type: "email",
                        message: "The input is not valid E-mail!",
                     },
                  ]}
               >
                  <Input allowClear />
               </Form.Item>
               <Form.Item
                  label="Password"
                  name="password"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  rules={[
                     {
                        required: true,
                        message: "Please input your password!",
                     },
                     {
                        min: 6,
                        message: "Password must be at least 6 characters!",
                     },
                  ]}
               >
                  <Input.Password showCount allowClear />
               </Form.Item>
            </Form>
         </Modal>
      </>
   );
};
export default Index;

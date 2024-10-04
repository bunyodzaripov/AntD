import React from "react";
import { Button, Modal, Input, Form, Upload, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { adsCategory } from "@service";
const Index = (props) => {
   const [form] = Form.useForm();

   const { open, handleClose, getData } = props;

   const handleSubmit = async (values) => {
      const formData = new FormData();
      formData.append("position", values.position);
      formData.append("file", values.file.file);
      try {
         const res = await adsCategory.create(formData);
         if (res.status === 201) {
            handleClose();
            getData();
         }
      } catch (error) {
         console.log(error);
      }
   };
   return (
      <>
         <Modal
            open={open}
            title="Add new Ads"
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
                  label="Position"
                  name="position"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  rules={[
                     {
                        required: true,
                        message: "Please input position!",
                     },
                  ]}
               >
                  <Select allowClear>
                     <Option value="1">1</Option>
                     <Option value="2">2</Option>
                     <Option value="3">3</Option>
                  </Select>
               </Form.Item>

               <Form.Item
                  label="Images"
                  name="file"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  rules={[
                     {
                        required: true,
                        message: "Please input images!",
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

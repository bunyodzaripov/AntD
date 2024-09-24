import React from "react";
import { Button, Form, Input } from "antd";
import SignInImg from "../../assets/images/sign-in.jpg";
import { useNavigate } from "react-router";
import { auth } from "@service";
import { NavLink } from "react-router-dom";
const Index = () => {
   const navigate = useNavigate();
   const onFinish = async (values) => {
      console.log(values);
      try {
         const response = await auth.sign_in(values);
         let access_token = response?.data?.data.tokens.access_token;
         localStorage.setItem("access_token", access_token);
         if (response.status === 201) {
            navigate("/admin-layout");
         }
      } catch (error) {
         console.log(error);
      }
   };
   const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
   };
   return (
      <div className="w-[100%] h-[100vh] flex container mx-auto">
         <div className="w-[50%] flex justify-center items-center">
            <img className="w-full " src={SignInImg} alt="sign-in" />
         </div>
         <div className="w-[50%] flex justify-center items-center">
            <div>
               <h1 className="text-3xl font-semibold mb-4">Login</h1>
               <Form
                  name="basic"
                  labelCol={{
                     span: 8,
                  }}
                  wrapperCol={{
                     span: 16,
                  }}
                  style={{
                     maxWidth: 600,
                  }}
                  initialValues={{
                     remember: true,
                  }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
               >
                  <Form.Item
                     label="Phone number"
                     name="phone_number"
                     labelCol={{
                        span: 24,
                     }}
                     wrapperCol={{
                        span: 24,
                     }}
                     rules={[
                        {
                           required: true,
                           message: "Please input your phone number!",
                        },
                     ]}
                  >
                     <Input className="py-2" />
                  </Form.Item>

                  <Form.Item
                     label="Password"
                     name="password"
                     labelCol={{
                        span: 24,
                     }}
                     wrapperCol={{
                        span: 24,
                     }}
                     rules={[
                        {
                           required: true,
                           message: "Please input your password!",
                        },
                     ]}
                  >
                     <Input.Password className="py-2" />
                  </Form.Item>

                  <Form.Item
                     wrapperCol={{
                        span: 24,
                     }}
                  >
                     <Button
                        type="primary"
                        htmlType="submit"
                        className="w-full mt-4"
                        size="large"
                        style={{
                           backgroundColor: "#c2410c",
                        }}
                     >
                        Submit
                     </Button>
                  </Form.Item>
                  <div className="flex justify-between">
                     <p className="text-sm">Don't have an account?</p>
                     <NavLink
                        to="/sign-up"
                        className={"text-blue-500 underline"}
                     >
                        Sign up here
                     </NavLink>
                  </div>
               </Form>
            </div>
         </div>
      </div>
   );
};
export default Index;

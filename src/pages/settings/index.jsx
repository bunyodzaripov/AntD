import { useEffect, useState } from "react";
import { Card, Avatar, Button, Typography, Row, Col } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { settings } from "@service";
import { Settings } from "@modals";
const { Text } = Typography;

const Index = () => {
   const navigate = useNavigate();
   const [user, setUser] = useState();
   const [open, setOpen] = useState(false);
   const userId = localStorage.getItem("userId");

   useEffect(() => {
      getUser();
   }, []);
   const openModal = () => {
      setOpen(true);
   };
   const getUser = async () => {
      const res = await settings.getOne(userId);
      if (res.status === 200) {
         setUser(res?.data?.data);
      }
   };
   const signUp = () => {
      navigate("/sign-up");
   };
   return (
      <div
         style={{
            display: "flex",
            alignItems: "center",
         }}
      >
         <Settings
            open={open}
            setOpen={setOpen}
            user={user}
            getUser={getUser}
         />
         <Card
            style={{
               width: "100%",
            }}
         >
            <Row
               gutter={16}
               align="middle"
               style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "20px",
               }}
            >
               <Col
                  span={6}
                  style={{ display: "flex", justifyContent: "center" }}
               >
                  <Avatar size={200} icon={<UserOutlined />} />
               </Col>
               <Col span={18}>
                  <Row gutter={[16, 16]}>
                     <Col span={12}>
                        <Text style={{ fontSize: "16px", fontWeight: "small" }}>
                           First name
                        </Text>
                        <br />
                        <Text style={{ fontSize: "28px" }}>
                           {user?.first_name}
                        </Text>
                     </Col>
                     <Col span={12}>
                        <Text style={{ fontSize: "16px", fontWeight: "small" }}>
                           Email
                        </Text>
                        <br />
                        <Text style={{ fontSize: "28px" }}>{user?.email}</Text>
                     </Col>
                     <Col span={12}>
                        <Text style={{ fontSize: "16px", fontWeight: "small" }}>
                           Last name
                        </Text>
                        <br />
                        <Text style={{ fontSize: "28px" }}>
                           {user?.last_name}
                        </Text>
                     </Col>
                     <Col span={12}>
                        <Text style={{ fontSize: "16px", fontWeight: "small" }}>
                           Phone number
                        </Text>
                        <br />
                        <Text style={{ fontSize: "28px" }}>
                           {user?.phone_number}
                        </Text>
                     </Col>
                  </Row>
               </Col>
            </Row>

            <Row
               justify="center"
               gutter={16}
               style={{ marginTop: "20px", textAlign: "center" }}
            >
               <Col>
                  <Button
                     type="primary"
                     onClick={signUp}
                     style={{
                        backgroundColor: "green",
                        borderColor: "green",
                     }}
                  >
                     Create account
                  </Button>
               </Col>
               <Col>
                  <Button
                     onClick={openModal}
                     style={{
                        backgroundColor: "#ffc107",
                        borderColor: "#ffc107",
                        color: "black",
                     }}
                  >
                     Update account
                  </Button>
               </Col>
               <Col>
                  <Button type="primary" danger>
                     Delete account
                  </Button>
               </Col>
            </Row>
         </Card>
      </div>
   );
};

export default Index;

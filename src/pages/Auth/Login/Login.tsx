import { Button, Card, Col, Divider, Flex, Modal, Row, Typography } from "antd";

import { useLoginMutation } from "../../../redux/features/auth/authApi";
import { TAuthUser, setUser } from "../../../redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import verifyToken from "../../../utils/verifyToken";
import { useAppDispatch } from "../../../redux/hooks";
import { FieldValues, SubmitHandler } from "react-hook-form";
import CSForm from "../../../components/form/CSForm";
import CSInput from "../../../components/form/CSInput";
import { LogIn, UserRoundCog } from "lucide-react";

const Login = () => {
  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit: SubmitHandler<FieldValues> = async (values) => {
    const toastId = toast.loading("Logging in...");
    try {
      const res = await login(values).unwrap();
      const user = verifyToken(res.data.accessToken) as TAuthUser;
      dispatch(setUser({ user, token: res.data.accessToken }));
      toast.success("login successful", { id: toastId, duration: 2000 });
      navigate(`/inventory`);
    } catch (error) {
      // console.log(error.data.message);

      toast.error("something went wrong!", { id: toastId, duration: 2000 });
    }
  };

  const info = () => {
    const modal = Modal.info({
      title: "Try our demo account",
      content: (
        <Flex vertical gap={16} style={{ marginTop: 20 }}>
          {/* Admin Account */}
          <Flex justify="space-between" align="center">
            <div>
              <Typography.Title level={5} style={{ margin: 0 }}>
                Admin
              </Typography.Title>
              <Typography.Text type="secondary">
                Email: admin@demo.com
              </Typography.Text>
              <br />
              <Typography.Text type="secondary">
                Password: test123
              </Typography.Text>
            </div>
            <Button
              type="primary"
              style={{ backgroundColor: "#FE9F43" }}
              onClick={async () => {
                await handleSubmit({
                  email: "admin@gmail.com",
                  password: "12345678",
                });
                modal.destroy();
              }}
            >
              TRY
            </Button>
          </Flex>

          {/* Student Account */}
          <Flex justify="space-between" align="center">
            <div>
              <Typography.Title level={5} style={{ margin: 0 }}>
                Seller
              </Typography.Title>
              <Typography.Text type="secondary">
                Email: seller@demo.com
              </Typography.Text>
              <br />
              <Typography.Text type="secondary">
                Password: test123
              </Typography.Text>
            </div>
            <Button
              type="primary"
              style={{ backgroundColor: "#FE9F43" }}
              onClick={async () => {
                await handleSubmit({
                  email: "seller@demo.com",
                  password: "test123",
                });
                modal.destroy();
              }}
            >
              TRY
            </Button>
          </Flex>
        </Flex>
      ),
      okButtonProps: { style: { display: "none" } },
      closable: true,
      maskClosable: true,
      centered: true,
      icon: null,
    });
  };

  return (
    <Row
      justify="center"
      align="middle"
      style={{ minHeight: "100vh", padding: "20px" }}
    >
      <Col xs={24} md={12} lg={10}>
        <img
          src="/src/assets/5921785.jpg"
          alt="Login illustration"
          style={{
            width: "100%",
            maxWidth: "500px",
            margin: "0 auto",
            display: "block",
          }}
        />
      </Col>
      <Col xs={24} md={12} lg={8}>
        <Card
          style={{ 
            maxWidth: "400px", 
            margin: "0 auto", 
            textAlign: "center",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            borderRadius: "12px",
            padding: "24px"
          }}
        >
          <Typography.Title level={3} style={{ marginBottom: 24, color: "#FE9F43" }}>
            LOGIN HERE !
          </Typography.Title>
          <CSForm onSubmit={handleSubmit}>
            <CSInput type="email" name="email" label="Enter your Email" />
            <CSInput
              type="password"
              name="password"
              label="Enter your Password"
            />
            <Button
              type="primary"
              htmlType="submit"
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                fontSize: 16
              }}
              icon={<LogIn size={18} />}
            >
              LOGIN
            </Button>
          </CSForm>
          <Divider plain>OR</Divider>
          <Button
            type="default"
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              fontSize: 16
            }}
            onClick={info}
            icon={<UserRoundCog size={18} />}
          >
            TRY DEMO
          </Button>

        <div style={{ marginTop: 16, textAlign: 'center' }}>
          <Typography.Text>Don't have an account? </Typography.Text>
          <Typography.Link onClick={() => navigate('/register')}>
            Register
          </Typography.Link>
        </div>
        </Card>
      </Col>
    </Row>
  );
};

export default Login;

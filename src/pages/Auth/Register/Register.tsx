import { Button, Card, Col, Row, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useRegisterMutation } from "../../../redux/features/users/usersApi";
import { FieldValues, SubmitHandler } from "react-hook-form";
import CSForm from "../../../components/form/CSForm";
import CSInput from "../../../components/form/CSInput";
import { UserPlus } from "lucide-react";

const Register = () => {
  const navigate = useNavigate();
  const [register] = useRegisterMutation();
  const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
    const userInfo = {
      name: {
        firstName: data.firstName,
        lastName: data.lastName,
      },
      email: data.email,
      password: data.password,
    };

    const toastId = toast.loading("Registration in progress...");
    try {
      await register(userInfo);

      toast.success("User registration successful", {
        id: toastId,
        duration: 2000,
      });
      navigate(`/login`);
    } catch (error) {
      toast.error("something went wrong!", { id: toastId, duration: 2000 });
    }
  };

  return (
    <Row
      justify="center"
      align="middle"
      style={{ minHeight: "100vh", padding: "20px" }}
    >
      <Col xs={24} md={12} lg={10}>
        <img
          src="/src/assets/5639647.jpg"
          alt="Register illustration"
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
            padding: "5px 24px",
          }}
        >
          <Typography.Title
            level={3}
            style={{ marginBottom: 24, color: "#FE9F43" }}
          >
            REGISTER HERE !
          </Typography.Title>
          <CSForm onSubmit={handleSubmit}>
            <CSInput
              type="text"
              name="firstName"
              label="Enter your First Name"
            />
            <CSInput type="text" name="lastName" label="Enter your Last Name" />
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
                fontSize: 16,
              }}
              icon={<UserPlus size={18} />}
            >
              REGISTER
            </Button>
          </CSForm>

          <div style={{ marginTop: 16, textAlign: "center" }}>
            <Typography.Text>Already have an account? </Typography.Text>
            <Typography.Link onClick={() => navigate("/login")}>
              Login
            </Typography.Link>
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default Register;

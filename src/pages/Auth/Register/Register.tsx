import { Button, Card, Flex } from "antd";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useRegisterMutation } from "../../../redux/features/users/usersApi";
import { FieldValues, SubmitHandler } from "react-hook-form";
import CSForm from "../../../components/form/CSForm";
import CSInput from "../../../components/form/CSInput";


const Register = () => {
  const navigate = useNavigate();
  const [register] = useRegisterMutation();
  const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
    // console.log(values);
    const userInfo = {
      name: {
        firstName: data.firstName,
        lastName: data.lastName,
      },
      email: data.email,
      password: data.password,
    };
    // console.log(userInfo);
    
    const toastId = toast.loading("Registration in progress...");
    try {
      await register(userInfo);

      toast.success("User registration successful", {
        id: toastId,
        duration: 2000,
      });
      navigate(`/login`);
    } catch (error) {
      // console.log(error.data.message);
      toast.error("something went wrong!", { id: toastId, duration: 2000 });
    }
  };
  return (
    <>

      <Flex justify="center" style={{ marginTop: 20 }}>
        <Card  style={{ width: 400 }}>
          <h3 style={{marginBottom: 10}}>Register here!</h3>
          <CSForm onSubmit={handleSubmit}>
          <CSInput type="text" name="firstName" label="Enter your First Name" />
          <CSInput type="text" name="lastName" label="Enter your Last Name" />
          <CSInput type="email" name="email" label="Enter your Email" />
          <CSInput
            type="password"
            name="password"
            label="Enter your Password"
          />
          <Button style={{marginRight: 5}} type="primary" htmlType="submit">
            Register
          </Button>
          Or <a href="/login">Login here!</a>
        </CSForm>
        </Card>
      </Flex>
    </>
  );
};

export default Register;

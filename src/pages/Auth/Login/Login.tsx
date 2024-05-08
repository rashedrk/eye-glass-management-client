import { Button, Card, Flex } from "antd";

import { useLoginMutation } from "../../../redux/features/auth/authApi";
import { TAuthUser, setUser } from "../../../redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import verifyToken from "../../../utils/verifyToken";
import { useAppDispatch } from "../../../redux/hooks";
import { FieldValues, SubmitHandler } from "react-hook-form";
import CSForm from "../../../components/form/CSForm";
import CSInput from "../../../components/form/CSInput";

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
      navigate(`/`);
    } catch (error) {
      // console.log(error.data.message);

      toast.error("something went wrong!", { id: toastId, duration: 2000 });
    }
  };
  return (
    <Flex justify="center" style={{ marginTop: 40 }}>
      <Card style={{ width: 300 }}>
        <CSForm onSubmit={handleSubmit}>
          <CSInput type="email" name="email" label="Enter your Email" />
          <CSInput
            type="password"
            name="password"
            label="Enter your Password"
          />
          <Button type="primary" htmlType="submit">
            Log in
          </Button>
          Or <a href="/register">register now!</a>
        </CSForm>
      </Card>
    </Flex>
  );
};

export default Login;

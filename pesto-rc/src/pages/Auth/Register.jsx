import { useMutation } from "@apollo/client";
import { REGISTER_MUTATION } from "@graphql/Auth";
import useAuth from "@store/useAuth";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  notification,
  Row,
  Typography,
} from "antd";
import { Link } from "react-router-dom";

const Register = () => {
  const [form] = Form.useForm();
  const { loginUser } = useAuth();

  const [register, registerQueryState] = useMutation(REGISTER_MUTATION, {
    onCompleted: ({ registerUser }) => {
      loginUser(registerUser);
      notification.success({
        message: "Account Created Successfully.",
      });
    },
    onError: (error) => {
      notification.error({
        message: error.message,
      });
    },
  });

  return (
    <section className="h-full w-full">
      <Row align="middle" justify="center" className="h-full">
        <Col span={7} xs={24} sm={9}>
          <Card
            className="w-full shadow-md rounded-sm"
            cover={
              <div className="w-full px-8">
                <div className="auth-bg py-4 rounded-sm mt-[-20px] flex flex-col items-center justify-center">
                  <Typography.Title level={2}>
                    <span className="text-white">Sign Up</span>
                  </Typography.Title>
                  <Typography.Paragraph className="text-white text-[18px]">
                    Sign up to create account.
                  </Typography.Paragraph>
                </div>
              </div>
            }
          >
            <Form
              form={form}
              layout="vertical"
              requiredMark={false}
              disabled={registerQueryState.loading}
              onFinish={(values) =>
                register({ variables: { newUser: values } })
              }
            >
              <Form.Item
                name="firstName"
                label="First Name"
                rules={[{ required: true, message: "First name is required." }]}
              >
                <Input placeholder="Jhon" size="large" />
              </Form.Item>
              <Form.Item
                name="lastName"
                label="Last Name"
                rules={[{ required: true, message: "Last name is required." }]}
              >
                <Input placeholder="Doe" size="large" />
              </Form.Item>
              <Form.Item
                name="username"
                label="Username"
                rules={[{ required: true, message: "Username is required." }]}
              >
                <Input placeholder="jhon_doe" size="large" />
              </Form.Item>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: "Email is required." },
                  {
                    type: "email",
                    message: "Should be a valid email address.",
                  },
                ]}
              >
                <Input placeholder="jhon_doe@example.com" size="large" />
              </Form.Item>
              <Form.Item
                name="password"
                label="Password"
                rules={[
                  { required: true, message: "Password is required." },
                  {
                    min: 8,
                    message: "Password should atleast have 8 characters.",
                  },
                ]}
              >
                <Input.Password size="large" placeholder="Password" />
              </Form.Item>
              <div className="w-full flex flex-col gap-4">
                <Button
                  block
                  size="large"
                  type="primary"
                  htmlType="submit"
                  loading={registerQueryState.loading}
                  disabled={registerQueryState.loading}
                  className="flex items-center justify-center"
                >
                  Sign Up
                </Button>
                <Link to="/auth/login">
                  <Button
                    block
                    size="large"
                    disabled={registerQueryState.loading}
                    className="flex items-center justify-center"
                  >
                    Already have an account? Sign in here
                  </Button>
                </Link>
              </div>
            </Form>
          </Card>
        </Col>
      </Row>
    </section>
  );
};

export default Register;

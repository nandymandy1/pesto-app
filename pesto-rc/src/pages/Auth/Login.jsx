import { useLazyQuery } from "@apollo/client";
import { AUTHENTICATE_QUERY } from "@graphql/Auth";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Row,
  Typography,
  notification,
} from "antd";
import { Link } from "react-router-dom";
import useAuth from "@store/useAuth";

const Login = () => {
  const [form] = Form.useForm();
  const { loginUser } = useAuth();
  const [authenticate, authQueryState] = useLazyQuery(AUTHENTICATE_QUERY, {
    onCompleted: ({ authenticateUser }) => {
      loginUser(authenticateUser);
      notification.success({
        message: "Logged in Successfully.",
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
                    <span className="text-white">Sign In</span>
                  </Typography.Title>
                  <Typography.Paragraph className="text-white text-[18px]">
                    Sign in into your account.
                  </Typography.Paragraph>
                </div>
              </div>
            }
          >
            <Form
              form={form}
              layout="vertical"
              requiredMark={false}
              disabled={authQueryState.loading}
              onFinish={(values) => authenticate({ variables: values })}
            >
              <Form.Item
                name="username"
                label="Username"
                rules={[{ required: true, message: "Username is required." }]}
              >
                <Input placeholder="Username" size="large" />
              </Form.Item>
              <Form.Item
                name="password"
                label="Password"
                className="my-10"
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
                  loading={authQueryState.loading}
                  disabled={authQueryState.loading}
                >
                  Sign In
                </Button>
                <Link to="/auth/register">
                  <Button
                    block
                    size="large"
                    disabled={authQueryState.loading}
                    className="flex items-center justify-center"
                  >
                    Don't have account? Register Now
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

export default Login;

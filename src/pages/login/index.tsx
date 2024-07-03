import { useNavigate } from "react-router-dom";
import { Button, Form, Input } from "antd";
import type { FormProps } from "antd";

import { useAppContext } from "@/app-context";
import { fetchLogin } from "@/services/user";

import styles from "./login.module.less";

type FieldType = {
  username?: string;
  password?: string;
};

const Login = () => {
  const { dispatch } = useAppContext();

  const navigate = useNavigate();

  const handleSubmit = async (values: any) => {
    fetchLogin(values)
      .then((res: any) => {
        localStorage.setItem("token", res.data.token);
        // location.href = '/dashboard'
      })
      .then(() => {
        dispatch({ type: "SET_USER", payload: values });
        navigate("/dashboard/page1", { replace: true });
      })
      .catch((err) => {
        console.log("fetch error", err);
      });
  };

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    console.log("values", values);
    handleSubmit(values);
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className={styles.login}>
      <h1 className={styles.title}>KMS</h1>
      <div className={styles.form}>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ width: 500 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input size="large" placeholder="Username: admin or user" />
          </Form.Item>

          <Form.Item<FieldType>
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password size="large" placeholder="Password: 123" />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" size="large" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;

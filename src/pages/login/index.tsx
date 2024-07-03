import { useNavigate } from "react-router-dom";

import { useAppContext } from "@/app-context";
import { fetchLogin } from "@/services/user";

import styles from "./login.module.less";
import { useState } from "react";

type FieldType = {
  username?: string;
  password?: string;
};

const Login = () => {
  const { dispatch } = useAppContext();
  const [formValues, setFormValues] = useState<FieldType>({
    username: "",
    password: "",
  });

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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Form submitted:", formValues);
    // 你可以在此处执行任何进一步的处理，例如表单验证、API调用等
    if (!formValues.username || !formValues.password) {
      return;
    }

    handleSubmit(formValues);
  };

  return (
    <div className={styles.login}>
      <h1 className={styles.title}>KMS</h1>
      <div className={styles.formWrapper}>
        <form onSubmit={onSubmit} className={styles.form}>
          <label htmlFor="username">
            Username:{" "}
            <input
              type="text"
              name="username"
              placeholder="usr: admin or user"
              value={formValues.username}
              onChange={handleChange}
            />
          </label>

          <label htmlFor="password">
            Password:{" "}
            <input
              type="password"
              name="password"
              placeholder="pwd: 123"
              value={formValues.password}
              onChange={handleChange}
            />
          </label>

          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
};

export default Login;

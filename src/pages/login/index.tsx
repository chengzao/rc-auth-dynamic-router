import { useNavigate } from "react-router-dom";

import { useAppContext } from "@/app-context";
import { fetchLogin } from "@/services/user";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
    <div>
      <form
        onSubmit={onSubmit}
        className="w-full h-screen flex items-center justify-center flex-col gap-4"
      >
        <h1 className="grid w-full max-w-sm items-center gap-1.5 text-3xl text-center">
          Login
        </h1>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            type="text"
            name="username"
            value={formValues.username}
            onChange={handleChange}
            placeholder="usr: admin or user"
          />
        </div>

        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            name="password"
            placeholder="pwd: 123"
            value={formValues.password}
            onChange={handleChange}
          />
        </div>

        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </div>
  );
};

export default Login;

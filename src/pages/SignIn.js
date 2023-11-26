import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useState } from "react";
import style from "../css/sign.module.css";
function SignIn({ setIsLoggedIn, setToken }) {
  const [, setData] = useState();
  const [toggle, setToggle] = useState("password");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const toastId = toast.loading("Logging In");
    setData(data);
    let formData = {
      username: data.userName,
      password: data.password,
    };
    let postData = async () => {
      try {
        let response = await fetch(
          "https://elegantapp.pythonanywhere.com/api/auth/login/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );
        let data = await response.json();
        if (response.ok) {
          setToken(data.token);
          setIsLoggedIn(true);
          toast.success("Logged In Successfully", { id: toastId });
          navigate("/");
        } else if (response.status === 400) {
          if (data.password) {
            toast.error(data.password[0], { id: toastId });
          } else if (data.username) {
            toast.error(data.username[0], { id: toastId });
          }
        }
      } catch (err) {
        toast.error("Check Your Internet Conection", { id: toastId });
      }
    };
    postData();
  };
  const toggleVisibility = () => {
    if (toggle === "password") {
      setToggle("text");
    } else {
      setToggle("password");
    }
  };
  return (
    <div className={style.sign}>
      <Toaster position="top-right" />
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>USERNAME</label> <br />
        <input
          type="text"
          {...register("userName", {
            required: {
              value: true,
              message: "this input field is required",
            },
          })}
        />
        <span
          style={{
            color: "red",
            fontSize: "small",
            position: "relative",
            top: "-10px",
          }}
        >
          {errors?.userName?.message}
        </span>
        <br />
        <label>PASSWORD</label> <br />
        <input
          type={toggle}
          {...register("password", {
            required: {
              value: true,
              message: "this input field is required",
            },
          })}
        />
        <span
          style={{
            color: "red",
            fontSize: "small",
            position: "relative",
            top: "-10px",
          }}
        >
          {errors?.password?.message}
        </span>
        <br />
        <input type="checkbox" onClick={toggleVisibility} />{" "}
        <label>show password</label> <br />
        <input type="submit" value="Login" />
        <br />
        <div className={style.link}>
          <Link to="/signup">Don't have an account? Sign up</Link>
        </div>
      </form>
    </div>
  );
}
export default SignIn;

import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";
import style from "../css/sign.module.css";

interface FormValues {
  userName: string,
  password: string,
  email: string,
  repeatPassword: string
}
function SignUp() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>();
  const onSubmit = (data: FormValues) => {
    const toastId = toast.loading("Signing Up");
    let formData = {
      username: data.userName,
      password: data.password,
      email: data.email,
    };
    let submitData = async () => {
      try {
        let response = await fetch(
          "https://web-shop-347882250283.us-east4.run.app/api/auth/signup/",
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
          toast.success("Signed Up Successfully", { id: toastId });
          navigate("/SignIn");
        } else if (response.status === 400) {
          if (data.email) {
            toast.error(data.email[0], { id: toastId });
          } else if (data.username) {
            toast.error(data.username[0], { id: toastId });
          }
        }
      } catch (err) {
        toast.error("Check Your Internet Connection", { id: toastId });
      }
    };
    submitData();
  };
  return (
    <div className={style.sign}>
      <Toaster position="top-right" />
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>EMAIL</label>
        <br />
        <input
          type="email"
          {...register("email", {
            required: {
              value: true,
              message: "input field is required",
            },
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: "input a valid email",
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
          {errors?.email?.message}
        </span>
        <br />
        <label>USERNAME</label> <br />
        <input
          type="text"
          {...register("userName", {
            required: {
              value: true,
              message: "input field is required",
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
          type="password"
          {...register("password", {
            required: {
              value: true,
              message: "input field is required",
            },
            minLength: {
              value: 6,
              message: "password can't be less than 6 characters",
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
        <label>REPEAT PASSWORD</label> <br />
        <input
          type="password"
          {...register("repeatPassword", {
            required: {
              value: true,
              message: "input field is required",
            },
            validate: {
              same: (value) => value === watch("password"),
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
          {errors?.repeatPassword?.type === "same" && "passwords dont match"}
        </span>
        <span
          style={{
            color: "red",
            fontSize: "small",
            position: "relative",
            top: "-10px",
          }}
        >
          {errors?.repeatPassword?.message}
        </span>
        <br />
        <input type="submit" value="Sign Up" /> <br />
        <div className={style.link}>
          <Link to="/signin">Already have an account?</Link>
        </div>
      </form>
    </div>
  );
}
export default SignUp;

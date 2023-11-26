import style from "../css/sign.module.css";
import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
function Account({ token, setToken }) {
  const form = useRef();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const [, setData] = useState();
  const onSubmit = (data) => {
    const toastId = toast.loading("Changing Password");
    setData(data);
    let formData = {
      old_password: data.oldPassword,
      new_password: data.password,
    };
    let submitData = async () => {
      try {
        let response = await fetch(
          "https://elegantapp.pythonanywhere.com/api/auth/reset/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${token}`,
            },
            body: JSON.stringify(formData),
          }
        );

        let data = await response.json();
        if (response.ok) {
          setToken(data.token);
          toast.success("Password Changed Successfully", { id: toastId });
          form.current.reset();
        } else if (response.status === 400) {
          toast.error(data.old_password[0], { id: toastId });
        }
      } catch (err) {
        toast.error("Check Internet Connection", { id: toastId });
      }
    };
    submitData();
  };
  return (
    <div className={style.sign}>
      <Toaster position="top-right" />
      <h2>Edit Account</h2>
      <form onSubmit={handleSubmit(onSubmit)} ref={form}>
        <label>OLD PASSWORD</label> <br />
        <input
          type="password"
          {...register("oldPassword", {
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
          {errors?.oldPassword?.message}
        </span>
        <br />
        <label>NEW PASSWORD</label> <br />
        <input
          type="password"
          {...register("password", {
            required: {
              value: true,
              message: "this input field is required",
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
        <label>REPEAT NEW PASSWORD</label> <br />
        <input
          type="password"
          {...register("repeatPassword", {
            required: {
              value: true,
              message: "this input field is required",
            },
            validate: {
              same: (value) => {
                return value === watch("password");
              },
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
          {errors?.repeatPassword?.type === "same" && "passwords don't match"}
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
        <input type="submit" value="Change Password" />
      </form>
    </div>
  );
}
export default Account;

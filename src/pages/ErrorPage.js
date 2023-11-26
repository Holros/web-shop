import { useNavigate } from "react-router-dom";
import style from "../css/home.module.css";
function ErrorPage() {
  const navigate = useNavigate();
  return (
    <>
      <h1 className={style.header}> Oops! Page Not Found🤷‍♂️ </h1>
      <div className={style.didnt_loadd}>
        <p>
          Looks like the page went on vacation without telling us. We've
          searched high and low, but no luck.
        </p>
        <br />
        <br />
        <p>
          <span
            style={{ color: "blue", cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            Click here
          </span>{" "}
          to return home🏡
        </p>
      </div>
    </>
  );
}
export default ErrorPage;

import { memo, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import style from "../css/search.module.css";
import cancelIcon from "../icons/icons8-cancel-50.png";
import searchIcon from "../icons/icons8-search-white.png";
import { useNavigate } from "react-router-dom";
import { Product } from "../projectTypes";
import toast from "react-hot-toast";
function Search({
  searchVisibile,
  setSearchVisibile,
  token,
  setProducts,
  setNextProducts,
  isLoggedIn,
}: {
  searchVisibile: boolean;
  setSearchVisibile: React.Dispatch<React.SetStateAction<boolean>>;
  token: string | null;
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  setNextProducts: React.Dispatch<React.SetStateAction<string | null>>;
  isLoggedIn: boolean;
}) {
  const search = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<{ search: string }>();
  useEffect(() => {
    if (search.current && searchVisibile === true) {
      search.current.style.display = "flex";
    } else if (search.current) {
      search.current.style.display = "none";
    }
  }, [searchVisibile]);
  const searchProduct = (data: { search: string }) => {
    const toastId = toast.loading("Searching For Products");
    const searchProduct = data.search;
    if (searchProduct.trim() === "") {
      toast.error("Search Bar Can't Be Empty", { id: toastId });
      return;
    }
    if (!isLoggedIn) {
      toast.error("You need to login", { id: toastId });
      return;
    }
    const fetchData = async () => {
      try {
        let response = await fetch(
          `https://web-shop-347882250283.us-east4.run.app/api/shop/items/?name=${searchProduct}`,
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
        const data = await response.json();
        const { results, next } = data;
        if (response.ok) {
          setProducts(results);
          setNextProducts(next);
          toast.success("Done Searching", { id: toastId });
          navigate(`/search`);
          setSearchVisibile(false);
        }
      } catch (err) {
        toast.error("Something Went Wrong", { id: toastId });
      }
    };
    fetchData();
  };
  return (
    <div
      ref={search}
      style={{ display: "none" }}
      onClick={() => setSearchVisibile(false)}
      className={style.modal}
    >
      <div onClick={(e) => e.stopPropagation()} className={style.modalChild}>
        <div className={style.headCancel}>
          <p>Search Products</p>
          <img
            src={cancelIcon}
            onClick={() => setSearchVisibile(false)}
            alt="cancel"
          />
        </div>
        <div className={style.search}>
          <input
            type="search"
            placeholder="Search Products"
            {...register("search")}
          ></input>
          <div
            className={style.searchIcon}
            onClick={handleSubmit(searchProduct)}
          >
            <img alt="search" src={searchIcon} />
          </div>
        </div>
      </div>
    </div>
  );
}
export default memo(Search);

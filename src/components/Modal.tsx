import { useEffect, useState } from "react";
import style from "../css/modal.module.css";
import cancel from "../icons/icons8-cancel-50.png";
import { useForm } from "react-hook-form";
import { CartItems, Product } from "../projectTypes";
import toast  from "react-hot-toast";

function Modal({
  show,
  setShow,
  type,
  modalProductItem,
  token,
  setSaleProducts,
}:{show:string,
  setShow: React.Dispatch<React.SetStateAction<string>>,
  type: string,
  modalProductItem: Product,
  token: string | null,
  setSaleProducts: React.Dispatch<React.SetStateAction<Product[]>>,
}) {
  // const [, setData] = useState();
  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors },
  } = useForm<Product>();
  useEffect(() => {
    if (show === "none") {
      reset();
    }
  }, [reset, show]);
  useEffect(() => {
    setValue("name", modalProductItem.name);
    setValue("description", modalProductItem.description);
    setValue("price", modalProductItem.price);
  }, [modalProductItem, setValue]);
  const addProduct = (data: Product) => {
    const toastId = toast.loading("Adding Product");
    // setData(data);
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("thumbnail", data.thumbnail[0]);

    let addProduct = async () => {
      try {
        let response = await fetch(
          "https://web-shop-347882250283.us-east4.run.app/api/shop/items/",
          {
            method: "POST",
            headers: {
              Authorization: `Token ${token}`,
            },
            body: formData,
          }
        );
        if (response.ok) {
          {
            let response = await fetch(
              "https://web-shop-347882250283.us-east4.run.app/api/shop/history/sale",
              {
                headers: {
                  Authorization: `Token ${token}`,
                },
              }
            );
            let data = await response.json();
            const { results } = data;
            setSaleProducts(results);
          }
          toast.success("Added Successfully", { id: toastId });
          setShow("none");
          reset();
        }
      } catch (err) {
        toast.error("Something went wrong", { id: toastId });
      }
    };
    addProduct();
  };
  const editProduct = (data: Product) => {
    const toastId = toast.loading("Editing Product");
    // setData(data);
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price);
    if (data.thumbnail[0]) {
      formData.append("thumbnail", data.thumbnail[0]);
    }

    let editProduct = async () => {
      try {
        let response = await fetch(
          `https://web-shop-347882250283.us-east4.run.app/api/shop/items/${modalProductItem.id}/`,
          {
            method: "PATCH",
            headers: {
              Authorization: `Token ${token}`,
            },
            body: formData,
          }
        );
        if (response.ok) {
          let response = await fetch(
            "https://web-shop-347882250283.us-east4.run.app/api/shop/history/sale",
            {
              headers: {
                Authorization: `Token ${token}`,
              },
            }
          );
          let data = await response.json();
          const { results } = data;
          setSaleProducts(results);
          toast.success("Edited Successfully", { id: toastId });
          setShow("none");
          reset();
        }
      } catch (err) {
        toast.error("Something Went Wrong", { id: toastId });
      }
    };
    editProduct();
  };
  const deleteProduct = async () => {
    const toastId = toast.loading("Deleting Product");
    try {
      await fetch(
        `https://web-shop-347882250283.us-east4.run.app/api/shop/items/${modalProductItem.id}/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      {
        let response = await fetch(
          "https://web-shop-347882250283.us-east4.run.app/api/shop/history/sale",
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
        let data = await response.json();
        const { results } = data;
        setSaleProducts(results);
        toast.success("Deleted Successfully", { id: toastId });
        setShow("none");
        reset();
      }
    } catch (err) {
      toast.error("Something Went Wrong", { id: toastId });
    }
  };
  return (
    <div
      className={style.modal}
      style={{ display: show }}
      onClick={() => {
        setShow("none");
      }}
    >
      <div
        className={style.content}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className={style.title_cancel}>
          <p>{type === "add" ? "Add New Product" : "Edit Product"}</p>
          <img
            alt="cancel"
            src={cancel}
            onClick={() => {
              setShow("none");
            }}
          />
        </div>
        {type === "add" ? (
          <form>
            <label>Name</label>
            <br />
            <input
              type="text"
              defaultValue=""
              {...register("name", {
                required: {
                  value: true,

                  message: "input field is required",
                },
              })}
            />
            <span className={style.span}>{errors?.name?.message}</span>
            <br />
            <label>Description</label>
            <br />
            <input
              type="text"
              defaultValue=""
              {...register("description", {
                required: {
                  value: true,
                  message: "input field is required",
                },
              })}
            />
            <span className={style.span}>{errors?.description?.message}</span>
            <br />
            <label>Price (£) </label>
            <br />
            <input
              type="number"
              defaultValue=""
              {...register("price", {
                required: {
                  value: true,
                  message: "input field is required",
                },
              })}
            />
            <span className={style.span}>{errors?.price?.message}</span>
            <br />
            <label>Thumbnail</label>
            <br />
            <input
              type="file"
              accept="image/*"
              {...register("thumbnail", {
                required: {
                  value: true,
                  message: "input field is required",
                },
              })}
            />
            <span className={style.span}>{errors?.thumbnail?.message}</span>
            <br />
            <div className={style.submit}>
              <button onClick={handleSubmit(addProduct)}>Add Product</button>
            </div>
          </form>
        ) : (
          <form>
            <label>Name</label>
            <br />
            <input
              type="text"
              defaultValue={modalProductItem.name}
              {...register("name", {
                required: {
                  value: true,
                  message: "input field is required",
                },
              })}
            />
            <span className={style.span}>{errors?.name?.message}</span>
            <br />
            <label>Description</label>
            <br />
            <input
              type="text"
              defaultValue={modalProductItem.description}
              {...register("description", {
                required: {
                  value: true,
                  message: "input field is required",
                },
              })}
            />
            <span className={style.span}>{errors?.description?.message}</span>
            <br />
            <label>Price (£) </label>
            <br />
            <input
              type="number"
              defaultValue={modalProductItem.price}
              {...register("price", {
                required: {
                  value: true,
                  message: "input field is required",
                },
              })}
            />
            <span className={style.span}>{errors?.price?.message}</span>
            <br />
            <label>Thumbnail</label>
            <br />
            <input
              type="file"
              accept="image/*"
              {...register("thumbnail", {
                required: {
                  value: false,
                  message: "input field is required",
                },
              })}
            />
            <span className={style.span}>{errors?.thumbnail?.message}</span>
            <br />
            <div className={style.submit}>
              <button onClick={handleSubmit(editProduct)}>Save</button>
              <button
                onClick={handleSubmit(deleteProduct)}
                className={style.delete}
              >
                Delete
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
export default Modal;

import { useEffect } from "react";
import style from "../css/home.module.css";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import Products from "../components/Products";
import Modal from "../components/Modal";
function Item({ token }) {
  const [purchasedProducts, setPurchasedProducts] = useState([]);
  const [saleProducts, setSaleProducts] = useState([]);
  const [soldProducts, setSoldProducts] = useState([]);
  const [show, setShow] = useState("none");
  const [type, setType] = useState("add");
  const [modalProductItem, setModalProductItem] = useState([]);
  useEffect(() => {
    {
      let fetchPurchasedProduct = async () => {
        try {
          let response = await fetch(
            "https://elegantapp.pythonanywhere.com/api/shop/history/purchased",
            {
              headers: {
                Authorization: `Token ${token}`,
              },
            }
          );
          let data = await response.json();
          const { results } = data;
          setPurchasedProducts(results);
        } catch (err) {
          return;
        }
      };
      fetchPurchasedProduct();
    }
    {
      let fetchSaleProduct = async () => {
        try {
          let response = await fetch(
            "https://elegantapp.pythonanywhere.com/api/shop/history/sale",
            {
              headers: {
                Authorization: `Token ${token}`,
              },
            }
          );
          let data = await response.json();
          const { results } = data;
          setSaleProducts(results);
        } catch (err) {
          return;
        }
      };
      fetchSaleProduct();
    }
    {
      let fetchSoldProduct = async () => {
        const toastId = toast.loading("Loading...");
        try {
          let response = await fetch(
            "https://elegantapp.pythonanywhere.com/api/shop/history/sold",
            {
              headers: {
                Authorization: `Token ${token}`,
              },
            }
          );
          let data = await response.json();
          const { results } = data;
          setSoldProducts(results);
          toast.dismiss(toastId);
        } catch (err) {
          toast.dismiss(toastId);
          toast.error("Check Your Internet Connection");
        }
      };
      fetchSoldProduct();
    }
  }, [token]);
  return (
    <>
      <Toaster position="top-right" />
      <Modal
        show={show}
        setShow={setShow}
        type={type}
        modalProductItem={modalProductItem}
        token={token}
        setSaleProducts={setSaleProducts}
        toast={toast}
      />
      <h1 className={style.header}> My Products </h1>
      <div className={style.center}>
        <button
          className={style.add}
          onClick={() => {
            setType("add");
            setShow("flex");
          }}
        >
          Add New
        </button>
      </div>
      <div className={style.segment}>
        <p>Purchased Products</p>
        {purchasedProducts.length < 1 ? (
          <div className={style.didnt_load}>
            <h2>Products You Buy Will Appear Here</h2>
          </div>
        ) : (
          <div className={style.content}>
            {purchasedProducts.map((item) => (
              <Products key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
      <div className={style.segment}>
        <p>Products For Sale</p>
        {saleProducts.length < 1 ? (
          <div className={style.didnt_load}>
            <h2>Products You Have For Sale Will Appear Here</h2>
          </div>
        ) : (
          <div className={style.content}>
            {saleProducts.map((item) => (
              <Products
                key={item.id}
                setType={setType}
                item={item}
                setShow={setShow}
                type={type}
                setModalProductItem={setModalProductItem}
                modalProductItem={modalProductItem}
              />
            ))}
          </div>
        )}
      </div>
      <div className={style.segment}>
        <p>Sold Products</p>
        {soldProducts.length < 1 ? (
          <div className={style.didnt_load}>
            <h2>Your Products Other Users Have Purchased Will Appear Here</h2>
          </div>
        ) : (
          <div className={style.content}>
            {soldProducts.map((item) => (
              <Products key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
export default Item;

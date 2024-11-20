import React, { useEffect } from "react";
import style from "../css/home.module.css";
import Products from "../components/Products";
import toast, { Toaster } from "react-hot-toast";
import { CartItems, Product } from "../projectTypes";
function Home({
  token,
  cartItems,
  setCartItems,
  products,
  setProducts,
  nextProducts,
  setNextProducts,
}: {
  token: string | null;
  cartItems: CartItems[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItems[]>>;
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  nextProducts: string | null;
  setNextProducts: React.Dispatch<React.SetStateAction<string | null>>;
}) {
  useEffect(() => {
    let fetchData = async () => {
      if (!token) {
        return; //added this so the component won't corrupt the product/setProduct useState if it mounts in the background as the token won't be available yet
      } else {
        const toastId = toast.loading("Loading...");
        try {
          let response = await fetch(
            "https://web-shop-347882250283.us-east4.run.app/api/shop/items/",
            {
              headers: {
                Authorization: `Token ${token}`,
              },
            }
          );
          let data = await response.json();
          const { results, next } = data;
          setProducts(results);
          setNextProducts(next);
          toast.dismiss(toastId);
        } catch (err) {
          toast.dismiss(toastId);
          toast.error("Check Your Internet Connection");
        }
      }
    };
    fetchData();
  }, [token, setProducts, setNextProducts]);

  const loadMore = async () => {
    if (nextProducts) {
      const toastId = toast.loading("Loading...");
      try {
        let response = await fetch(nextProducts, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        let data = await response.json();
        const { results, next } = data;
        setProducts((prev) => [...prev, ...results]);
        setNextProducts(next);
        toast.dismiss(toastId);
      } catch (err) {
        toast.dismiss(toastId);
        toast.error("Check Your Internet Connection");
      }
    }
  };
  return (
    <>
      <Toaster position="top-right" />
      <h1 className={style.header}> Products For You </h1>
      {products.length < 1 ? (
        <div className={style.didnt_load}>
          <h2>No Product Found</h2>
        </div>
      ) : (
        <div className={style.content}>
          {products.map((item) => (
            <Products
              item={item}
              key={item.id}
              addToCart={true}
              setCartItems={setCartItems}
              cartItems={cartItems}
            />
          ))}
        </div>
      )}
      {nextProducts ? (
        <>
          <div className={style.center}>
            <button className={style.add} onClick={loadMore}>
              Load More
            </button>
          </div>
          <br />
        </>
      ) : null}
    </>
  );
}

export default Home;
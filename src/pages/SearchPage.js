import style from "../css/home.module.css";
import Products from "../components/Products";
import toast, { Toaster } from "react-hot-toast";
function SearchPage({
  token,
  cartItems,
  setCartItems,
  products,
  setProducts,
  nextProducts,
  setNextProducts,
}) {
  const loadMore = async () => {
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

export default SearchPage;

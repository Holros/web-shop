import { useEffect, useState } from "react";
import style from "../css/products.module.css";
import { CartItems, Product } from "../projectTypes";
function Products({
  item,
  type,
  setType,
  setShow,
  setModalProductItem,
  addToCart,
  setCartItems,
  cartItems,
}: {
  item: Product;
  type?: string;
  setType?: React.Dispatch<React.SetStateAction<string>>;
  setShow?: React.Dispatch<React.SetStateAction<string>>;
  setModalProductItem?: React.Dispatch<React.SetStateAction<Product>>;
  addToCart?: boolean;
  setCartItems?: React.Dispatch<React.SetStateAction<CartItems[]>>;
  cartItems?: CartItems[];
}) {
  let check = item.id;
  const [isInCart, setIsInCart] = useState(false);
  useEffect(() => {
    if (cartItems) {
      const cartItemsId = cartItems.map((item) => item.id);
      if (cartItemsId.includes(check)) {
        setIsInCart(true);
      } else {
        setIsInCart(false);
      }
    }
  }, [cartItems, setIsInCart, check]);
  return (
    <div className={style.product}>
      <div className={style.image}>
        {<img src={item.thumbnail as string} alt="product" />}
      </div>
      <div className={style.card}>
        <div className={style.name_price}>
          <p>{item.name}</p>
          <p>{`£ ${item.price}`}</p>
        </div>
        <p className={style.desc}>{item.description}</p>
        <p>{new Date(item.updated_at).toDateString()}</p>
        {type && setType && setModalProductItem && setShow ? (
          <button
            onClick={() => {
              setType("edit");
              setModalProductItem(item);
              setShow("flex");
            }}
          >
            Edit
          </button>
        ) : null}
        {addToCart && setCartItems ? (
          isInCart ? (
            <button
              onClick={async () => {
                setCartItems((prev) =>
                  prev.filter((item) => item.id !== check)
                );
              }}
            >
              Remove From Cart
            </button>
          ) : (
            <button
              onClick={async () => {
                setCartItems((prev) => [
                  ...prev,
                  { name: item.name, price: item.price, id: item.id, isInCart },
                ]);
              }}
            >
              Add To Cart
            </button>
          )
        ) : null}
      </div>
    </div>
  );
}
export default Products;

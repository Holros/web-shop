import toast, { Toaster } from "react-hot-toast";
import style from "../css/cart.module.css";
import cancel from "../icons/icons8-cancel-50.png";
import deleted from "../icons/icons8-delete-16.png";
function Cart({ show, setShow, cartItems, setCartItems, token, setProducts }) {
  const pay = async () => {
    const toastId = toast.loading("Buying items");
    if (cartItems.length < 1) {
      toast.error("You've Not Added Any Product To Cart Yet", { id: toastId });
    } else {
      try {
        const response = await fetch(
          "https://elegantapp.pythonanywhere.com/api/shop/items/buy/",
          {
            method: "POST",
            headers: {
              Authorization: `Token ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(cartItems),
          }
        );
        const data = await response.json();
        if (response.ok) {
          {
            let response = await fetch(
              "https://elegantapp.pythonanywhere.com/api/shop/items/",
              {
                headers: {
                  Authorization: `Token ${token}`,
                },
              }
            );
            let data = await response.json();
            const { results } = data;
            setProducts(results);
          }
          toast.success("Items Brought Successfully", { id: toastId });
          setCartItems([]);
        }

        if (!response.ok) {
          toast.error(data[0].message, { id: toastId });
        }
      } catch (err) {
        toast.error("Something Went Wrong", { id: toastId });
      }
    }
  };
  return (
    <div
      style={{ display: show }}
      className={style.modal}
      onClick={() => {
        setShow("none");
        document.body.style.overflow = "auto";
      }}
    >
      <div className={style.cart} onClick={(e) => e.stopPropagation()}>
        <Toaster position="top-right" />
        <div className={style.head_cancel}>
          <p>Cart</p>
          <img
            src={cancel}
            alt="cancel"
            onClick={() => {
              setShow("none");
              document.body.style.overflow = "auto";
            }}
          />
        </div>
        <div className={style.content}>
          {cartItems.map((item) => (
            <div key={item.id} className={style.cartitem}>
              <p>{item.name}</p>
              <div className={style.price_delete}>
                <p>£{item.price}</p>
                <img
                  src={deleted}
                  alt="delete"
                  onClick={() => {
                    const itemToDelete = item.id;
                    setCartItems((prev) =>
                      prev.filter((item) => item.id !== itemToDelete)
                    );
                  }}
                />
              </div>
            </div>
          ))}
        </div>
        <div className={style.pay}>
          <button onClick={pay}>
            Pay £
            {cartItems.reduce((item, currentValue) => {
              return parseInt(item) + parseInt(currentValue.price);
            }, 0)}
          </button>
        </div>
      </div>
    </div>
  );
}
export default Cart;

import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { memo } from "react";
import { CartItems, Product } from "../projectTypes";

function Layout({
  isLoggedIn,
  setIsLoggedIn,
  cartItems,
  setCartItems,
  token,
  setToken,
  setProducts,
  setNextProducts,
}: {
  isLoggedIn: boolean,
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>,
  cartItems: CartItems[],
  setCartItems: React.Dispatch<React.SetStateAction<CartItems[]>>,
  token: string | null,
  setToken: React.Dispatch<React.SetStateAction<string | null>>,
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>,
  setNextProducts: React.Dispatch<React.SetStateAction<string | null>>,
}) {
  return (
    <>
      <Header
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        cartItems={cartItems}
        setCartItems={setCartItems}
        token={token}
        setToken={setToken}
        setProducts={setProducts}
        setNextProducts={setNextProducts}
      />
      <Outlet />
      <Footer />
    </>
  );
}
export default memo(Layout);

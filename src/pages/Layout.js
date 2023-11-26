import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { memo } from "react";

function Layout({
  isLoggedIn,
  setIsLoggedIn,
  cartItems,
  setCartItems,
  token,
  setToken,
  setProducts,
  setNextProducts,
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

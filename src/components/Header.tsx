import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import style from "../css/header.module.css";
import searchIcon from "../icons/icons8-search-50 (1).png";
import cartIcon from "../icons/icons8-cart-64.png";
import cancelIcon from "../icons/icons8-cancel-50.png";
import menuIcon from "../icons/icons8-menu-50 (1).png";
import Search from "./Search";
import { memo } from "react";
import toast, { Toaster } from "react-hot-toast";
import Cart from "./Cart";
import { CartItems, Product } from "../projectTypes";
function Header({
  isLoggedIn,
  setIsLoggedIn,
  cartItems,
  setCartItems,
  token,
  setToken,
  setProducts,
  setNextProducts,
}: {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  cartItems: CartItems[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItems[]>>;
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  setNextProducts: React.Dispatch<React.SetStateAction<string | null>>;
}) {
  const [searchVisibile, setSearchVisibile] = useState(false);
  const [show, setShow] = useState("none");
  const menu = useRef<HTMLDivElement | null>(null);
  const menuIcons = useRef<HTMLImageElement | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const showMenu = () => {
    if (menu.current && menuIcons.current && menu.current.style.display === "none") {
      menu.current.style.display = "flex";
      menuIcons.current.src = cancelIcon;
    } 
    else if(menu.current && menuIcons.current) {
      menu.current.style.display = "none";
      menuIcons.current.src = menuIcon;
    }
  };
  useEffect(() => {
    if (location.pathname === "/signup") {
      return;
    } else if (!isLoggedIn && location.pathname !== "/signin" && !token) {
      navigate("/signin");
      toast.error("You need to login");
    }
  }, [isLoggedIn, navigate, location.pathname, token]);
  return (
    <>
      <Toaster position="top-right" />
      <Search
        searchVisibile={searchVisibile}
        setSearchVisibile={setSearchVisibile}
        token={token}
        setProducts={setProducts}
        setNextProducts={setNextProducts}
        isLoggedIn={isLoggedIn}
      />
      <Cart
        show={show}
        setShow={setShow}
        cartItems={cartItems}
        setCartItems={setCartItems}
        token={token}
        setProducts={setProducts}
      />
      <div className={style.header}>
        <Link to="/" className={style.logo}>
          <p>Web Shop</p>
        </Link>
        <div className={style.nav}>
          {isLoggedIn ? (
            <>
              <Link to="/">Home</Link>
              <Link to="/item">My Items</Link>
              <Link to="/account">Account</Link>
              <Link
                to="/signin"
                onClick={() => {
                  setIsLoggedIn(false);
                  setCartItems([]);
                  setToken(null);
                  toast.success("Logged Out");
                }}
              >
                Logout
              </Link>
            </>
          ) : (
            <>
              <Link to="/">Home</Link>
              <Link to="/signin">Sign In</Link>
            </>
          )}
          <div>
            <img
              src={searchIcon}
              alt="search"
              onClick={() => setSearchVisibile(true)}
            />
          </div>
          <div
            style={{ position: "relative" }}
            onClick={() => {
              setShow("flex");
              document.body.style.overflow = "hidden";
            }}
          >
            <img src={cartIcon} alt="cart" />
            <div
              style={{
                position: "absolute",
                top: "-12px",
                backgroundColor: "#038C6E",
                borderRadius: "50%",
                height: "14px",
                width: "14px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "white",
                padding: "10px",
                fontSize: "0.9rem",
              }}
            >
              {cartItems.length}
            </div>
          </div>
        </div>
        <div className={style.altNav}>
          <div
            style={{ position: "relative" }}
            onClick={() => {
              setShow("flex");
              document.body.style.overflow = "hidden";
            }}
          >
            <img src={cartIcon} alt="cart" />
            <div
              style={{
                position: "absolute",
                top: "-12px",
                backgroundColor: "#038C6E",
                borderRadius: "50%",
                height: "14px",
                width: "14px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "white",
                padding: "10px",
                fontSize: "0.9rem",
              }}
            >
              {cartItems.length}
            </div>
          </div>
          <div className={style.dropdown}>
            <img src={menuIcon} ref={menuIcons} onClick={showMenu} alt="menu" />
            <div
              ref={menu}
              style={{ display: "none" }}
              className={style.dropdownContent}
              onClick={() => {
                if(menu.current && menuIcons.current){
                menu.current.style.display = "none";
                menuIcons.current.src = menuIcon;}
              }}
            >
              {isLoggedIn ? (
                <>
                  <Link to="/">Home</Link>
                  <Link to="/item">My Items</Link>
                  <Link to="/account">Account</Link>
                  <Link
                    to="/signin"
                    onClick={() => {
                      setIsLoggedIn(false);
                      setCartItems([]);
                      setToken(null);
                      toast.success("Logged Out");
                    }}
                  >
                    Logout
                  </Link>
                  <Link
                  to="#"
                    onClick={() => {
                      if (menu.current && menuIcons.current){
                      menu.current.style.display = "none";
                      menuIcons.current.src = menuIcon;}
                      setSearchVisibile(true);
                    }}
                  >
                    Search
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/">Home</Link>
                  <Link to="/signin">Sign In</Link>
                  <Link
                  to="#"
                    onClick={() => {
                      if(menu.current && menuIcons.current){
                      menu.current.style.display = "none";
                      menuIcons.current.src = menuIcon;}
                      setSearchVisibile(true);
                    }}
                  >
                    Search
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default memo(Header);

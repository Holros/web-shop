import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import "./css/index.css";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Account from "./pages/Account";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import Item from "./pages/Item";
import SearchPage from "./pages/SearchPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const value = localStorage.getItem("isLoggedIn");
    return value ? JSON.parse(value) : false;
  });
  const [token, setToken] = useState(() => {
    const value = localStorage.getItem("token");
    return value ? JSON.parse(value) : null;
  });
  const [products, setProducts] = useState([]);
  const [nextProducts, setNextProducts] = useState(null);
  const [cartItems, setCartItems] = useState(() => {
    const value = sessionStorage.getItem("cartItems");
    return value ? JSON.parse(value) : [];
  });

  useEffect(() => {
    localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);
  useEffect(() => {
    localStorage.setItem("token", JSON.stringify(token));
  }, [token]);
  useEffect(() => {
    sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
              cartItems={cartItems}
              setCartItems={setCartItems}
              token={token}
              setToken={setToken}
              setProducts={setProducts}
              setNextProducts={setNextProducts}
            />
          }
        >
          <Route
            index
            element={
              <Home
                token={token}
                cartItems={cartItems}
                setCartItems={setCartItems}
                products={products}
                setProducts={setProducts}
                nextProducts={nextProducts}
                setNextProducts={setNextProducts}
              />
            }
          />
          <Route
            path="/search"
            element={
              <SearchPage
                token={token}
                cartItems={cartItems}
                setCartItems={setCartItems}
                products={products}
                setProducts={setProducts}
                nextProducts={nextProducts}
                setNextProducts={setNextProducts}
              />
            }
          />
          <Route
            path="/signin"
            element={
              <SignIn setIsLoggedIn={setIsLoggedIn} setToken={setToken} />
            }
          />
          <Route
            path="/account"
            element={<Account token={token} setToken={setToken} />}
          />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/item" element={<Item token={token} />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

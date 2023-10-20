import React from "react";
import "./App.css";
import { Counter } from "./features/counter/Counter";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Cart from "./features/cart/Cart";
import CartPage from "./pages/CartPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/login",
    element: <LoginPage/>,
  },
  {
    path: "/signup",
    element: <SignupPage/>,
  },
  {
    path: "/cart",
    element: <CartPage/>,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;

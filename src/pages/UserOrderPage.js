import React from "react";
import Navbar from "../features/navbar/Navbar";
import UserOrders from "../features/user/component/UserOrders";

const UserOrderPage = () => {
  return (
    <>
      <Navbar>
        <UserOrders />
      </Navbar>
    </>
  );
};

export default UserOrderPage;

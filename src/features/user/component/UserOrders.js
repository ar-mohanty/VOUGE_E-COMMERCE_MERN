import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchLoggedInUserOrderAsync,
  selectUserInfo,
  selectUserOrders,
} from "../userSlice";
import {
  TruckIcon,
  ChevronDownIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";
import noResultFoundPng from "../../../assets/noresult.png";

export default function UserOrders() {
  const dispatch = useDispatch();
  const user = useSelector(selectUserInfo);
  const orders = useSelector(selectUserOrders);

  useEffect(() => {
    console.log(user);
    dispatch(fetchLoggedInUserOrderAsync(user.id));
    console.log("after dispatch");
  }, []);

  return (
    <>
      <div className="mx-auto w-screen h-full px-4 py-12 sm:px-6 lg:px-8 bg-white">
        <div className="order-wrapper border border-[#E5E7EB] rounded-md h-full">
          <div className="p-5 lg:py-16 lg:px-36">
            <h1 className="text-2xl lg:text-4xl font-bold pb-2">
              Order history
            </h1>
            <p className="text-md lg:text-md text-gray-500 font-normal">
              Check the status of recent orders, manage returns, and discover
              similar products.
            </p>
          </div>
          <div className="w-full pb-20 px-3 lg:px-36">
            {!orders.length ? (
              <div className="flex flex-col items-center">
                <h1 className="text-lg font-semibold">No orders found</h1>
                <img
                  src={noResultFoundPng}
                  alt="data-not-found"
                  className="h-48"
                />
                <Link to="/" className="text-blue-600 flex gap-x-2 items-end pt-5">
                  Continue Shopping
                  <ArrowRightIcon className="w-5 h-5"/>
                </Link>
              </div>
            ) : (
              orders?.map((order) => (
                <div className="flex flex-col justify-evenly items-center w-full border border-[#E5E7EB] rounded-md mt-5 shadow-sm">
                  <div className="flex justify-between text-center gap-5 lg:gap-36 border-b border-b-[#E5E7EB] w-full py-4 px-10">
                    <p className="flex flex-col gap-1">
                      <span className="text-xs lg:text-md font-semibold uppercase">
                        Order Number
                      </span>
                      <span className="text-sm lg:text-lg">#{order.id}</span>
                    </p>
                    <p className="flex flex-col gap-1">
                      <span className="text-xs lg:text-md font-semibold uppercase">
                        Total Items
                      </span>
                      <span className="text-sm lg:text-lg">
                        {order.totalItems}
                      </span>
                    </p>
                    <p className="flex flex-col gap-1">
                      <span className="text-xs lg:text-md font-semibold uppercase">
                        Total Amount
                      </span>
                      <span className="text-sm lg:text-lg">
                        $ {order.totalAmount}
                      </span>
                    </p>
                    <p className="flex flex-col gap-1">
                      <span className="text-xs lg:text-md font-semibold uppercase ">
                        Shipping to
                      </span>
                      <span className="text-sm lg:text-lg">
                        <Link
                          to="#"
                          className="flex gap-x-3 items-center"
                          data-tooltip-id="my-tooltip"
                          data-tooltip-content={`${order.selectedAddress.street} ${order.selectedAddress.city}, ${order.selectedAddress.state}-${order.selectedAddress.pincode}`}
                        >
                          {order.selectedAddress.name}
                          <ChevronDownIcon className="w-4 h-4" />
                        </Link>
                        <Tooltip id="my-tooltip" place="bottom" />
                      </span>
                    </p>
                  </div>
                  {order?.items.map((item) => (
                    <div className="py-10 flex flex-col lg:flex-row justify-start gap-5 w-full px-10 border border-[#E5E7EB]">
                      <div className="flex flex-col items-start gap-5">
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="w-36 h-36 rounded-md object-cover"
                        />
                        <p className="text-gray-400 capitalize flex items-center gap-5">
                          <TruckIcon className="w-6 h-6 text-yellow-500" />
                          {order.status}
                        </p>
                      </div>
                      <div className="flex-1">
                        <p className="flex justify-between font-medium text-lg">
                          <span>{item.title}</span>
                          <span>
                            ${" "}
                            {Math.round(
                              item.price * (1 - item.discountPercentage / 100)
                            )}
                          </span>
                        </p>
                        <p className="text-gray-500 pt-5 text-md font-normal">
                          {item.description}
                        </p>
                        <div className="flex justify-end mt-10 lg:mt-16">
                          <Link
                            to={`/product-detail/${item.id}`}
                            className="text-blue-800 hover:underline"
                          >
                            View Product
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}

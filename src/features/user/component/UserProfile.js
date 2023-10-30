import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUserInfo, updateUserAsync } from "../userSlice";
import UserEditModal from "./UserEditModal";

export default function UserProfile() {
  const [modalOpen, setModalOpen] = useState(false);
  const [index, setIndex] = useState(null);
  const dispatch = useDispatch();
  const user = useSelector(selectUserInfo);
  const [updatedUser, setUpdatedUser] = useState(user);
  const openModal = (e, index) => {
    setIndex(index);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleRemove = (e, index) => {
    const newUser = { ...user, addresses: [...user.addresses] };
    newUser.addresses.splice(index, 1);
    dispatch(updateUserAsync(newUser));
  };

  const handleNewUser = (newUser) => {
    // Do something with the newUser data in your parent component
    console.log("New User Data:", newUser);
    setUpdatedUser(newUser);
  };

  return (
    <>
      <UserEditModal
        modalOpen={modalOpen}
        setOpen={closeModal}
        index={index}
        onNewUser={handleNewUser}
      />
      <div className="bg-white m-8 p-6 lg:p-12 lg:m-24">
        <div className="px-4 sm:px-0">
          <h3 className="text-2xl font-bold leading-7 text-gray-900">
            Profile Information
          </h3>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
            manage your profile information at one place.
          </p>
        </div>
        <div className="mt-6 border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Full name
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {updatedUser.addresses[0].name}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Email Id
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {updatedUser.email}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Mobile Number
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {updatedUser.addresses[0].phone}
              </dd>
            </div>
            {updatedUser.addresses.map((address, index) => (
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Address #{index + 1}
                </dt>
                <dd className="flex gap-6 lg:gap-12 mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <span>
                    {address.street},<br /> {address.city}, {address.state} -{" "}
                    {address.pincode}, {address.country}
                  </span>
                  <span className="flex gap-5">
                    <button
                      onClick={(e) => openModal(e, index)}
                      className="text-blue-500"
                    >
                      Edit
                    </button>
                    <button
                      onClick={(e) => handleRemove(e, index)}
                      className="text-red-500"
                    >
                      Remove
                    </button>
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </>
  );
}

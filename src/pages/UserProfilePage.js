import React from 'react'
import Navbar from '../features/navbar/Navbar'
import UserProfile from '../features/user/component/UserProfile'

const UserProfilePage = () => {
  return (
    <Navbar>
      <UserProfile/>
    </Navbar>
  )
}

export default UserProfilePage
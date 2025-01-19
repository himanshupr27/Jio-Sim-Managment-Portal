import React, { Fragment, useState,useEffect } from 'react'
import "@/css/UserProfileInfo.css"
import { useSelector } from 'react-redux'
import { FaUser } from "react-icons/fa";
import Loader from '../layouts/Loader';

const UserProfileInfo = () => {
  const userDetails = useSelector(((state) => state.auth.user));
  const[isloading,setLoading]=useState(true);
  console.log(userDetails);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);
  return (
    <Fragment>
      {
      isloading ? <Loader/>  : 
      <div className='profile-section'>
        <div className='upper-section-profile'>
          <FaUser />
          <h1>{userDetails.usersName}</h1>
        </div>
        <hr className='profile-section-hr' />
        <div className='lower-section-profile'>
          <div className="contact-details">
            <p>Phone Number<h6>{userDetails.phoneNumber}</h6></p>
            <p>Email Id<h6>{userDetails.emailId}</h6></p>
          </div>
          <p>Adddress<h6> - </h6></p>
        </div>
        <button type='button' className='update'>Update Details</button>
      </div>}
     


    </Fragment>
  )
}

export default UserProfileInfo

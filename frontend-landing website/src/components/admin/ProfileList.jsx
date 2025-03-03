import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loader from "../layouts/Loader"


const ProfileList = ({ contentType }) => {
    const [profiledata, setProfileData] = useState();
    const [isloading, setIsloading] = useState(true);
    useEffect(() => {
      const getorders = async () => {
        try {
          setIsloading(true);
          let response = null;
          if (contentType === 10) {
            response = await axios.get("http://localhost:2705/api/user/profile/get/all");
          }
          if (response) {
            setProfileData(response.data);
          }
          const timer = setTimeout(() => {
            setIsloading(false);
          }, 500);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
      getorders();
  
    }, [contentType]);
    console.log(profiledata);
  return (
    <>
      {isloading ? <Loader /> :
        <div className="show-all-sims">
          <h1>Total Number Of Order's : </h1>
          <hr></hr>
          <h4>List Of All Orders's : -</h4>
          <table>
            <tr>
              <th>Id</th>
              <th>Authority Name</th>
              <th>Date Of Birth</th>
              <th>Gender</th>
              <th>Phone Number</th>
              <th>Address</th>
              <th>Sim Id</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
            {profiledata && profiledata.map((data) => (
              <tr key={data.id}>
                <td>{data.id}</td>
                <td>{data.fullName}</td>
                <td>{data.dob}</td>
                <td>{data.gender}</td>
                <td>{data.phoneNumber}</td>
                <td>{data.address
                  ? `${data.address.street}, ${data.address.city}, ${data.address.state}, ${data.address.country}, ${data.address.postalCode}`
                  : "No address provided"}</td>
                <td>{data.sim_id ? data.sim_id : '-'}</td>
                <td><button type='button' className='edit'>Edit</button></td>
                <td><button type='button' className='delete'>Delete</button></td>
              </tr>
            ))}
          </table>
          <div>Pagination</div>
        </div>
      }
    </>
  )
}

export default ProfileList

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loader from "../layouts/Loader";

const ProfileList = ({ contentType }) => {
  const [profileData, setProfileData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getProfiles = async () => {
      try {
        setIsLoading(true);
        let response = null;
        if (contentType === 10) {
          response = await axios.get("http://localhost:2705/api/user/profile/get/all");
        }
        if (response) {
          setProfileData(response.data);
          console.log(response.data);
        }
        setTimeout(() => setIsLoading(false), 500);
      } catch (error) {
        console.error('Error fetching profiles:', error);
      }
    };
    getProfiles();
  }, [contentType]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="show-all-sims">
          <h1>Total Number Of Profiles: {profileData.length}</h1>
          <hr />
          <h4>List Of All Profiles:</h4>
          <table>
            <thead>
              <tr>
                <th>Profile ID</th>
                <th>Name</th>
                <th>Date Of Birth</th>
                <th>Gender</th>
                <th>Email ID</th>
                <th>Address</th>
                <th>User ID</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {profileData.map((data) => (
                <tr key={data.id}>
                  <td>{data.id}</td>
                  <td>{`${data.firstName} ${data.lastName}`}</td>
                  <td>{data.dob}</td>
                  <td>{data.gender}</td>
                  <td>{data.email_id}</td>
                  <td>
                    {`${data.address.street},${data.address.state}, ${data.address.city}, ${data.address.country}, ${data.address.postalCode}`}
                  </td>
                  <td>{data.user_id}</td>
                  <td><button type="button" className="edit">Edit</button></td>
                  <td><button type="button" className="delete">Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>Pagination</div>
        </div>
      )}
    </>
  );
};

export default ProfileList;

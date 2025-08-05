import Pagination from "react-js-pagination";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Cookies from "universal-cookie";
import Loader from "../layouts/Loader";

const cookies = new Cookies();

const roleMap = {
  1: "Admin",
  2: "User",
  3: "Database"
};

const UserList = () => {
  const [userdata, setUserData] = useState(null);
  const [editbox, setEditbox] = useState(null);
  const [reload, setReload] = useState(false);
  const [isloading, setIsloading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  const [edituser, setEditUser] = useState({
    aadharNumber: "",
    phoneNumber: "",
    roleId: "",
  });

  useEffect(() => {
    async function call() {
      try {
        setIsloading(true);
        const response = await axios.get(`http://localhost:2705/api/user/getallDetails?PageSize=10&PageNumber=${currentPage}`, {
          headers: {
            Authorization: `Bearer ${cookies.get('jwt')}`,
          },
        });
        setUserData(response.data);
        console.log(response.data);
        setIsloading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    call();
  }, [reload, currentPage]);

  const deleteSim = async (id) => {
    if (!window.confirm(`Are you sure you want to delete the user with id: ${id}?`)) return;
    try {
      await axios.delete(`http://localhost:2705/api/user/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${cookies.get('jwt')}`,
        },
      });
      setReload(!reload);
    } catch (error) {
      console.error("Error deleting user:", error.response ? error.response.data : error.message);
    }
  };

  const editSim = (id) => {
    setEditbox(id);
    const user = userdata.content.find(u => u.id === id);
    if (user) {
      setEditUser({
        aadharNumber: user.aadharNumber || "",
        phoneNumber: user.phoneNumber || "",
        roleId: user.roleId || "",
      });
    }
  };

  function handleInput(e) {
    const { name, value } = e.target;
    setEditUser({
      ...edituser,
      [name]: name === "phoneNumber" ? value.replace(/[^0-9]/g, '') : value,
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:2705/api/user/update/${editbox}`, edituser, {
        headers: {
          Authorization: `Bearer ${cookies.get('jwt')}`,
        },
      });
      setEditbox(null);
      setReload(!reload);
    } catch (error) {
      console.error("Error updating user:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <>
      {isloading ? <Loader /> :
        <div className="show-all-users">
          <h1>Total Number Of Users:</h1>
          <hr />
          <h4>List Of All Users:</h4>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Aadhar Number</th>
                <th>Phone Number</th>
                <th>Role</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {userdata && userdata.content.map(data => (
                <tr key={data.id}>
                  <td>{data.id}</td>
                  <td>{data.aadharNumber}</td>
                  <td>{data.phoneNumber}</td>
                  <td>{roleMap[data.role_id] || "Unknown"}</td>
                  <td><button className="edit" onClick={() => editSim(data.id)}>Edit</button></td>
                  <td><button className="delete" onClick={() => deleteSim(data.id)}>Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>

          {userdata && (
            <div className='pagination-box'>
              <Pagination
                activePage={userdata.pageNumber + 1}
                itemsCountPerPage={userdata.pageSize}
                totalItemsCount={userdata.totalElements}
                onChange={(e) => setCurrentPage(e - 1)}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}

          <div className="edit-box" style={editbox === null ? { display: 'none' } : {}}>
            <div className="edit-container">
              <form onSubmit={handleSubmit}>
                <label htmlFor="aadharNumber">Aadhar Number</label>
                <input
                  type="text"
                  id="aadharNumber"
                  name="aadharNumber"
                  maxLength="12"
                  required
                  value={edituser.aadharNumber}
                  onChange={handleInput}
                />

                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  maxLength="10"
                  required
                  value={edituser.phoneNumber}
                  onChange={handleInput}
                />

                <label htmlFor="roleId">Role</label>
                <select
                  id="roleId"
                  name="roleId"
                  required
                  value={edituser.roleId}
                  onChange={handleInput}
                >
                  <option value="">Select Role</option>
                  <option value="1">Admin</option>
                  <option value="2">User</option>
                  <option value="3">Database</option>
                </select>

                <div className="buttons">
                  <button type="submit" className="submit-btn">Submit</button>
                  <button type="reset" className="reset-btn">Reset</button>
                  <button type="button" className="cancel-btn" onClick={() => setEditbox(null)}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        </div>}
    </>
  );
};

export default UserList;

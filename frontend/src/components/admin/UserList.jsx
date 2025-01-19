import Pagination  from "react-js-pagination";;
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Cookies from "universal-cookie";
import Loader from "../layouts/Loader"
const cookies = new Cookies();
const UserList = () => {
    const [userdata, setUserData] = useState(null);
    const [editbox ,setEditbox] = useState(null);
    const [reload ,setReload] = useState(false);
    const [isloading ,setIsloading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const [edituser, setEditUser] = useState({
      usersName: "",
      emailId: "",
      phoneNumber: "",
      password:"Hp27052002#"
    });

    useEffect(() => {
        async function call() {
          try {
            setIsloading(true);
            const response = await axios.get("http://localhost:2705/api/user/getallDetails?PageSize=10&PageNumber=0", {
              headers: {
                Authorization: `Bearer ${cookies.get('jwt')}`, // Your JWT token
              },
            });
            setUserData(response.data);
            setIsloading(false);
            console.log(response.data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        }
    
        call();
      }, [reload]);



      const deleteSim= async(id)=>{
        alert(`Are you sure you want to delete the user with id : ${id}`);
        console.log(id);
        try {      
          const result = await axios.delete(`http://localhost:2705/api/user/delete/${id}`, {
            headers: {
              Authorization: `Bearer ${cookies.get('jwt')}`,
            },
          });
          console.log(result.data); 
          setReload(!reload);
        } catch (error) {
          console.error("Error deleting user:", error.response ? error.response.data : error.message);
        }
      };


      const editSim=(id)=>{
        setEditbox(id);
      };

      function handleInput(e) {
        let name = e.target.name;
        let value = e.target.value;
        if (name === 'phoneNumber') {
          value = value.replace(/[^0-9]/g, '');
        }
        setEditUser({
          ...edituser,
          [name]: value,
        });
      }
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {      
          const result = await axios.put(`http://localhost:2705/api/user/update/${editbox}`, edituser, {
            headers: {
              Authorization: `Bearer ${cookies.get('jwt')}`, // Ensure JWT token is available
            },
          });
          console.log(result.data);
          setEditbox(null); 
          setReload(!reload);
        } catch (error) {
          console.error("Error updating user:", error.response ? error.response.data : error.message);
        }
      };
      const setCurrentPageNo = () => {
        setCurrentPage(2);
    };
      
  return (
    <>
    {isloading ?<Loader/> :
    
    <div className="show-all-users">
      <h1>Total Number Of Users : </h1>
      <hr></hr>
      <h4>List Of All Users : -</h4>
      <table>
        <tr>
          <th>Id</th>
          <th>Authority Name</th>
          <th>Email Address</th>
          <th>Role</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
        {userdata && userdata.content.map((data)=>(
          <tr key={data.id}>
          <td>{data.id}</td>
          <td>{data.fullName}</td>
          <td>{data.emailId}</td>
          <td>{data.role_id}</td>
          <td><button type='button' className='edit' onClick={()=>editSim(data.id)} >Edit</button></td>
          <td><button type='button' className='delete' onClick={()=>deleteSim(data.id)}>Delete</button></td>
        </tr>
        ))}
        </table>
  
  {userdata ?<div className='pagination-box'>
        <Pagination
                              activePage={userdata.pageNumber+1}
                              itemsCountPerPage={userdata.pageSize}
                              totalItemsCount={userdata.totalElements}
                              onChange={setCurrentPageNo}
                              nextPageText="Next"
                              prevPageText="Prev"
                              firstPageText="1st"
                              lastPageText="Last"
                              itemClass="page-item"
                              linkClass="page-link"
                              activeClass="pageItemActive"
                              activeLinkClass="pageLinkActive"
                          />
        </div> :''}
        
  
  
        {/* lastPage: false
  pageNumber: 0
  pageSize: 5
  totalElements: 14
  totalpages: 3 */}
  
  
        <div className="edit-box"  style={editbox === null ? { display: 'none' } : {}}>
          <div className="edit-container">
            <form onSubmit={handleSubmit}>
  
              <lable for="name">Name </lable>
              <input id="name" type="text" name='usersName' placeholder='Username' value={edituser.usersName} onChange={handleInput}  />
  
              <lable for="emali-id">Email Id </lable>
              <input id="emali-id" type="email" name='emailId' placeholder='Email Id' value={edituser.emailId} onChange={handleInput} />
  
              <lable for="phonenumber">Phone Number</lable>
              <input id="phonenumber" type="tel" name='phoneNumber' placeholder='Phone NO.' inputMode="numeric" maxLength="10" pattern="\d{10}" required value={edituser.phoneNumber} onChange={handleInput}/>
  
              <div className="buttons">
              <button type='submit'className='submit-btn'>Submit</button>
              <button type='reset'className='reset-btn'>Reset</button>
              <button type='button'className='cancle-btn' onClick={()=>{setEditbox(null)}}>Cancle</button>
              </div>
            </form>
          </div>
  
        </div>
      </div>}
    </>
    
  )
}

export default UserList

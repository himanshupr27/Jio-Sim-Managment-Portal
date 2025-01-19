import axios from 'axios'
import React, { useEffect, useState } from 'react'
import "@/css/AdminDashboard.css";
import { FaAngleDown } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UserList from './UserList';
import SimList from './SimList';
import OrderList from './OrderList';
import ProfileList from './ProfileList';
import EkycList from './EkycList';

const AdminDashboard = () => {

  // var userName = useSelector(((state)=>state.auth.user.usersName));


  const [userCollapse, setUserCollapse] = useState(false);
  const [simCollapse, setSimCollapse] = useState(true);
  const [ordersCollapse, setOrdersCollapse] = useState(true);
  const [profileCollapse, setProfileCollapse] = useState(true);
  const [ekycCollapse, setEkycsCollapse] = useState(true);
  const [content, setContent] = useState(1);
  const [user, setUser] = useState({});


  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('user')));
  }, [])
  // var userName = user.fullName;
  // userName =userName.charAt(0).toUpperCase() +userName.slice(1);


  return (
    <div className='admin-dashboard'>
      <div className="admin-nav-bar">
        <h2>Welcome Admin</h2>
        <div class="nav-item dropdown logdedin">
          <button class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-person-fill me-3" viewBox="0 0 16 16" >
              <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
            </svg>
            {user.fullName}
          </button>
          <ul class="dropdown-menu">
            <li><Link class="dropdown-item" to="/user/profile-info">My Profile</Link></li>
            <li><hr class="dropdown-divider m-0" /></li>
            <li><Link class="dropdown-item logout" to="/login" 
            // onClick={() => { dispatch(logOut()) }}
            >Logout</Link></li>
          </ul>
        </div>
      </div>
      <div className="admin-dashboard-container">

        <div className="side-nav-panel">

          <ul className='side-nav-content'>

            <li className={`${userCollapse ? '' : 'backgd-color'}`} >
              <span onClick={() => { setUserCollapse(!userCollapse) }}>
                <FaAngleDown className={`${userCollapse ? 'arrow-rotate' : 'noarrow-rotate'}`} /> Users
              </span>
              <ul className={`side-nav-content-details ${userCollapse ? 'collappse' : ''}`}>
                <li className={`${content === 1 ? 'content-selected' : ''}`} onClick={() => { setContent(1) }}>Show All Users</li>
              </ul>
            </li>


            <li className={`${simCollapse ? '' : 'backgd-color'}`} >
              <span onClick={() => { setSimCollapse(!simCollapse) }}><FaAngleDown className={`${simCollapse ? 'arrow-rotate' : 'noarrow-rotate'}`} /> SIM's
              </span>
              <ul className={`side-nav-content-details ${(simCollapse && (content !== 2 || content !== 3 || content !== 4 || content !== 5)) ? 'collappse' : ''}`}>
                <li className={`${content === 2 ? 'content-selected' : ''}`} onClick={() => { setContent(2) }}>Avaliable SIM,s</li>
                <li className={`${content === 3 ? 'content-selected' : ''}`} onClick={() => { setContent(3) }}>Active SIM,s</li>
                <li className={`${content === 4 ? 'content-selected' : ''}`} onClick={() => { setContent(4) }}>Inactive SIM,s</li>
                <li className={`${content === 5 ? 'content-selected' : ''}`} onClick={() => { setContent(5) }}>All SIM,s</li>
              </ul>
            </li>


            <li className={`${ordersCollapse ? '' : 'backgd-color'}`} >
              <span onClick={() => { setOrdersCollapse(!ordersCollapse) }}><FaAngleDown className={`${ordersCollapse ? 'arrow-rotate' : 'noarrow-rotate'}`} />
                Orders's</span>
              <ul className={`side-nav-content-details ${(ordersCollapse && (content !== 6 || content !== 7 || content !== 8 || content !== 9)) ? 'collappse' : ''}`}>
                <li className={`${content === 6 ? 'content-selected' : ''}`} onClick={() => { setContent(6) }}>Aproval Pending</li>
                <li className={`${content === 7 ? 'content-selected' : ''}`} onClick={() => { setContent(7) }}>eKYC Pending</li>
                <li className={`${content === 8 ? 'content-selected' : ''}`} onClick={() => { setContent(8) }}>All orders</li>
                <li className={`${content === 9 ? 'content-selected' : ''}`} onClick={() => { setContent(9) }}>Delivered orders</li>
              </ul>
            </li>


            <li className={`${profileCollapse ? '' : 'backgd-color'}`} >
              <span onClick={() => { setProfileCollapse(!profileCollapse) }}><FaAngleDown className={`${profileCollapse ? 'arrow-rotate' : 'noarrow-rotate'}`} />
                Profile's</span>
              <ul className={`side-nav-content-details ${(profileCollapse && content !== 10) ? 'collappse' : ''}`}>
                <li className={`${content === 10 ? 'content-selected' : ''}`} onClick={() => { setContent(10) }}>All Profiles</li>
              </ul>
            </li>


            <li className={`${ekycCollapse ? '' : 'backgd-color'}`} >
              <span onClick={() => { setEkycsCollapse(!ekycCollapse) }}><FaAngleDown className={`${ekycCollapse ? 'arrow-rotate' : 'noarrow-rotate'}`} />
                eKYC</span>
              <ul className={`side-nav-content-details ${(ekycCollapse && (content !== 11 || content !== 12 || content !== 13 || content !== 14)) ? 'collappse' : ''}`}>
                <li className={`${content === 11 ? 'content-selected' : ''}`} onClick={() => { setContent(11) }}>Aproval Pending</li>
                <li className={`${content === 12 ? 'content-selected' : ''}`} onClick={() => { setContent(12) }}>eKYC Pending</li>
                <li className={`${content === 13 ? 'content-selected' : ''}`} onClick={() => { setContent(13) }}>All eKYCs</li>
                <li className={`${content === 14 ? 'content-selected' : ''}`} onClick={() => { setContent(14) }}>Completed eKYC</li>
              </ul>
            </li>


          </ul>

        </div>

        {/* content */}
        <div className='admin-content'>
          {content === 1 ? <UserList /> : <></>}
          {content === 2 ? <SimList contentType={content} /> : null}
          {content === 3 ? <SimList contentType={content} /> : null}
          {content === 4 ? <SimList contentType={content} /> : null}
          {content === 5 ? <SimList contentType={content} /> : null}
          {content === 6 ? <OrderList contentType={content} /> : <></>}
          {content === 7 ? <OrderList contentType={content} /> : <></>}
          {content === 8 ? <OrderList contentType={content} /> : <></>}
          {content === 9 ? <OrderList contentType={content} /> : <></>}
          {content === 10 ? <ProfileList contentType={content} /> : <></>}
          {content === 11 ? <EkycList contentType={content} /> : <></>}
          {content === 12 ? <EkycList contentType={content} /> : <></>}
          {content === 13 ? <EkycList contentType={content} /> : <></>}
          {content === 14 ? <EkycList contentType={content} /> : <></>}



        </div>
      </div>
    </div>
  )
}

export default AdminDashboard

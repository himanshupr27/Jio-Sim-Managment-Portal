import React, { useEffect, useState } from 'react';
import {useNavigate } from 'react-router-dom';
import "../../css/TrackOrder.css";
const TrackOrder = () => {
  const[profile,setProfile]=useState({});
    const navigate = useNavigate();
  useEffect(()=>{
    setProfile(JSON.parse(localStorage.getItem('profile')));
  },[]);
  return (
    <div className='track-container'>
      <div className="image-box">
      <img src='../Images/Payment/pngwing.com.png'/>
      </div>
      <h2 className='track-heading'>Congratulation {profile.fullName} Your Application is successfully submited</h2>
      <p className='application-id'>Your Application Id is:<span>{profile.id}</span></p>
      <div className="content-status">
      <div className="application-status">
      <h5>Your Application Status :</h5>
      <table>
        <tr>
          <th>Steps</th>
          <th>Status</th>
        </tr>
        <tr>
          <td>Enrolment</td>
          <td className='sucess'><span>Completed</span></td>
        </tr>
        <tr>
          <td>Payment</td>
          <td className='sucess'><span>Completed</span></td>
        </tr>
        <tr>
          <td>Order Details</td>
          <td className='sucess'><span>Completed</span></td>
        </tr>
        <tr>
          <td>Kyc Details</td>
          <td className='sucess'><span>Completed</span></td>
        </tr>
        <tr>
          <td>Video Kyc</td>
          <td className='sucess'><span>Completed</span></td>
        </tr>
        <tr>
          <td>Kyc Aproval</td>
          <td className='pending'><span>Pending</span></td>
        </tr>
        <tr>
          <td>Order Dispatch</td>
          <td className='pending'><span>Pending</span></td>
        </tr>
        </table>      
      </div>
      <div className="note">
        <h5 style={{color:'#00004C'}}>Note:</h5>
        <p>Once the kyc aprovel is done the overd will be ready to dispatch and will be dilevered in 7 working days.</p>
      </div>
      </div>
      <div className="btn-box"> 
      <button onClick={()=>{
        navigate('/')
      }}>Home Page</button>
      </div>
        
    </div>
  )
}

export default TrackOrder

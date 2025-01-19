import React, { useEffect, useState } from 'react';
import {useNavigate } from 'react-router-dom';
import "@/css/PaymentSucess.css";

const PymentSucess = () => {
    const navigate = useNavigate();
    const [paymentData,setPaymentData]=useState({});
    const [orderDetails,setOrderDetails]= useState({});
    const [profiledetails,setProfiledetails]= useState({});
    const [user, setUser] = useState({
      fullName: '',
      mobilenumber: ''
  })
    useEffect(()=>{
        setUser(JSON.parse(localStorage.getItem('pki-users')));
        setPaymentData(JSON.parse(localStorage.getItem("payment")));
        setOrderDetails(JSON.parse(localStorage.getItem('orders')));
        setProfiledetails(JSON.parse(localStorage.getItem('profile')));
    },[])
  return (
    <div className='payment-box'>
      <img src='../Images/Payment/pngwing.com.png'/>
      <h1 className='thankyou-heading'>Thank You {user.fullName}</h1>
      <h3 className='payment-tag'>Your Payment towards</h3>
      <h4 className='payment-sucessfull'>Class 2 PKI- SIM for 2 year is successful for {profiledetails.fullName}</h4>
      <p>Please find your payment details below</p>
      <table className='payment-details-table'>
        <tr>
          <th>Amount</th>
          <th>Order Id</th>
          <th>Payment Id</th>
          <th>Order Status</th>
        </tr>
        <tr>
          <td>{orderDetails.amount}</td>
          <td>{paymentData.order_id}</td>
          <td>{paymentData.payment_id}</td>
          <td>KYC Pending</td>
        </tr>
      </table>
      <p className='proceed-para'>Please click on Proceed to continue the verification process of PKI-SIM.</p>
      <button className='btn-proceed' onClick={()=>{navigate('/e-kyc')}}>Proceed To KYC</button>
    </div>
  )
}

export default PymentSucess

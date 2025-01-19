import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loader from "../layouts/Loader"


const OrderList = ({ contentType }) => {
  const [orderdata, setOrderData] = useState();
  const [isloading, setIsloading] = useState(true);
  useEffect(() => {
    const getorders = async () => {
      try {
        setIsloading(true);
        let response = null;
        if (contentType === 6) {
          response = await axios.get("http://localhost:2705/api/order/get_By_status?status=APROVAL PENDING");
        } else if (contentType === 7) {
          response = await axios.get("http://localhost:2705/api/order/get_By_status?status=KYC PENDING");
        } else if (contentType === 8) {
          response = await axios.get("http://localhost:2705/api/order/get_all_ordes");
        } else if (contentType === 9) {
          response = await axios.get("http://localhost:2705/api/order/get_By_status?status=DELIVERED");
        }
        if (response) {
          setOrderData(response.data);
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
  console.log(orderdata);

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
              <th>Order Status</th>
              <th>Order Date</th>
              <th>Delivery Date</th>
              <th>Razorpay Id</th>
              <th>Amount</th>
              <th>Address</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
            {orderdata && orderdata.map((data) => (
              <tr key={data.id}>
                <td>{data.id}</td>
                <td>{data.orderStatus}</td>
                <td>{data.orderDate}</td>
                <td>{data.deliveryDate ? data.deliveryDate : '-'}</td>
                <td>{data.razorpayId}</td>
                <td>{data.amount}</td>
                <td>{data.deliveryAddress
                  ? `${data.deliveryAddress.street}, ${data.deliveryAddress.city}, ${data.deliveryAddress.state}, ${data.deliveryAddress.country}, ${data.deliveryAddress.postalCode}`
                  : "No address provided"}</td>
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

export default OrderList

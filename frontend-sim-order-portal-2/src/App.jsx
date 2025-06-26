import React from 'react';
// import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Loader from './components/layouts/Loader';
import Footer from './components/page/Footer';
import Navbar  from './components/page/Navbar';
import OrderLogin from './components/orders/OrderLogin.jsx';
import OrderDetails from './components/orders/OrderDetails.jsx';
import PaymentSucess from './components/orders/PymentSucess.jsx';
import Order from './components/page/Order.jsx';

function App() {
  const router = createBrowserRouter([
    {
      path: "/order",
      element: <><Navbar /><Order /><Footer/></>,
    },
    {
      path: "/loader",
      element: <><Navbar /><Loader /></>,
    },
    {
      path: "/payment_sucessfull",
      element: <><Navbar /><PaymentSucess/><Footer/></>,
    },
    {
      path: "/sim/order",
      element: <><Navbar/><OrderLogin/><Footer/></>,
    },
    {
      path: "/sim/order/details",
      element: <><Navbar/><OrderDetails/><Footer/></>,
    },
  ]);


  
  return (
    <RouterProvider router={router} />
  )
}

export default App

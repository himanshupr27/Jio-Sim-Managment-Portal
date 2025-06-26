import React from 'react'
import "../../css/OrderLanding.css";
import { useNavigate } from 'react-router-dom';
import Accordion from './Accordion';
const Order = () => {
    const navigate = useNavigate();

    const handelOrderNow = () => {
        navigate('/sim/order')
    }
    return (
        <>
            <div className="order-intro">
                <div className="order-intro-content">
                    <div className='order-heading'>Get your new Jio PKI SIM activated effortlessly, all from the comfort of your home.</div>
                    <div className='order-content'>As this process requires taking a live photo/video and uploading documents for self-KYC, please switch to a mobile device. You may scan the QR Code to proceed.</div>
                    <button className='order-btn' onClick={handelOrderNow}>
                        Order Now
                    </button>
                </div>
                <div className="order-intro-qr-image">
                    <img className='qr-back-img' src="Images/Order/qr-back.jpg" alt="" srcset="" />
                    <div className="qr-container">
                        <div className="sim-card">
                            <div className="header">
                                <h3>Get Jio PKI SIM</h3>
                            </div>
                            <div className="qr-code">
                                <img src="Images/Order/images.png" alt="QR Code" />
                            </div>
                            <div className="footer-qr">
                                <p>SCAN THIS QR CODE TO START ACTIVATION OF YOUR SIM</p>
                                <div className="logo">
                                    <img src="Images/jio_logo.png" alt="Jio Logo" />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div className="faq-questions">
                <h1>FAQ about Jio PKI SIM card</h1>
            <Accordion/>
            </div>

        </>
    )
}

export default Order

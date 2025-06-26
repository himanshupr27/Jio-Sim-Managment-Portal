import React, { useState } from 'react'
import "../../css/Orders.css";
import { RxCrossCircled } from "react-icons/rx";
import { useNavigate } from 'react-router-dom';
import 'react-phone-input-2/lib/style.css'
import OtpInput from 'otp-input-react';
import PhoneInput from 'react-phone-input-2';
import axios from 'axios';
import Carousel from 'react-material-ui-carousel/dist/components/Carousel';
const items = [
    {
        name: "Verify your identity",
        image: "/Images/Order/S-2.webp"
    },
    {
        name: "Complete Online purchase",
        image: "/Images/Order/S-1.png"
    },
    {
        name: "Your PKI-SIM is ready to dispatch",
        image: "/Images/Order/S-3.webp"
    },
];
const Signin = () => {

    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [OTP, setOTP] = useState("");
    const [generateOtp, setGenerateOtp] = useState(0);
    const [otpbox, setOtpbox] = useState(false);
    const [otpError, setOtpError] = useState(false);
    const [newUser, setNewUser] = useState({
        aadharNumber: '',
        phoneNumber: ''
    });
    const [currentIndex, setCurrentIndex] = useState(0);
    const [phoneLabel, setPhoneLabel] = useState(false);
    const handleChange = (now, previous) => {
        setCurrentIndex(now);
    };

  const handleInput = (e) => {
    const { name, value } = e.target || {};
    setNewUser(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({
      ...prev,
      [name]: value ? "" : "true"
    }));
  };

    const generateOtpCode = () => {
        const newOtp = Math.floor(100000 + Math.random() * 900000);
        setGenerateOtp(newOtp);
        alert(`The OTP for login is ${newOtp}`);

    };


    const handleSubmit = (e) => {
    e.preventDefault();

    const isAadharValid = newUser.aadharNumber.trim().length === 12;
    const isPhoneValid = newUser.phoneNumber.trim().length >= 10;

    setErrors({
      aadharNumber: isAadharValid ? "" : "true",
      phoneNumber: isPhoneValid ? "" : "true"
    });

    if (isAadharValid && isPhoneValid) {
      generateOtpCode();
      setOtpbox(true);
    }
  };


const handelVerifOtp = async () => {
    if (Number(OTP) === generateOtp) {
      try {
        const response = await axios.post("http://localhost:2705/api/user/create_user", newUser);
        console.log("hello",response);
        if (response.status === 200 || response.status === 201) {
          localStorage.setItem('pki-users', JSON.stringify(response.data.data));
          navigate('/sim/order/details');
        }
      } catch (error) {
        console.log(error.response.data);
        alert(`${error.response.data.message}`);
      }
    } else {
      setOtpError(true);
    }
  };

    return (
        <div className='signup'>
            <div className="signup-box">
                <div className="left-box new-user">
                    <h1>Join over a million users who digitally sign documents</h1>
                    <form onSubmit={handleSubmit}>
                        {/* Aadhar Number Input */}
                        <div className={`input-box ${errors.aadharNumber ? 'errors-bar' : ''}`}>
                            <input
                                id="aadharNumber"
                                type="text"
                                name="aadharNumber"
                                required
                                value={newUser.aadharNumber}
                                onChange={handleInput}
                            />
                            <label htmlFor="aadharNumber">Aadhar Number</label>
                        </div>
                        {errors.aadharNumber && (
                            <span className="error-message">
                                <RxCrossCircled /> Enter a valid 12-digit Aadhar Number
                            </span>
                        )}

                        {/* Mobile Number Input */}
                        <div className={`input-box ${errors.phoneNumber ? 'errors-bar' : ''}`}>
                            <PhoneInput
                                className="phoneinput"
                                country={"in"}
                                name="phoneNumber"
                                value={newUser.phoneNumber}
                                onChange={(value) =>
                                    handleInput({ target: { name: "phoneNumber", value } })
                                }
                                onFocus={() => setPhoneLabel(true)}
                            />
                            <label
                                className={`phoneinput-label ${phoneLabel ? "lable-above" : ""}`}
                                htmlFor="phoneNumber"
                                onClick={() => setPhoneLabel(true)}
                            >
                                Your Mobile Number
                            </label>
                        </div>
                        {errors.phoneNumber && (
                            <span className="error-message">
                                <RxCrossCircled /> Enter a valid Mobile Number
                            </span>
                        )}

                        <p className="otp-para">
                            The number should be linked to your Aadhar. You will receive an OTP to verify your identity as per CCA guidelines.
                        </p>

                        <div className="buy-button-box">
                            <button className="buy-button" type="submit">
                                Generate OTP
                            </button>
                        </div>
                    </form>
                </div>
                <div className="right-box">

                    <div className="steps-container">
                        <h2>
                            <span className="highlight">3 simple steps</span> to get your Jio PKI SIM
                        </h2>
                        <div className="Carousal-container">
                            <Carousel
                                className='carousel'
                                animation="slide"
                                duration={1000}
                                navButtonsAlwaysInvisible={true}
                                indicators={true}
                                onChange={handleChange}
                            >
                                {items.map((item, i) => (
                                    <div className='content-car'>
                                        <img src={item.image} alt={`${i} Slide`} key={i} />
                                        <h5>{item.name}</h5>
                                    </div>
                                ))}
                            </Carousel>
                        </div>
                        <p className="note">
                            <strong>Note:</strong> Your PKI-SIM is dispatched within 24 hours, and you can reach us 24x7 in case you need help with digital signature.
                        </p>
                    </div>
                </div>
            </div>
            {otpbox && (
                <div className="otp-box">
                    <div className="otp-container">
                        <h5>Please enter the OTP Sent to your entered Mobile number</h5>
                        <OtpInput
                            className="otp-input"
                            value={OTP}
                            onChange={setOTP}
                            autoFocus
                            OTPLength={6}
                            otpType="number"
                            disabled={false}
                            secure
                        />
                        {otpError && <p className="error-message">Wrong OTP entered!</p>}
                        <button type='button' onClick={handelVerifOtp}>Verify OTP</button>
                        <span onClick={generateOtpCode}>Resend OTP</span>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Signin

// <div className="right-box">

//     <div className="steps-container">
//         <h2>
//             <span className="highlight">3 simple steps</span> to get your Jio PKI SIM
//         </h2>
//         <div className="Carousal-container">
//             <Carousel
//                 className='carousel'
//                 animation="slide"
//                 duration={1000}
//                 navButtonsAlwaysInvisible={true}
//                 indicators={true}
//                 onChange={handleChange}
//             >
//                 {items.map((item, i) => (
//                     <div className='content-car'>
//                         <img src={item.image} alt={`${i} Slide`} key={i} />
//                         <h5>{item.name}</h5>
//                     </div>
//                 ))}
//             </Carousel>
//         </div>
//         <p className="note">
//             <strong>Note:</strong> Your PKI-SIM is dispatched within 24 hours, and you can reach us 24x7 in case you need help with digital signature.
//         </p>
//     </div>
// </div>
import React, { useEffect, useState } from 'react'
import "@/css/Orders.css";
import { RxCrossCircled } from "react-icons/rx";
import { Link, useNavigate } from 'react-router-dom';
import 'react-phone-input-2/lib/style.css'
import OtpInput from 'otp-input-react';
import axios from 'axios';
const Signin = () => {

    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [OTP, setOTP] = useState("");
    const [generateOtp, setGenerateOtp] = useState(0);
    const [otpbox, setOtpbox] = useState(false);
    const [otpError, setOtpError] = useState(false);
    const[typeOfUser,setTypeOfUser]=useState(1);
    const [newUser, setNewUser] = useState({
        fullName: '',
        emailId: ''
    });
    const [existingUser, setExistingUser] = useState({
        emailId: ''
    });

    const handleInput = (e) => {
        const { name, value } = e.target || {};
        if (typeOfUser === 1 || typeOfUser === 3) {
            setNewUser(prevUser => ({ ...prevUser, [name]: value }));
        } else{
            setExistingUser(prevUser => ({ ...prevUser, [name]: value }));
        }
        setErrors(prevErrors => ({
            ...prevErrors,
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
    
        const generalEmailRegex = /\S+@\S+\.\S+/;
        const jioEmailRegex = /^[a-zA-Z0-9._%+-]+@ril\.com$/;
    
        const isNameValid = newUser.fullName.trim() !== '';
        
        let isEmailValid = false;
        if (typeOfUser === 1) {
            isEmailValid = newUser.emailId.trim() !== '' && generalEmailRegex.test(newUser.emailId);
        } else{
            isEmailValid = newUser.emailId.trim() !== '' && jioEmailRegex.test(newUser.emailId);
        }
    
        setErrors({
            fullName: isNameValid ? "" : "true",
            emailId: isEmailValid ? "" : "true",
        });
    
        if (isNameValid && isEmailValid) {
            generateOtpCode();
            setOtpbox(true);
        }
    };

    const handleSubmit2 = (e) => {
        e.preventDefault();
        const isEmailValid = existingUser.emailId.trim() !== '' && /\S+@\S+\.\S+/.test(existingUser.emailId);
        setErrors({
            emailId: isEmailValid ? "" : "true",
        });
    
        if (isEmailValid) {
            generateOtpCode();
            setOtpbox(true);
        }
    };
    
    const handelVerifOtp = async() => {
        if (Number(OTP) === generateOtp) {
            try {
                let response;
                if (typeOfUser === 1) {
                    response = await axios.post("http://localhost:2705/api/user/signup",newUser)
                } else if (typeOfUser === 2) {
                    response = await axios.get(`http://localhost:2705/api/user/emailId`, {
                        params: { emailId: existingUser.emailId },
                    });
                } else if (typeOfUser === 3) {
                    response = await axios.post("http://localhost:2705/api/user/signup",newUser)
                }
                
                console.log(response);
                if (response.status === 200 || response.status === 201){
                    if(typeOfUser ===1 || typeOfUser===3)
                    {
                        localStorage.setItem('pki-users', JSON.stringify(response.data.data));
                    }
                else{
                    localStorage.setItem('pki-users', JSON.stringify(response.data));
                }
                    navigate('/sim/order/details');
                }
            } catch (error) {
                console.log(error.response);
                alert(`${error.response}`);
            }
        } else {
            setOtpError(true);
        }
    };

    return (
        <div className='signup'>
            <div className="signup-box">

                <div className={`left-box new-user ${typeOfUser === 1?'':'hide'}`}>
                    <h1>Join over million of users who digitally sign documents</h1>
                    <form onSubmit={handleSubmit}>
                        <div className={`input-box ${errors.fullName ? 'errors-bar' : ''}`}>
                            <input id="fullName" type="text" name="fullName" required="required" value={newUser.fullName} onChange={handleInput} />
                            <label htmlFor="fullName">Your Name</label>
                        </div>
                        {errors.fullName && <span className="error-message"><RxCrossCircled />Enter Your Full Name</span>}
                        {/* mobile number Input */}
                        <div className={`input-box ${errors.emailId ? 'errors-bar' : ''}`}>
                            <input id="emailId" type="emailId" name="emailId" required="required" value={newUser.emailId} onChange={handleInput} />
                            <label htmlFor="emailId">Email id</label>
                        </div>
                        {errors.emailId && <span className="error-message"><RxCrossCircled />Enter Your Email Id</span>}
                        <p className='otp-para'>You will recieve an OTP on your number to verify your identity as per CCA guidelibnes</p>
                        <div className="buy-button-box">
                            <button className='buy-button' type='submit'>Proceed</button>
                        </div>
                    </form>
                    <p className='navigation-to-esixting'><span onClick={()=>{setTypeOfUser(2)}}>Existing User</span> | <span onClick={()=>{setTypeOfUser(3)}}>Employee</span></p>
                </div>
                <div className={`left-box existing-user ${typeOfUser === 2?'':'hide'}`}>
                    <h1>2Join over million of users who digitally sign documents</h1>
                    <form onSubmit={handleSubmit2}>
                        <div className={`input-box ${errors.emailId ? 'errors-bar' : ''}`}>
                            <input id="emailId2" type="emailId" name="emailId" required="required" value={existingUser.emailId} onChange={handleInput} />
                            <label htmlFor="emailId2">Enter Your Email id</label>
                        </div>
                        {errors.emailId && <span className="error-message"><RxCrossCircled />Enter Your Valid Email Id</span>}
                        <p className='otp-para'>You will recieve an OTP on your number to verify your identity as per CCA guidelibnes</p>
                        <div className="buy-button-box">
                            <button className='buy-button' type='submit'>Proceed</button>
                        </div>
                    </form>
                    <p className='navigation-to-esixting'><span onClick={()=>{setTypeOfUser(1)}}>New User</span> | <span onClick={()=>{setTypeOfUser(3)}}>Employee</span></p>
                </div>
                <div className={`left-box employee-user ${typeOfUser === 3?'':'hide'}`}>
                    <h1>3Join over million of users who digitally sign documents</h1>
                    <form onSubmit={handleSubmit}>
                        <div className={`input-box ${errors.fullName ? 'errors-bar' : ''}`}>
                            <input id="fullName3" type="text" name="fullName" required="required" value={newUser.fullName} onChange={handleInput} />
                            <label htmlFor="fullName3">Your Name</label>
                        </div>
                        {errors.fullName && <span className="error-message"><RxCrossCircled />Enter Your Full Name</span>}
                        <div className={`input-box ${errors.emailId ? 'errors-bar' : ''}`}>
                            <input id="emailId3" type="emailId" name="emailId" required="required" value={newUser.emailId} onChange={handleInput} />
                            <label htmlFor="emailId3">Jio Email id</label>
                        </div>
                        {errors.emailId && <span className="error-message"><RxCrossCircled />Enter Your Jio Email Id</span>}
                        <p className='otp-para'>You will recieve an OTP on your number to verify your identity as per CCA guidelibnes</p>
                        <div className="buy-button-box">
                            <button className='buy-button' type='submit'>Proceed</button>
                        </div>
                    </form>
                    <p className='navigation-to-esixting'><span onClick={()=>{setTypeOfUser(2)}}>Existing User</span> | <span onClick={()=>{setTypeOfUser(1)}}>New User</span></p>
                </div>
                <div className="right-box">

                    <div className="steps-container">
                        <h2>
                            <span className="highlight">3 simple steps</span><br /> to get your PKI-SIM
                        </h2>
                        <div className="steps-list">
                            <div className='steps-number'>
                                <div className="step-badge">Step 1</div>

                                <div className="dotted-line"></div>

                                <div className="step-badge">Step 2</div>

                                <div className="dotted-line"></div>

                                <div className="step-badge">Step 3</div>
                            </div>
                            <div className='steps-details'>
                                <p>Complete your purchase online</p><br />
                                <p>Verify your identity through a completely online process in less than 5 minutes</p>
                                <p>Your PKI-SIM will be approved within 30 minutes and be ready for dispatch</p>
                            </div>
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

import React, { useEffect, useState } from 'react';
import "@/css/Login.css";
import { Link } from 'react-router-dom';
import { IoMdEyeOff, IoMdEye } from "react-icons/io";
import { RxCrossCircled } from "react-icons/rx";
import OtpInput from 'otp-input-react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCredentials } from "../features/auth/authSlice";
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const LoginNew = () => {
    const [user, setUser] = useState({
        emailId: "",
        otp:""
    });
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({});
    const [isloginerror, setisloginerror] = useState(false);
    // const [showPassword, setShowPassword] = useState(false);
    const [otpbox, setOtpbox] = useState(false);
    const [OTP,setOTP]= useState();
    const [otpError, setOtpError] = useState(false);
    const [responsedata,setResponsData]=useState({});
    const [isbuttonDisabled, setisbuttonDisabled] = useState(true);

    // const handlePasswordToggle = () => {
    //     setShowPassword(!showPassword);
    // }

    function handleInput(e) {
        let name = e.target.name;
        let value = e.target.value;
        setUser({
            ...user,
            [name]: value,
        });

        if (value === "") {
            setErrors(prevErrors => ({
                ...prevErrors,
                [name]: "true"
            }));
        } else {
            setErrors(prevErrors => ({
                ...prevErrors,
                [name]: ""
            }));
        }
    }

    useEffect(() => {
        if (user.emailId)
            setisbuttonDisabled(false);
        else
            setisbuttonDisabled(true);
    }, [user.emailId]);
    useEffect(() => {
        if (OTP && OTP.toString().length === 6) {
            setisbuttonDisabled(false);
        } else {
            setisbuttonDisabled(true);
        }
    }, [OTP]);

    const handelSendOtp=async()=>{
       const response= await axios.get(`http://localhost:2705/api/user/emailId?emailId=${user.emailId}`);
        // console.log(response);
        if(response.status==200)
        {
            setOtpbox(true);
            const otpresponse= await axios.get(`http://localhost:2705/email/send?email=${user.emailId}`
                , { withCredentials: true }
            );
            // console.log(otpresponse);
            if(otpresponse.status==200){
                localStorage.setItem('user',JSON.stringify(response.data));
                setResponsData(response.data);
            }
        }

    }

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     // const newErrors = {};
    //     // if (!user.email) newErrors.email = "Email is required.";
    //     // if (!user.password) newErrors.password = "Password is required.";

    //     // if (Object.keys(newErrors).length > 0) {
    //     //     setErrors(newErrors);
    //     //     return;
    //     // }

    //     const response = await axios.post("http://localhost:2705/api/auth/login", user);
    //     console.log(response.data);
    //     const data = response.data;

    //     if (response.status === 200) {
    //         toast.success("Login successful");
    //         const userDetails = {
    //             user: data.usersDTO,
    //             token: data.jwtToken
    //         };
    //         const role_id = data.usersDTO.roles[0].charAt(data.usersDTO.roles[0].indexOf('=') + 1);
    //         dispatch(setCredentials(userDetails));
    //         if (role_id === '1')
    //             navigate("/user/admin");
    //         else
    //             navigate("/user/dashboard");

    //     } else {
    //         setisloginerror(true);
    //     }
    // }
    const handelVerifOtp=async()=>{
        const otpresponse= await axios.get(`http://localhost:2705/email/verify?otp=${OTP}`
            , { withCredentials: true }
        );
        console.log(otpresponse);
        if (otpresponse.status==200){
            alert("sucessfull")
            if(responsedata.role_id == 1){
                navigate('/admin')
            }
            else{
                navigate('/');
            }

        }
    }

    return (
        <div className='login-container'>
            <div className='login-box'>
                <h1>Welcome to JioBusiness</h1>
                <form className='login-form'>

                    {/* Email Input */}
                    <div className={`input-box ${errors.email ? 'errors-bar' : ''}`}>
                        <input id="email" type="text" name="emailId" required="required" value={user.emailId} onChange={handleInput}  disabled={otpbox}/>
                        <label htmlFor="email">E-mail ID/ Jio User ID</label>
                    </div>
                    {errors.email && <span className="error-message"><RxCrossCircled />Enter E-mail ID /Jio User ID</span>}

                    {/* OTP Input */}
                    {otpbox && <div className='otp-container'>
                        <p className='otp-sent'>OTP has been sent to your mail ID</p>
                        <p className='otpheading'>Enter The OTP</p>
                        <OtpInput className="otp-input" value={OTP} onChange={setOTP} autoFocus
                            OTPLength={6}
                            otpType="number"
                            disabled={false}
                            secure
                        />
                        {otpError && <p className="error-message">Wrong OTP entered!</p>}
                        <p className='resend-otp' onClick={handelSendOtp}>Resent OTP</p>
                    </div>}
                    

                    {/* Checkbox and Link */}
                    <div className='checkbox'>
                        <label htmlFor="checkbox">
                            <input type='checkbox' id="checkbox" />
                            Remember Me
                        </label>
                        {/* <Link to="/">Forget password?</Link> */}
                    </div>
                    {otpbox ? <button type='button' onClick={handelVerifOtp} className='login-btn' disabled={isbuttonDisabled}>
                        verify OTP
                    </button>
                    :<button type='button' onClick={handelSendOtp} className='login-btn' disabled={isbuttonDisabled}>
                        Send OTP
                    </button>}
                    
                    
                </form>

                <h6 className='forget-id'>
                    <Link>Forget Jio ID?</Link>  <span>|</span> <Link>Activate account</Link>
                </h6>

                <div className={`login-error ${!isloginerror ? 'display-none' : ''}`}>
                    Jio ID do not match. Please re-enter and try again.
                </div>

                <p className='terms-of-services'>By continuing, you agree to our <Link>Terms of Service</Link> and <Link>Privacy & Legal Policy</Link></p>
            </div>
        </div>
    )
}

export default LoginNew;

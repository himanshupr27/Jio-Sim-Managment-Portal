import React, { useEffect, useState } from 'react';
import "../../css/Login.css";
import { Link } from 'react-router-dom';
import { IoMdEyeOff, IoMdEye } from "react-icons/io";
import { RxCrossCircled } from "react-icons/rx";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import {useNavigate } from 'react-router-dom';
import {setCredentials} from "../features/auth/authSlice";
import { toast} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
    const [user, setUser] = useState({
        email: "",
        password: "",
    });
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({});
    const [isloginerror, setisloginerror] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isbuttonDisabled, setisbuttonDisabled] = useState(true);

    const handlePasswordToggle = () => {
        setShowPassword(!showPassword);
    }

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
    useEffect(()=>{
        if(user.email && user.password)
            setisbuttonDisabled(false);
        else
          setisbuttonDisabled(true);
    },[user.email,user.password]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // const newErrors = {};
        // if (!user.email) newErrors.email = "Email is required.";
        // if (!user.password) newErrors.password = "Password is required.";

        // if (Object.keys(newErrors).length > 0) {
        //     setErrors(newErrors);
        //     return;
        // }

        const response = await axios.post("http://localhost:2705/api/auth/login", user);
        console.log(response.data);
        const data = response.data;

        if (response.status === 200) {
            toast.success("Login successful");
            const userDetails = {
                user: data.usersDTO,
                token: data.jwtToken
            };
            const role_id = data.usersDTO.roles[0].charAt(data.usersDTO.roles[0].indexOf('=') + 1);
            dispatch(setCredentials(userDetails));
            if (role_id === '1')
                navigate("/user/admin");
            else
                navigate("/user/dashboard");

        } else {
            setisloginerror(true);
        }
    }

    return (
        <div className='login-container'>
            <div className='login-box'>
                <h1>Welcome to JioBusiness</h1>
                <form className='login-form' onSubmit={handleSubmit}>

                    {/* Email Input */}
                    <div className={`input-box ${errors.email?'errors-bar':''}`}>
                        <input id="email" type="text" name="email" required="required" value={user.email} onChange={handleInput} />
                        <label htmlFor="email">E-mail ID/ Jio User ID</label>
                    </div>
                    {errors.email && <span className="error-message"><RxCrossCircled/>Enter E-mail ID /Jio User ID</span>}

                    {/* Password Input */}
                    <div className={`input-box ${errors.password?'errors-bar':''}`}>
                        
                        <input id="password" type={!showPassword ? 'password' : 'text'} name="password" required="required" value={user.password} onChange={handleInput} />
                        <button type="button" className='password-btn' onClick={handlePasswordToggle}>
                            {!showPassword ? <IoMdEye /> : <IoMdEyeOff />}
                        </button>
                        <label htmlFor="password">Password</label>
                    </div>
                    {errors.password && <span className="error-message"><RxCrossCircled/>Enter Password</span>}

                    {/* Checkbox and Link */}
                    <div className='checkbox'>
                        <label htmlFor="checkbox">
                            <input type='checkbox' id="checkbox" />
                            Remember Me
                        </label>
                        <Link to="/">Forget password?</Link>
                    </div>

                    {/* Submit Button */}
                    <button type='submit' className='login-btn' disabled={isbuttonDisabled}>
                        Log in
                    </button>
                </form>
                
                <h6 className='forget-id'>
                    <Link>Forget Jio ID?</Link>  <span>|</span> <Link>Activate account</Link>
                </h6>

                <div className={`login-error ${!isloginerror?'display-none':''}`}>
                Jio ID and Password do not match. Please re-enter and try again.
                </div>

                <p className='terms-of-services'>By continuing, you agree to our <Link>Terms of Service</Link> and <Link>Privacy & Legal Policy</Link></p>
            </div>
        </div>
    )
}

export default Login;

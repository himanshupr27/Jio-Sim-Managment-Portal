import React, { useState } from 'react'
import "@/css/Callback.css"
import { Link } from 'react-router-dom';
import { RxCrossCircled } from "react-icons/rx";

const Callback = () => {

  const [callback, setcallback] = useState({
    fname: "",
    lname: "",
    mobileno: "",
    email: "",
    company: "",
    pincode: "",
    industry: "",
    service: "",
  });

  const [errors, setErrors] = useState({});

  function handleInput(e) {
    let name = e.target.name;
    let value = e.target.value;
    setcallback({
      ...callback,
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

  const handelsubmit = () => {
    e.preventDefault();
    
  }

  return (
    <div className='want-a-callback'>
      <div className="heading-callback">
        <h1>Want a callback?</h1>
        <h4>Please share your details</h4>
      </div>

      <form className='callback-form' on onSubmit={handelsubmit}>

        <div className="form-input">
          <div className='input-container'>
            <div className={`input-box ${errors.fname ? 'errors-bar' : ''}`}>
              <input id="fname" type="text" name="fname" required="required" value={callback.fname} onChange={handleInput} />
              <label htmlFor="fname">First Name *</label>
            </div>
            {errors.fname && <span className="error-message"><RxCrossCircled />Enter Fisrt Name</span>}
          </div>
          <div className='input-container'>
            <div className={`input-box ${errors.lname ? 'errors-bar' : ''}`}>
              <input id="lname" type="text" name="lname" required="required" value={callback.lname} onChange={handleInput} />
              <label htmlFor="lname">Last Name *</label>
            </div>
            {errors.lname && <span className="error-message"><RxCrossCircled />Enter Last Name</span>}
          </div>
          <div className='input-container'>
            <div className={`input-box ${errors.email ? 'errors-bar' : ''}`}>
              <input id="email" type="text" name="email" required="required" value={callback.email} onChange={handleInput} />
              <label htmlFor="email">E-mail *</label>
            </div>
            {errors.email && <span className="error-message"><RxCrossCircled />Enter E-mail</span>}
          </div>
          <div className='input-container'>
            <div className={`input-box ${errors.mobileno ? 'errors-bar' : ''}`}>
              <input id="mobileno" type="number" name="mobileno" required="required" value={callback.mobileno} onChange={handleInput} />
              <label htmlFor="mobileno">Mobile Number *</label>
            </div>
            {errors.mobileno && <span className="error-message"><RxCrossCircled />Enter Mobile Number</span>}
          </div>
          <div className='input-container'>
            <div className={`input-box ${errors.company ? 'errors-bar' : ''}`}>
              <input id="company" type="text" name="company" required="required" value={callback.company} onChange={handleInput} />
              <label htmlFor="company">Company Name *</label>
            </div>
            {errors.company && <span className="error-message"><RxCrossCircled />Enter Company Name</span>}
          </div>
          <div className='input-container'>
            <div className={`input-box ${errors.pincode ? 'errors-bar' : ''}`}>
              <input id="pincode" type="number" name="pincode" required="required" value={callback.pincode} onChange={handleInput} />
              <label htmlFor="pincode">Pincode *</label>
            </div>
            {errors.pincode && <span className="error-message"><RxCrossCircled />Enter Pincode</span>}
          </div>
          <div className='input-container'>
            <div className={`input-box ${errors.industry ? 'errors-bar' : ''}`}>
              <select id="industry" name="industry" required="required" value={callback.industry} onChange={handleInput}>
                <option></option>
                <option>BFSI</option>
                <option>BPO, KPO, Call Centre</option>
                <option>FMCG</option>
                <option>Government</option>
                <option>Healthcare</option>
                <option>Hospitality</option>
                <option>IT - Tech Only</option>
                <option>Logistics</option>
                <option>Manufacturing</option>
                <option>Media and Entertainment</option>
                <option>Professional Services</option>
                <option>Retail</option>
                <option>Tech and Industrial Parks</option>
                <option>Others</option>
              </select>
              <label htmlFor="industry">Select Industry *</label>
            </div>
            {errors.industry && <span className="error-message"><RxCrossCircled />Select Industry</span>}
          </div>
          <div className='input-container'>
            <div className={`input-box select-box ${errors.service ? 'errors-bar' : ''}`}>
              <select id="service" name="service" required="required" value={callback.service} onChange={handleInput}>
                <option>Smart Electricity Metering</option>
                <option>Cloud Connect</option>
                <option>Cloud Server in a box</option>
                <option>DDoS Mitigation</option>
                <option>Enterprise managed Wi-Fi</option>
                <option>GrowNet Solutions</option>
                <option>Internet Leased Line</option>
                <option>IP Centrex</option>
                <option>Jio 4G Service</option>
                <option>Jio CyberSOC</option>
                <option>Jio True 5G</option>
                <option>JioAttendance</option>
                <option>JioBusiness Solution</option>
                <option>JioCloud</option>
                <option>JioConnect</option>
                <option>JioFi</option>
                <option>JioMeet</option>
                <option>JioXploR</option>
                <option>MPLS VPN</option>
                <option>MSME</option>
                <option>NetSensor</option>
                <option>SD-WAN</option>
                <option>SIP Trunk</option>
                <option>Smart Connected Coolers</option>
                <option>Smart Electricity Metering</option>
                <option>Smart EV Charging</option>
                <option>Smart Fleet Management</option>
                <option>Smart Genset Monitoring</option>
                <option>Smart Street Lighting</option>
                <option>Threat and Vulnerability Management</option>
                <option>Toll-Free Service</option>
                <option>Others</option>
              </select>
              <label htmlFor="service">Select Service*</label>
            </div>
            {errors.service && <span className="error-message"><RxCrossCircled />Select Service</span>}
          </div>
        </div>


        <p>By proceeding, you agree to our <Link to="/"> Terms & Condition</Link> </p>
        <button type='submit'>Submit Request</button>
      </form>
    </div>
  )
}

export default Callback

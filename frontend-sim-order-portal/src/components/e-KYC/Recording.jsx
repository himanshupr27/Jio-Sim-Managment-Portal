import React, { useEffect, useRef, useState } from 'react';
import "../../css/Recording.css";;
import Videorecording from './Videorecording';
import { TbArrowBadgeRightFilled } from "react-icons/tb";
const Recording = () => {

  const [activeVideoRecording, setActiveVideoRecording] = useState(false);
  const [profile, setProfile] = useState({});

  useEffect(() => {
    setProfile(JSON.parse(localStorage.getItem('profile')));
  }, []);

  return (
    <div className='video-kyc-container'>
      <h3 className='video-heading'>Welcome {profile.fullName} to video kyc</h3>
      <h6 className='video-heading video-application-id'>Application Id: {profile.id}</h6>
      <div className={`video-kyc-box ${activeVideoRecording ? 'display-hidden' : ''}`}>
        <div className='vk-left-part'>
          <video src='../video/KYC1.mp4' controls></video>
        </div>
        <div className='vk-right-part'>
          <h6>Follow the steps below to record the video</h6>

          <div className="steps">
            <span>Read</span>
            <p>I am Iris, and my code for this video kyc is 1001</p>
          </div>
          <div className="steps">
            <span>Show</span>
            <p>Aadhar</p>
          </div>
          <div className="steps">
            <span>Show</span>
            <p>Pan</p>
          </div>

          <button className='btn' onClick={() => { setActiveVideoRecording(true) }}>Proceed to video recording</button>

          <div className="instructions-video">

            <h5>Instructions</h5>
          <p><TbArrowBadgeRightFilled />Keep your original PAN and Aadhar ready</p>
            <p><TbArrowBadgeRightFilled />
              Please Note your video will bw recorded for kyc purpose so make sure yor audio and video should be clear.
            </p>
            <p><TbArrowBadgeRightFilled />Make sure your video recording should not exceed 20 sec.</p>

          </div>

        </div>
      </div>
      
      <div className={`video-kyc-box ${activeVideoRecording ? "" : "display-hidden"}`}>
        <Videorecording />
      </div>
      <div className='important-note'>
        <h5>Important Note</h5>
        <p>Only applicant should appear for Video verfication Any Impersonation or centty theft is a cominel offence, lable for morisonment and fre, under the provisions of information Technology Act 2000 ano sral de osat severely by eMudhra Umed</p>
        </div>
    </div>
  )
}

export default Recording

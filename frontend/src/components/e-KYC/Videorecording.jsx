import React, { useRef, useState, useCallback, useEffect } from "react";
import Webcam from "react-webcam";
import RecordRTC from "recordrtc";
import {useNavigate } from 'react-router-dom';
import { TbArrowBadgeRightFilled } from "react-icons/tb";
import "@/css/Recording.css";
import axios from "axios";

const Videorecording = () => {
  const navigate = useNavigate();
  const webcamRef = useRef(null); 
  const mediaRecorderRef = useRef(null); 
  const [recording, setRecording] = useState(false); 
  const [recordedChunks, setRecordedChunks] = useState([]); 
  const [previewSrc, setPreviewSrc] = useState(null); 
  const [videoBlob, setVideoBlob] = useState(null); 
  const[profile,setProfile]= useState({});
  const [code, setCode] = useState();

  function generateRandomFourDigitNumber() {
    setCode(Math.floor(1000 + Math.random() * 9000));
  }
  useEffect(() => {
    setProfile(JSON.parse(localStorage.getItem('profile')));
    generateRandomFourDigitNumber();
  }, []);

  const handleDataAvailable = useCallback(
    (data) => {
      if (data.size > 0) {
        setRecordedChunks((prev) => prev.concat(data));
      }
    },
    [setRecordedChunks]
  );

  const handleStartCaptureClick = useCallback(() => {
    setRecording(true);
    mediaRecorderRef.current = RecordRTC(webcamRef.current.stream, {
      type: "video",
      mimeType: "video/webm",
      disableLogs: true,
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: true,
      },
    });
    mediaRecorderRef.current.startRecording();
    mediaRecorderRef.current.ondataavailable = handleDataAvailable;
  }, [webcamRef, handleDataAvailable]);

  const handleStopCaptureClick = useCallback(() => {
    setRecording(false);
    mediaRecorderRef.current.stopRecording(() => {
      const blob = mediaRecorderRef.current.getBlob();
      setVideoBlob(blob); 
      const previewURL = URL.createObjectURL(blob);
      setPreviewSrc(previewURL); 
    });
  }, []);

  const handleReRecord = useCallback(() => {
    setPreviewSrc(null); 
    setVideoBlob(null); 
    setRecordedChunks([]); 
    generateRandomFourDigitNumber();
  }, []);

  const handleSubmit = useCallback(async() => {
    if (!videoBlob) {
      alert("Please record a video before submitting!");
      return;
    }
    const formData = new FormData();
    formData.append("video", new File([videoBlob], `${profile.fullName}-video-ekyc-${code}.webm`, { type: "video/webm" }));
    console.log(formData);
    const response = await axios.put(`http://localhost:2705/api/kyc_record/profile/${profile.id}/upload_video`,formData, {
      headers: {
          "Content-Type": "multipart/form-data",
      },
  });
  console.log(response);
  
    navigate('/track-order');

  }, [videoBlob, profile, code]);

  return (
    <>
      <div className="vk-left-part">
        {!previewSrc ? (
          <Webcam
            audio={true}
            muted={true}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={{
              facingMode: "user",
            }}
          />
        ) : (
          <video
            src={previewSrc}
            controls
            style={{ width: "100%" }}
          />
        )}
      </div>
      <div className="vk-right-part">
        <h6>Follow the steps below to record the video</h6>

        <div className="steps">
          <span>Read</span>
          <p>I am {profile.fullName}, and my code for this video KYC is {code}</p>
        </div>
        <div className="steps">
          <span>Show</span>
          <p>Aadhar</p>
        </div>
        <div className="steps">
        <span>Show</span>
        <p>Pan</p>
        </div>
        <div>
          {!recording && !previewSrc && (
            <button className="btn" onClick={handleStartCaptureClick}>
              Start Recording
            </button>
          )}
          {recording && (
            <button className="btn stop-btn" onClick={handleStopCaptureClick}>
              Stop Recording
            </button>
          )}
          {previewSrc && (
            <>
              <button className="btn re-record-btn" onClick={handleReRecord}>
                Re-record
              </button>
              <button className="btn submit-btn" onClick={handleSubmit}>
                Submit Video
              </button>
            </>
          )}
        </div>
        <div className="instructions-video">
          <h5>Instructions</h5>
          <p><TbArrowBadgeRightFilled/>Click one Start Recording when your are ready with all the document</p>
          <p><TbArrowBadgeRightFilled/>Once ypu have recorded click on stop recording and you can privew yor video</p>
          <p><TbArrowBadgeRightFilled/>if the recorded video if clear in audio and video then you can proceed with the submit</p>
        </div>
      </div>
    </>
  );
};

export default Videorecording;

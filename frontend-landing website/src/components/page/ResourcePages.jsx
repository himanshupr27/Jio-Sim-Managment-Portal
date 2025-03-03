import React from 'react'
import { useLocation } from "react-router-dom";
import { FaSquareFacebook,FaWhatsapp,FaLinkedin,FaXTwitter } from "react-icons/fa6";
import { GrMail } from "react-icons/gr";
import { RiThumbUpFill,RiThumbDownFill } from "react-icons/ri";
import "../../css/ResourcePage.css"

const ResourcePages = () => {
    const location = useLocation();
    // const data = location.state?.data || {};

    const params = new URLSearchParams(window.location.search);
    const encodedData = params.get("data");
    const data = encodedData
    ? JSON.parse(decodeURIComponent(escape(window.atob(encodedData))))
    : {};

  return (
    <div className='resource-content'>
        <h1 className='resourse-heading'>{data.title}</h1>
        <div className='date-share'>{data.date}
          <div className='share-options'>
          Share 
          <span className='share-svg'><FaSquareFacebook/></span>
          <span className='share-svg'><FaXTwitter/> </span>
          <span className='share-svg'><FaWhatsapp/> </span>
          <span className='share-svg'><GrMail/> </span>
          <span className='share-svg'><FaLinkedin/></span>
          </div>
          </div>
          <div className="main-image-container">
            <img src={data.image} className='main-image'/>
          </div>
          <div className='content-container'>
        {data?.content && (
                <div dangerouslySetInnerHTML={{ __html: data.content }} className='content'/>
            )}

            <div className="share-article">
              <h1>Share this article</h1>
            <div className='share-options'>
          <span className='share-svg'><FaSquareFacebook/></span>
          <span className='share-svg'><FaXTwitter/> </span>
          <span className='share-svg'><FaWhatsapp/> </span>
          <span className='share-svg'><GrMail/> </span>
          <span className='share-svg'><FaLinkedin/></span>
          </div>
            </div>
          </div>
          <div className="helpfull">
            <h4>Was this helpful for you?</h4>
            <div className="svg-yes-no">
              <span className='svg-box'><RiThumbUpFill/> Yes</span>
              <span className='svg-box'><RiThumbDownFill/> No</span>
            </div>
          </div>
    </div>
  )
}

export default ResourcePages

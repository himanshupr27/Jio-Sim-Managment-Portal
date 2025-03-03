import React,{useEffect} from 'react'
import Callback from './Callback';
import ReactDOMServer from "react-dom/server";
import {useNavigate } from 'react-router-dom';
import { IoIosPaper } from "react-icons/io";
import { FaArrowRightLong } from "react-icons/fa6";
import { IoIosArrowRoundForward } from "react-icons/io";
import "../../css/Overview.css"
import { explainers } from '../../data/JioExplainers';
const Overview = () => {
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
      const navigate = useNavigate();
      // const navigateToExplainerPage=(data)=>{
      //     const serializedData = {
      //         ...data,
      //         content: ReactDOMServer.renderToString(data.content),
      //     };
      //     navigate("/components/Resources/page", { state: { data: serializedData } });
      // }

      const navigateToExplainerPage = (data) => {
          const serializedData = JSON.stringify({
              ...data,
              content: ReactDOMServer.renderToString(data.content), // Convert JSX to HTML string
          });
      
          // Encode with UTF-8 support
          const encodedData = encodeURIComponent(
              window.btoa(unescape(encodeURIComponent(serializedData)))
          );
      
          window.open(`/components/Resources/page?data=${encodedData}`, "_blank"); // Open in new tab
      };
  return (
    <>
      <div className="overview-intro">
        <h1>
        Securing Payment and Banking Solution with JioPKI-SIM Solution
        </h1>
        <p>
        Payment and banking solutions are updating its digitalization process in a very fast space. Pandemic situation furthers pushes country’s financial and banking sector to move digitally in almost all the services. But with increasing digitalization, along with user convenience for ease of operation, the security is becoming extremely important to avert any financial loss and attacks. 
        <br/>
        <br/>
        PKI-SIM can complement various corners of the financial domain to increase the security level. The support can enhance the fundamental banking process such as Demographic detail update (Current address, mail etc.) or any request which requires user consent and authorization.
        </p>
      </div>
      <div className="explainer">
                <h1>Jio Explainers</h1>
                <h5>Direct answers to complex questions, backed by Jio’s expert insights.</h5>
                <div className="articles-container">
                  {explainers.map(data=>(
                  <div className="article-box" key={data.id} onClick={()=>{navigateToExplainerPage(data)}}>
                     <span className='icon-type'><IoIosPaper />{data.resourse}</span> 
                    <h4 className='heading-explainer'>{data.title}</h4>
                    <div className='navigation-arrow'>
                        <span className='svg-arrow'>< IoIosArrowRoundForward /></span> 
                        <span className='svg-article'><IoIosPaper/></span>
                    </div>
                  </div>
                    ))}
                </div>
        </div>
      <Callback/>
    </>
  )
}

export default Overview

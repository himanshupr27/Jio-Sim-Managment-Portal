import React from 'react';
import ReactDOMServer from 'react-dom/server';
import "../../css/LearnMores.css";
import { IoIosArrowRoundForward } from "react-icons/io";
import { BsFillSimFill, BsFillPersonBadgeFill } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import { LearnMoreData } from '../../data/LearMoreData';

// Mapping icon keys to icon components
const iconMap = {
  "1": <BsFillSimFill />,
  "2": <BsFillPersonBadgeFill />,
  "3": <FaUsers />,
};

const LearnMore = () => {
  const navigateToExplainerPage = (data) => {
    const serializedData = JSON.stringify({
      ...data,
      content: ReactDOMServer.renderToString(data.content),
    });

    const encodedData = encodeURIComponent(
      window.btoa(unescape(encodeURIComponent(serializedData)))
    );

    window.open(`/components/Resources/page?data=${encodedData}`, "_blank");
  };

  return (
    <div className='learn-more'>
      <h1 className='Learn-heading'>Learn More About PKI</h1>
      <p className='Learn-para'>
        Discover how Public Key Infrastructure (PKI) keeps digital identities and communications trusted, private, and tamper‑proof.
      </p>
      <div className='learn-container'>
        {LearnMoreData.map(item => {
          const Icon = iconMap[item.icon]; // Get icon from map
          return (
            <div className="learn-box" key={item.id} onClick={() => navigateToExplainerPage(item)}>
              <span className="svg-title-icon">{Icon}</span> {/* Render icon here */}
              <h3 className='box-titel'>{item.subtitle}</h3>
              <p className='sun-content'>{item.sub_content}</p>
              <div className='navigate-btn-box'>
                <span className='svg-arrow'><IoIosArrowRoundForward /></span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LearnMore;

import React, { useState, useEffect, useRef } from 'react'
import "@/css/StillHaveAnyQs.css"
import Accordion from './Accordion';
import {
  ServiceOfferings,
  Buying,
  OnboardingAndActivation,
  CustomerService,
  BillsAndPay
} from "../../data/Questions";

const StillHaveAnyQs = () => {
  const [questionlist, setquestionlist] = useState(1);
  const [activeIndex, setActiveIndex] = useState(null);

  const underlineRef = useRef();
  const tabRefs = [useRef(), useRef(), useRef(), useRef(), useRef()];

  const handleselectQuestion = (i) => {
    setquestionlist(i);
  };

  useEffect(() => {
    const currentTab = tabRefs[questionlist - 1]?.current;
    const underline = underlineRef.current;

    if (currentTab && underline) {
      underline.style.width = `${currentTab.offsetWidth + 5 }px`;
      underline.style.left = `${currentTab.offsetLeft - 2.5}px`;
    }
  }, [questionlist]);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className='question-container'>
      <h1>Still have questions?</h1>
      <h4>
        Find answers to some of the commonly asked questions by our<br />
        JioBusiness customers.
      </h4>

      <div className="questions-catagory">
        <ul className="catagory-list">
          <li ref={tabRefs[0]} className={questionlist === 1 ? 'list-bold' : ''} onClick={() => handleselectQuestion(1)}>
            Service Offerings
          </li>
          <li ref={tabRefs[1]} className={questionlist === 2 ? 'list-bold' : ''} onClick={() => handleselectQuestion(2)}>
            Buying
          </li>
          <li ref={tabRefs[2]} className={questionlist === 3 ? 'list-bold' : ''} onClick={() => handleselectQuestion(3)}>
            Onboarding & Activation
          </li>
          <li ref={tabRefs[3]} className={questionlist === 4 ? 'list-bold' : ''} onClick={() => handleselectQuestion(4)}>
            Customer Service
          </li>
          <li ref={tabRefs[4]} className={questionlist === 5 ? 'list-bold' : ''} onClick={() => handleselectQuestion(5)}>
            Bill & Pay
          </li>

          {/* Animated underline */}
          <div className="underline" ref={underlineRef}></div>
        </ul>

        <div className="list-of-questions">
<>
      {/* <>
          <div className="question-item">
            <div className="question-header" onClick={() => toggleAccordion(1)}>
              <h5>What is Smart Electricity Metering solution?</h5>
              {activeIndex === 1 ? <FaMinus /> : <FaPlus />}
            </div>
            <div className={`question-content ${activeIndex === 1 ? 'expanded' : 'collapsed'}`}>
              <p>Smart Electricity Metering solution is about monitoring and recording of real time energy consumption, directing stored energy data to Central Server (CS) and executing the commands that are coming from the CS.</p>
            </div>
            <hr />
          </div>
          <div className="question-item">
            <div className="question-header" onClick={() => toggleAccordion(2)}>
              <h5>How is Jio’s solution different from those available in market?</h5>
              {activeIndex === 2 ? <FaMinus /> : <FaPlus />}
            </div>
            <div className={`question-content ${activeIndex === 2 ? 'expanded' : 'collapsed'}`}>
              <p>Jio is a one-stop-shop for all components including hardware, nationwide connectivity, IoT platform, installation and after sales services.</p>
            </div>
            <hr />
          </div>
          <div className="question-item">
            <div className="question-header" onClick={() => toggleAccordion(3)}>
              <h5>Is the Head End System (HES ) proven?</h5>
              {activeIndex === 3 ? <FaMinus /> : <FaPlus />}
            </div>
            <div className={`question-content ${activeIndex === 3 ? 'expanded' : 'collapsed'}`}>
              <p>Yes, the HES is an internationally acclaimed HES system which has a proven track record of about 2 decades. The HES is already proven with millions of connected meters and works with all standard protocols. The HES has well tested adapters with all the leading MDMS systems</p>
            </div>
            <hr />
          </div>
          <div className="question-item">
            <div className="question-header" onClick={() => toggleAccordion(4)}>
              <h5>What is the advantage of having all communication under one roof?</h5>
              {activeIndex === 4 ? <FaMinus /> : <FaPlus />}
            </div>
            <div className={`question-content ${activeIndex === 4 ? 'expanded' : 'collapsed'}`}>
              <p>Smart Metering implementations have traditionally failed because of unreliable communication. There have been multiple partners who would implement different components.<br />
                Jio understood the problem and decided to provide all the components under one roof and take complete responsibility of transferring metering data to the cloud. Thus, none of the other stakeholders have to worry about the communication and continue to focus on their respective areas of expertise. Moreover, cost of communication reduces drastically.</p>
            </div>
            <hr />
          </div>
          <div className="question-item">
            <div className="question-header" onClick={() => toggleAccordion(5)}>
              <h5>Why do I choose Jio’s NB-IoT devices over LoRa and RF solutions available in market?</h5>
              {activeIndex === 5 ? <FaMinus /> : <FaPlus />}
            </div>
            <div className={`question-content ${activeIndex === 5 ? 'expanded' : 'collapsed'}`}>
              <p>Key features of Jio’s NB-IoT that makes it the best choice available in the market today are:<br />
                a. NB-IoT is a 3GPP standard network and does not carry drawbacks of proprietary RF mesh networks.<br />

                b. NB-IoT does not need any additional infrastructure setup.<br />

                c. Being a cellular technology, NB-IoT ensures no vendor lock-ins and one can switch between network operators.<br />

                d. Jio provides Zero Touch Provisioning that makes deployment and maintenance seamless.<br />

                e. Long-term sustainability and reliability is ensured as Jio devices are integrated and certified by driver manufacturers.<br />

                f. NB-IoT ensures 99.9% AMRs unlike other technologies which are able to achieve upto 75% AMRs.</p>
            </div>
            <hr />
          </div>
          <div className="question-item">
            <div className="question-header" onClick={() => toggleAccordion(6)}>
              <h5>Do I need to install gateways or DCUs or any additional infrastructure?</h5>
              {activeIndex === 6 ? <FaMinus /> : <FaPlus />}
            </div>
            <div className={`question-content ${activeIndex === 6 ? 'expanded' : 'collapsed'}`}>
              <p>No need of investing single penny into developing infrastructure. All Jio cellular network towers (eNodeB) are enabled with NB-IoT supported hardware for NB bands communication..</p>
            </div>
            <hr />
          </div>
          <div className="question-item">
            <div className="question-header" onClick={() => toggleAccordion(7)}>
              <h5>Do I need to install plastic SIM cards?</h5>
              {activeIndex === 7 ? <FaMinus /> : <FaPlus />}
            </div>
            <div className={`question-content ${activeIndex === 7 ? 'expanded' : 'collapsed'}`}>
              <p>Not needed anymore, each NIC card has an eSIM facility that will reduce manual efforts to install SIM. Also misuse of SIMs is next to impossible..</p>
            </div>
            <hr />
          </div>
      </> */}
</>
          {questionlist == 1 &&(<Accordion questions={ServiceOfferings}/>)}
          {questionlist == 2 &&(<Accordion questions={Buying}/>)}
          {questionlist == 3 &&(<Accordion questions={OnboardingAndActivation}/>)}
          {questionlist == 4 &&(<Accordion questions={CustomerService}/>)}
          {questionlist == 5 &&(<Accordion questions={BillsAndPay}/>)}

        </div>

      </div>

    </div>
  )
}

export default StillHaveAnyQs

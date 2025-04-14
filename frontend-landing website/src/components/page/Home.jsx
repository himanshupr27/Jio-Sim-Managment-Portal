import React,{useState} from 'react';
import "@/css/Home.css";
import { Container, Row, Col } from 'reactstrap';
import { TbTruckDelivery } from "react-icons/tb";
import { RxBarChart } from "react-icons/rx";
import { GiDigitalTrace } from "react-icons/gi";
import { BsPersonWorkspace, BsFileTextFill } from "react-icons/bs";
import { AiOutlineGlobal } from "react-icons/ai";
import Callback from './Callback';
import StillHaveAnyQs from './StillHaveAnyQs';
import { Link,useNavigate } from 'react-router-dom';
import Carousel from 'react-material-ui-carousel/dist/components/Carousel';

const Home = () => {
  const items = [
    {
        name: "Summer Hair",
        details: "Care",
        image: "/Images/Home/image-1.jpeg"
    },
    {
        name: "Offer On",
        details: "Domex",
        image: "/Images/Home/image-2.webp"
    },
  ];
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

const handleChange = (now, previous) => {
    setCurrentIndex(now);
};
  return (
    <div>
      <div className="home-img-container">
      <img src='/Images/Home/image-1.jpeg' id='home-ing-1' />
      {/* <Carousel
        className='carousel'
        animation="slide"
        duration={1000}
        navButtonsAlwaysInvisible={true}
        indicators={false}
        onChange={handleChange}
      >
        {items.map((item, i) => (
          <img src={item.image} alt={`${i} Slide`} key={i} style={{ width: "100%", height: "400px", objectFit: "cover" }} />
        ))}
      </Carousel> */}
      </div>
      <div className='home-content-1'>
        <h1>Transform business processes with enhanced security - PKI SIM</h1>
        <p>The PKI SIM (Public Key Infrastructure SIM) project aims to revolutionize mobile security by integrating robust crypto- graphic protocols directly into SIM cards. Leveraging PKI technology, this STM Solution provides an advanced, secure and scalable method for authentications, encryption, and digital signaSure services, ensuring safe data transmission across business use cases.</p>
        <div>
          <button type='button' className='video-btn' onClick={()=>{navigate('/video-recording-kyc')}}>Video</button>
          <button type='button' className='how-to-order-btn'>How to order</button>
        </div>
      </div>
      <Container className="home-content-2">
        <Row xs='1' sm='2' className="hm-ct-2-bg-img">
          <Col className='big-text'>
            <button className='big-text-btn'>Security</button>
            <h1>Empowering Trust - PKI SIM</h1>
            <p>
              Digital signing, data protection and management from anytime, anywhere.</p>
            <button className='big-text-btn' id='learn-more'>Learn More</button>
          </Col>
          <Col className='big-img'>
            <img src="/Images/Home/image-2.webp" />
          </Col>
        </Row>
        <Row xs='1' sm='3' className="hm-ct-2-sm-img">
          <Col className='hm-xt-2-box-1'>
            <button>Customization</button>
            <h4>Customize Solution as per your requirement</h4>
            <Link to="/components/Overview">Read More</Link>
          </Col>
          <Col className='hm-xt-2-box-2'>
            <button>PLANS</button>
            <h4>Enterprise Plans - PKI SIM</h4>
            <a href="http://localhost:5174/order" target="_blank" rel="noopener noreferrer">Order Now</a>
          </Col>
          <Col className='hm-xt-2-box-3'>
            <button> R&D </button>
            <h4>Publications</h4>
            <Link to="/components/Research_Collaboration" 
            target="_blank" rel="noopener noreferrer"
            >Read Now</Link>
          </Col>
        </Row>
      </Container>
      <div className="home-content-1">
        <h1>Stepping stones to<br /> success</h1>
        <p>We are on a mission to digitally enpower organizations accross sizes,<br /> scales, ages or industries</p>
      </div>

      <Container className="home-content-4">
        <Row xs="1" sm="2" md="3">
          <Col>
            <RxBarChart />
            <h6>Extension Reach</h6>
            <p>Nationwide fiber and 4G/5G coverage</p>
          </Col>
          <Col>
            <AiOutlineGlobal />
            <h6>Future-Ready Network</h6>
            <p>Resilient 4G/5G architecture, ready with dual stack all IP network</p>
          </Col>
          <Col>
            <TbTruckDelivery />
            <h6>Seamless Delivery</h6>
            <p>Swilt order to-delivery with zero touch provisioning and digital onboarding</p>
          </Col>
          <Col>
            <BsPersonWorkspace />
            <h6>Quality of Services</h6>
            <p>Best-in-Class assurance, quick field response, and 24x7 proactive monitoring</p>
          </Col>
          <Col>
            <BsFileTextFill />
            <h6>Digital Self-care</h6>
            <p>DIY portal to manage services, online billing. ralse request, track status and more</p>
          </Col>
          <Col>
            <GiDigitalTrace />
            <h6>Digital Ecosystem</h6>
            <p>Transform the way your customers, suppliers, and employees Interact</p>
          </Col>
        </Row>
      </Container>


      <Callback />
      <StillHaveAnyQs />

      <div className="tell-us-about-your-visit">
        <div className="tell-us-about-your-visit-box">
          <h1>Tell us about your visit</h1>
          <h4>Please select the emoji that best describes your experience here.</h4>
          <div className="emojies">
           <button>😡</button>
           <button>😣</button>
           <button>😑</button>
           <button>🙂</button>
           <button>😍</button>
          </div>
        </div>

      </div>
      {/* <div className='home-last-border'></div> */}
    </div>
  )
}

export default Home

import React, { Fragment, useEffect, useState } from 'react'
import { FaSimCard } from "react-icons/fa";
import { IoFingerPrintOutline } from "react-icons/io5";
import { PiSimCardDuotone } from "react-icons/pi";
import { MdBlock, MdMyLocation, MdOutlineCurrencyExchange, MdOutlineSimCardDownload, MdGMobiledata } from "react-icons/md";
import { RiSimCard2Line } from "react-icons/ri";
import { GiCardExchange } from "react-icons/gi";
import { GrTransaction } from "react-icons/gr";
import "@/css/UserDashboard.css"
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Loader from '../layouts/Loader';

const UserDashboard = () => {

    const [response,setResponse]=useState(null);
    const[isloading,setisLoading]=useState(true);
    const id = useSelector(((state) => state.auth.user.id));
    useEffect(() => {
        const fetchData = async () => {
            try {
                
                const result = await axios.get(`http://localhost:2705/api/sims/get/sims/user/${id}`);
                setResponse(result.data);
                setisLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [id]);
    const [servicesActive, setServicesActive] = useState(0);
    const selectServices = (index) => {
        setServicesActive(index);
    };
    return (
        
        <Fragment>
            {isloading?<Loader/>:
            <div className="dashboard d-flex">

                <section className='left-section-dashboard col-4 d-flex flex-column'>
                    <h3>My Services</h3>
                    {response && response.length > 0 ? 
                        (response.map((simItem, index) => (
                                <div key={index} className={`services ${servicesActive === index ?'active-services' : ''}`} onClick={() => selectServices(index)}>
                                 <FaSimCard />
                                <div>
                                    <h5>{simItem.simNumber}</h5>
                                    <p>{simItem.profileName}</p>
                                    <p>{simItem.status}</p>
                                </div>
                                </div>
                        )))
                     :
                     <div className='no-services'>
                     <h3>NO SIM</h3>
                     </div>
                    }
                    <hr />
                    <button type='button'>Link account</button>
                </section>

                <section className='middle-section-dashboard col-5'>
                    {response && response.length > 0 ?
                        
                        (response.map((packs, index) => (<div key={packs.user_id}>
                            <div className={`digital-signature dashboard-box-decoration ${servicesActive === index ? '' : 'display-packs-none'}`}>
                                <h5 className='d-flex justify-content-between'>Digital Signature
                                    <IoFingerPrintOutline />
                                </h5>
                                <h3>{packs.profileName}</h3>
                                <h6>No Details</h6>
                            </div>
                            <div className={`packs dashboard-box-decoration ${servicesActive === index ? '' : 'display-packs-none'}`}>
                                <p>Packs</p>
                                <div className='pack-value'>
                                    <h3>₹{packs.servicePlanEntity.price}</h3>
                                    <button disabled className={`${packs.status === 'active' ? 'active' : 'inactive'}`}>{packs.status}</button>
                                </div>
                                <div className='pack-details'>
                                    <div>
                                        <p>Data</p>
                                        <h6>{packs.servicePlanEntity.data}</h6>
                                    </div>
                                    <div>
                                        <p>Calls</p>
                                        <h6>{packs.servicePlanEntity.calls}</h6>
                                    </div>
                                    <div>
                                        <p>SMS</p>
                                        <h6>{packs.servicePlanEntity.sms}</h6>
                                    </div>
                                </div>
                                <div className='pack-valadity'>
                                    <p>Valid Till</p>
                                    {/* <h5>{packs.vaslidity}</h5> */}
                                </div>
                            </div>
                            <div className={`pack-usage dashboard-box-decoration ${servicesActive === index ? '' : 'display-packs-none'}`}>
                                <h6>Usage</h6>
                                <p>Calls</p>
                                <h5>{packs.servicePlanEntity.calls}</h5>
                                <div className='usage-bar'></div>

                                <p>Daily SMS</p>
                                <h5>{packs.servicePlanEntity.sms.substring(0, packs.servicePlanEntity.sms.indexOf('/'))} of {packs.servicePlanEntity.sms.substring(0, packs.servicePlanEntity.sms.indexOf('/'))} left</h5>
                                <div className='usage-bar'></div>
                                <p className='under-bar-para'>Auto-renews every day at midnight till {packs.vaslidity}</p>
                                <p>Daily Data</p>
                                <h5>{packs.servicePlanEntity.data.substring(0, packs.servicePlanEntity.data.indexOf('B') + 1)} of {packs.servicePlanEntity.data.substring(0, packs.servicePlanEntity.data.indexOf('B') + 1)} left</h5>
                                <div className='usage-bar'></div>
                                <p className='under-bar-para'>Auto-renews every day at midnight till {packs.vaslidity}</p>
                            </div>
                        </div>)))
                        :
                        <div className='no-packs'>
                            <img src="/Images/Login/sim.gif" alt="SIM"/>
                            <button type='button'>GET A NEW SIM</button>
                        </div>}




                </section>

                <section className='right-section-dashboard col-3'>
                {response && response.length===0?
               <></>
               :
                    <div className="quick-action dashboard-box-decoration">
                        <h4>QUICK ACTIONS</h4>
                        <ul>
                            <Link to="/"><li><span className='quick-action-icons'><PiSimCardDuotone /></span>
                                <h6>Upgrade SIM <p>Switch to a new digital SIM for free</p></h6>
                                <span>&#129170;</span>
                            </li></Link>
                            <Link to="/"><li><span className='quick-action-icons'><MdMyLocation /></span>
                                <h6>Locate SIM<p>Track the location of the SIM</p></h6>
                                <span>&#129170;</span>
                            </li></Link>
                            <Link to="/"><li><span className='quick-action-icons'><MdBlock /></span>
                                <h6>Block SIM<p>Block the SIM and its services</p></h6>
                                <span>&#129170;</span>
                            </li></Link>
                            <Link to="/"><li><span className='quick-action-icons'><RiSimCard2Line /></span>
                                <h6>Get New SIM<p>Get a new SIM</p></h6>
                                <span>&#129170;</span>
                            </li></Link>
                            <Link to="/"><li><span className='quick-action-icons'><GiCardExchange /></span>
                                <h6>Change Number<p>Cchange the number of the current SIM</p></h6>
                                <span>&#129170;</span>
                            </li></Link>
                            <Link to="/"><li><span className='quick-action-icons'>< MdOutlineSimCardDownload /></span>
                                <h6>Prepaid to Postpaid<p>Enjoy your unlimited services</p></h6>
                                <span>&#129170;</span>
                            </li></Link>

                            <Link to="/"><li><span className='quick-action-icons'><MdOutlineCurrencyExchange /></span>
                                <h6>Recharge<p>Recharge you Jio services, buy data & more</p></h6>
                                <span>&#129170;</span>
                            </li></Link>
                            <Link to="/"><li><span className='quick-action-icons'>< MdGMobiledata /></span>
                                <h6>Data Ad-on Only<p>Get more data when needed</p></h6>
                                <span>&#129170;</span>
                            </li></Link>
                            <Link to="/"><li><span className='quick-action-icons'><GrTransaction /></span>
                                <h6>Trancation History<p>All the transaction histoy made</p></h6>
                                <span>&#129170;</span>
                            </li></Link>

                        </ul>
                    </div>
                    }
                </section>
               
            </div>}
        </Fragment>
    )
}

export default UserDashboard

import React, { useState } from 'react';
import "../../css/Resources.css";
import { FaArrowRight } from "react-icons/fa";
import { IoIosPaper } from "react-icons/io";
import { HiDocumentText } from "react-icons/hi";
import { GoVideo } from "react-icons/go";
import { RiNewspaperFill, RiArticleFill, RiQuestionnaireFill } from "react-icons/ri";
import { IoDocument, IoCall } from "react-icons/io5";
import { AiFillMessage } from "react-icons/ai";
import { GrNext, GrPrevious } from "react-icons/gr";
import { ResourceData } from "../../data/ResourcsData"
import ReactDOMServer from "react-dom/server";
import {useNavigate } from 'react-router-dom';

const Resources = () => {
    const navigate = useNavigate();
    const [selectedService, setSelectedService] = useState("Service1");
    const [selectedResources, setSelectedResources] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const services = [
        { id: "Service1", label: "All Services" },
        { id: "Service2", label: "Business Applications" },
        { id: "Service3", label: "Connectivity" },
        { id: "Service4", label: "Internet of Things" },
        { id: "Service5", label: "Marketing Solutions" },
        { id: "Service6", label: "Mobility" },
        { id: "Service7", label: "Security" },
        { id: "Service8", label: "Voice & Collaboration" }
    ];
    const resources = [
        { id: "Resources1", icon: <RiArticleFill />, label: "Article" },
        { id: "Resources2", icon: <IoDocument />, label: "Case Study" },
        { id: "Resources3", icon: <HiDocumentText />, label: "Infographic" },
        { id: "Resources4", icon: <IoIosPaper />, label: "Leaflet" },
        { id: "Resources5", icon: <GoVideo />, label: "Service Video" },
        { id: "Resources6", icon: <GoVideo />, label: "Use Case" },
        { id: "Resources7", icon: <RiNewspaperFill />, label: "Whitepaper" }
    ];

    const filteredData = ResourceData.filter((data) => {
        // Service filter: If "All Services" is selected, include everything
        const matchesService = selectedService === "Service1" || data.service === services.find(s => s.id === selectedService)?.label;

        // Resource filter: If no resources are selected, include everything
        const matchesResource = selectedResources.length === 0 || selectedResources.includes(resources.find(r => r.label === data.resourse)?.id);

        return matchesService && matchesResource;
    });

    const handleCheckboxChange = (event) => {
        const { value, checked } = event.target;
        setSelectedResources((prevSelected) =>
            checked ? [...prevSelected, value] : prevSelected.filter((id) => id !== value)
        );
        setCurrentPage(1);
    };

    const clearCheckedResources = () => {
        setSelectedResources([]);
    };

    const navigateToResoursePage=(data)=>{
        const serializedData = JSON.stringify({
            ...data,
            content: ReactDOMServer.renderToString(data.content), // Convert JSX to HTML string
        });
    
        // Encode with UTF-8 support
        const encodedData = encodeURIComponent(
            window.btoa(unescape(encodeURIComponent(serializedData)))
        );
    
        window.open(`/components/Resources/page?data=${encodedData}`, "_blank"); // Open in new tab
    }

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className='resources'>

            <div className='heading'>
                <h1>Resources</h1>
                <h5>Increase productivity, scalability, and reliability with full-range connectivity services, all available under one roof.</h5>
            </div>
            <div className="content">
                <div className='side-bar'>
                    <h5>Service type</h5>
                    {services.map(service => (
                        <label key={service.id} className="form-check-label" htmlFor={service.id}>
                            <input
                                className="form-check-input"
                                type="radio"
                                name="service-type"
                                id={service.id}
                                value={service.id}
                                checked={selectedService === service.id}
                                onChange={(e) => setSelectedService(e.target.value)}
                            />
                            {service.label}
                        </label>
                    ))}
                    <hr />
                    <h5>Resource types <span onClick={clearCheckedResources}>Clear</span></h5>
                    {resources.map(resource => (
                        <label key={resource.id} className="form-check-label" htmlFor={resource.id}>
                            <input
                                className="form-check-input"
                                type="checkbox"
                                name="resource-type"
                                id={resource.id}
                                value={resource.id}
                                checked={selectedResources.includes(resource.id)}
                                onChange={handleCheckboxChange}
                            />
                            {resource.label}
                        </label>
                    ))}

                </div>

                <div className="card-content-container">
                    <p className='showing'>Showing {filteredData.length} of <strong>{services.find(s => s.id === selectedService)?.label}</strong></p>
                    <div className='cards-container'>
                        {paginatedData.map(data => (
                            <div className='card' key={data.id} onClick={()=>navigateToResoursePage(data)}>
                                <span className='resource-type'>{resources.find(item => item.label === data.resourse)?.icon} {data.resourse}</span>
                                <div className="image-container">
                                    <img src={data.image} />
                                </div>
                                <span className='service-type'>{data.service}</span>
                                <h3>{data.title}</h3>
                                <div className="arrow">
                                    <span className='svg-arrow'><FaArrowRight /></span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <p className='showing'>Showing {currentPage * 6} of {filteredData.length} results found</p>

                    {totalPages > 1 && (
                        <div className="card-pagination">
                            <button
                                onClick={() => setCurrentPage(prev => prev - 1)}
                                disabled={currentPage === 1}
                                className='nav-button'
                            >
                                <GrPrevious />
                            </button>

                            <button
                                onClick={() => setCurrentPage(1)}
                                className={currentPage === 1 ? "active" : ""}
                            >
                                1
                            </button>

                            {currentPage > 3 && <span>...</span>}

                            {Array.from({ length: totalPages }, (_, index) => index + 1)
                                .filter(page =>
                                    page !== 1 && page !== totalPages &&
                                    (page >= currentPage - 1 && page <= currentPage + 1)
                                )
                                .map(page => (
                                    <button
                                        key={page}
                                        className={currentPage === page ? "active" : ""}
                                        onClick={() => setCurrentPage(page)}
                                    >
                                        {page}
                                    </button>
                                ))}
                            {currentPage < totalPages - 2 && <span>...</span>}

                            <button
                                onClick={() => setCurrentPage(totalPages)}
                                className={currentPage === totalPages ? "active" : ""}
                            >
                                {totalPages}
                            </button>

                            <button
                                onClick={() => setCurrentPage(prev => prev + 1)}
                                disabled={currentPage === totalPages}
                                className='nav-button'
                            >
                                <GrNext />
                            </button>
                        </div>
                    )}

                </div>
            </div>

            <div className="need-guidance">
                <h1>Need guidance?</h1>
                <h5>We’d love to help you.</h5>
                <div className="contact-type">
                    <button type='button'><RiQuestionnaireFill />Enquire</button>
                    <button type='button'><AiFillMessage />Email</button>
                    <button type='button'><IoCall />Call us</button>
                </div>
            </div>
            
        </div>
    )
}

export default Resources


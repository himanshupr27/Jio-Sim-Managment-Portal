import React, { useEffect, useRef, useState } from 'react'
import "../../css/ResearchCollaboration.css";
import { IoIosArrowRoundForward } from "react-icons/io";
import { ImCross } from "react-icons/im";
import { researchPaper, patents, whitePaper } from "../../data/Publications.jsx"

import { pdfjs } from 'react-pdf';
import PdfView from '../layouts/PdfView';
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
).toString();


const ResearchCollaboration = () => {
    const [pdf, setPdf] = useState();
    const [publicationlist, setPublicationlist] = useState(1);
    const [publicationData,setPublicationData]= useState(researchPaper);
    const [pdfView, setPdfView] = useState(false);
    const openPDF = (name) => {
        // setPdf(name);
        // setPdfView(true);
        const url = `/Files/${name}`;
        window.open(url, '_blank');
    };
    const underlineRef = useRef();
    const itemRefs = [useRef(), useRef(), useRef()];

    const handleselectlist = (index) => {
        setPublicationlist(index);
        if(index==1){
            setPublicationData(researchPaper);
        }
        if(index==2){
            setPublicationData(patents);
        }
        if(index==3){
            setPublicationData(whitePaper);
        }
    };

    useEffect(() => {
        const currentItem = itemRefs[publicationlist - 1]?.current;
        const underline = underlineRef.current;

        if (currentItem && underline) {
            underline.style.width = `${currentItem.offsetWidth + 6}px`;
            underline.style.left = `${currentItem.offsetLeft - 3}px`;
        }
    }, [publicationlist]);

    return (
        <div className='research'>
            <h1 className='heading'>Publications</h1>
            <div className="sub-catagory">
                <ul className="catagory-list">
                    <li
                        ref={itemRefs[0]}
                        className={publicationlist === 1 ? 'list-bold' : ''}
                        onClick={() => handleselectlist(1)}
                    >
                        Research Papers
                    </li>
                    <li
                        ref={itemRefs[1]}
                        className={publicationlist === 2 ? 'list-bold' : ''}
                        onClick={() => handleselectlist(2)}
                    >
                        Patents
                    </li>
                    <li
                        ref={itemRefs[2]}
                        className={publicationlist === 3 ? 'list-bold' : ''}
                        onClick={() => handleselectlist(3)}
                    >
                        White Papers
                    </li>
                    <div className="underline" ref={underlineRef}></div>
                </ul>
            </div>
            <div className="research-container">
                {publicationData && publicationData.map((data, index) => (
                <div className="research-box" onClick={() => openPDF(`${data.pdf}`)} key={data.id}>
                    <div className="image-container">
                        <img src={`/Images/ResearchCollaboration/${data.img}`} alt='image' />
                    </div>
                    <h3>{data.heading}</h3>
                    <div className="arrow">
                        <span className='svg-arrow'><IoIosArrowRoundForward /></span>
                    </div>
                </div>
                ))}

            </div>
            <div className={`pdf-container ${pdfView ? "" : "hidden"}`}>
                <ImCross onClick={() => { setPdfView(false) }} />
                <PdfView pdf={pdf} />
            </div>
        </div>
    )
}

export default ResearchCollaboration

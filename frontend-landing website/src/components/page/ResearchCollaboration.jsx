import React,{ useState }  from 'react'
import "../../css/ResearchCollaboration.css";
import { IoIosArrowRoundForward } from "react-icons/io";
import { ImCross } from "react-icons/im";

import { pdfjs } from 'react-pdf';
import PdfView from '../layouts/PdfView';
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
  ).toString();


const ResearchCollaboration = () => {
    const[pdf,setPdf]=useState();
    const[pdfView, setPdfView]=useState(false);
    const openPDF = (name) => {
        setPdf(name);
        setPdfView(true);
      };
     
    return (
        <div className='research'>
            <h1 className='heading'>Publications</h1>
            <div className="research-container">
                <div className="research-box" onClick={()=>openPDF("483692_Spec_merged.pdf")}>
                    <div className="image-container">
                        <img src='/Images/ResearchCollaboration/Pub-1.jpg' alt='image' />
                    </div>
                    <h3>System and method for identity management</h3>
                    <div className="arrow">
                        <span className='svg-arrow'><IoIosArrowRoundForward/></span>
                    </div>
                </div>
                <div className="research-box" onClick={()=>openPDF("549929_Spec_merged.pdf")}>
                    <div className="image-container">
                        <img src='/Images/ResearchCollaboration/Pub-3.1.jpg' alt='image' />
                    </div>
                    <h3>System and method of intelligent edge routing</h3>
                    <div className="arrow">
                        <span className='svg-arrow'><IoIosArrowRoundForward/></span>
                    </div>
                </div>
                <div className="research-box" onClick={()=>openPDF("557483_Spec_merged.pdf")}>
                    <div className="image-container">
                        <img src='/Images/ResearchCollaboration/Pub-2.1.jpg' alt='image' />
                    </div>
                    <h3>System and method for enablinig a sim card as a micro-platform</h3>
                    <div className="arrow">
                        <span className='svg-arrow'><IoIosArrowRoundForward/></span>
                    </div>
                </div>
            </div>
            <div className={`pdf-container ${pdfView ? "" : "hidden"}`}>
            <ImCross onClick={()=>{setPdfView(false)}}/>
            <PdfView pdf={pdf}/>
            </div>
        </div>
    )
}

export default ResearchCollaboration

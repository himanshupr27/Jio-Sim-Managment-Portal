import { useState } from 'react';
import { Document, Page } from 'react-pdf';
import "../../css/ResearchCollaboration.css";

function PdfView({ pdf }) {
const [numPages, setNumPages] = useState(null);
const [pageNumber, setPageNumber] = useState(1);

function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
}

return (
    <div className='pdf-box'>

        <Document file={`/Files/${pdf}`} onLoadSuccess={onDocumentLoadSuccess} className="pdf-View">
            {Array.from({ length: numPages }, (_, i) => (
                <Page 
                    key={i + 1} 
                    pageNumber={i + 1} 
                    renderTextLayer={false} 
                    renderAnnotationLayer={false} 
                />
            ))}
        </Document>
        <p className='page-number'>
            Page {pageNumber} of {numPages}
        </p>
    </div>
);
}
export default PdfView;
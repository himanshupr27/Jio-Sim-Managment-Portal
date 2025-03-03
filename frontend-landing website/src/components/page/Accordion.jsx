import React, { useState } from "react";
import "@/css/StillHaveAnyQs.css";
import { FaPlus, FaMinus } from 'react-icons/fa';

const Accordion = ({ questions }) => {
  const [isOpen, setIsOpen] = useState(null);

  const toggleAccordion = (index) => {
    setIsOpen(isOpen === index ? null : index);
  };

  return (
    <>
      {questions.map((data, index) => (
        <div
          className={`question-item ${isOpen === index ? "active" : ""}`} 
          key={index}
        >
          <div className="question-header" onClick={() => toggleAccordion(index)}>
            <h5>{data.title}</h5>
            <span>{isOpen === index ? <FaMinus /> : <FaPlus />}</span>
          </div>
          {isOpen === index && ( 
            <div className="question-content">
              {data.content.map((item, idx) => {
                if (item.type === "paragraph") {
                  return (
                    <p key={idx} dangerouslySetInnerHTML={{ __html: item.text }} />
                  );
                } else if (item.type === "numeric-list") {
                  return (
                    <ol key={idx}>
                      {item.items.map((listItem, i) => (
                        <li key={i}>{listItem}</li>
                      ))}
                    </ol>
                  );
                } else if (item.type === "alphabetic-list") {
                  return (
                    <ul style={{ listStyleType: "lower-alpha" }} key={idx}>
                      {item.items.map((listItem, i) => (
                        <li key={i}>{listItem}</li>
                      ))}
                    </ul>
                  );
                } else if (item.type === "bullet-list") {
                  return (
                    <ul key={idx}>
                      {item.items.map((listItem, i) => (
                        <li key={i}>{listItem}</li>
                      ))}
                    </ul>
                  );
                }
                return null;
              })}
            </div>
          )}
          <hr />
        </div>
      ))}
    </>
  );
};

export default Accordion;

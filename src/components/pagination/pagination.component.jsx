import React from "react";
import "./pagination.styles.css";

const Pagination = ({ pagesList, payloadPage, setPage }) => {
  return (
    <>
      <div className="pages-container">
        {pagesList.length > 0 &&
          pagesList.map((pg, index) => (
            <div
              key={`${pg}_${index}`}
              className={`pg-btn-2 ${
                payloadPage === pg ? "active-page-num" : ""
              }`}
              onClick={() => setPage(pg)}
            >
              <span className="pageNumbers">{pg}</span>
            </div>
          ))}
      </div>
    </>
  );
};

export default Pagination;

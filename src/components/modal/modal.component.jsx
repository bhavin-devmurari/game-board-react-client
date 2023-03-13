import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import "./modal.styles.css";

const Modal = ({ closeModal, children, handleModalCloseBtn }) => {
  // useEffect(() => {
  //   document.body.style.overflowY = "hidden";
  //   return () => {
  //     document.body.style.overflowY = "scroll";
  //   };
  // }, []);
  return (
    <>
      {/* <div className="modal-wrapper" onClick={closeModal}></div> */}
      <div className="modal-wrapper"></div>
      <div className="modal-container">
        {children}
        {handleModalCloseBtn}
      </div>
    </>
  );
  // return ReactDOM.createPortal(
  //   <>
  //     {/* <div className="modal-wrapper" onClick={closeModal}></div> */}
  //     <div className="modal-wrapper"></div>
  //     <div className="modal-container">
  //       {children}
  //       {handleModalCloseBtn}
  //     </div>
  //   </>,
  //   document.querySelector(".g-board-modal")
  // );
};

export default Modal;

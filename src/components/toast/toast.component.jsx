import React, { useEffect, useState } from "react";
import { alertType, toastType } from "../../config";
import "./toast.styles.css";

const Toast = (props) => {
  //setViewToast
  const [viewToast, setViewToast] = useState(true);
  const { type, position, title, message, setShowToast } = props;
  const toastConfig = toastType(type);

  useEffect(() => {
    let timeoutID = null;
    if (type !== alertType.ERROR) {
      if (viewToast) {
        timeoutID = setTimeout(() => {
          setViewToast(false);
          setShowToast();
        }, 3000);
      }
    }

    return () => {
      timeoutID !== null && clearTimeout(timeoutID);
    };
  }, [viewToast]);

  const deleteToast = () => {
    setViewToast(false);
    setShowToast();
  };
  return (
    viewToast && (
      <div className={`notification-container ${position}`}>
        <div
          className={`notification toast ${position}`}
          style={{ backgroundColor: toastConfig.backgroundColor }}
        >
          <button onClick={() => deleteToast()}>X</button>
          <div className="notification-image">{toastConfig.icon()}</div>
          <div>
            <p className="notification-title">{title}</p>
            <p className="notification-message">{message}</p>
          </div>
        </div>
      </div>
    )
  );
};
export default Toast;

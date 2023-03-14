import { addDays, format, subDays } from "date-fns";
import {
  MdCheckCircleOutline,
  MdReportProblem,
  MdOutlineInfo,
  MdOutlineErrorOutline,
} from "react-icons/md";

export const getTitleText = (camelCaseText) => {
  const result = camelCaseText.replace(/([A-Z])/g, " $1");
  const finalResult = result.charAt(0).toUpperCase() + result.slice(1);
  return finalResult;
};

export const initialQueryParm = Object.freeze({
  PAGE: 1,
  LIMIT: 5,
  SEARCH_TERM: "",
  START_DATE: subDays(new Date(), 30),
  END_DATE: addDays(new Date(), 7),
});

export const clientSideDate = (date) => {
  return format(new Date(date), "d-MM-yyyy");
};

export const toastPosition = Object.freeze({
  TOP_RIGHT: "top-right",
  TOP_LEFT: "top-left",
  BOTTOM_RIGHT: "bottom-right",
  BOTTOM_LEFT: "bottom-left",
});

export const alertType = Object.freeze({
  INFO: "info",
  WARNING: "warning",
  ERROR: "error",
  SUCCESS: "success",
});

export const toastType = (type) => {
  let toastProp = {};
  switch (type) {
    case alertType.SUCCESS:
      toastProp = {
        backgroundColor: "#5cb85c",
        icon: () => <MdCheckCircleOutline size={25} />,
      };
      break;
    case alertType.ERROR:
      toastProp = {
        backgroundColor: "#d9534f",
        icon: () => <MdOutlineErrorOutline size={25} />,
      };
      break;
    case alertType.INFO:
      toastProp = {
        backgroundColor: "#5bc0de",
        icon: () => <MdOutlineInfo size={25} />,
      };
      break;
    case alertType.WARNING:
      toastProp = {
        backgroundColor: "#f0ad4e",
        icon: () => <MdReportProblem size={25} />,
      };
      break;
    default:
      toastProp = {};
  }
  return toastProp;
};

export { httpClient } from "./http.common";
export { navItems } from "./menu.item";

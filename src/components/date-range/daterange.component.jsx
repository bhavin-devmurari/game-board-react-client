import { useEffect, useRef, useState } from "react";
import { DateRange } from "react-date-range";
import { clientSideDate, initialQueryParm } from "../../config";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "./datarange.styles.css";

const DateRangeSelector = ({ returnToParent }) => {
  const [range, setRange] = useState([
    {
      startDate: initialQueryParm.START_DATE,
      endDate: initialQueryParm.END_DATE,
      key: "selection",
    },
  ]);

  const [open, setOpen] = useState(false);
  const refOne = useRef(null);

  useEffect(() => {
    document.addEventListener("keydown", hideOnEscape, true);
    document.addEventListener("click", hideOnClickOutside, true);
  }, []);

  const hideOnEscape = (e) => {
    if (e.key === "Escape") {
      setOpen(false);
    }
  };

  // Hide on outside click
  const hideOnClickOutside = (e) => {
    if (refOne.current && !refOne.current.contains(e.target)) {
      setOpen(false);
    }
  };

  const onDateChangeHandler = (item) => {
    setRange([item.selection]);
    returnToParent([item.selection]);
  };
  const dateParsed =
    clientSideDate(range[0].startDate) +
    " to " +
    clientSideDate(range[0].endDate);
  return (
    <div className="calendarWrap">
      <input
        value={`${range ? dateParsed : "Select date range"}`}
        // value={`
        //   ${format(range[0].startDate, "MM/dd/yyyy")} to
        //   ${format(range[0].endDate, "MM/dd/yyyy")}`
        // }
        readOnly
        className="inputBox"
        onClick={() => setOpen((open) => !open)}
      />

      <div ref={refOne}>
        {open && (
          <DateRange
            // onChange={(item) => setRange([item.selection])}
            onChange={(item) => onDateChangeHandler(item)}
            editableDateInputs={true}
            moveRangeOnFirstSelection={false}
            ranges={range}
            months={1}
            direction="horizontal"
            className="calendarElement"
            color="#fa7046"
            rangeColors={["#fa7046", "#e6a38f", "#fed14c"]}
          />
        )}
      </div>
    </div>
  );
};

export default DateRangeSelector;

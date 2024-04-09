import { useContext } from "react";
import "./MonthSelect.css";
import { CalendarContext } from "../../contexts/CalendarContext";

function MonthSelect() {
  const { goToNextMonth, goToPreviousMonth, currMonthName } =
    useContext(CalendarContext);

  return (
    <>
      <div className="SubMonthsContainer">
        <button onClick={() => goToPreviousMonth()} type="button">
          Prev
        </button>
      </div>

      <div className="CalendarMonth">{currMonthName}</div>

      <div className="AddMonthsContainer">
        <button onClick={() => goToNextMonth()} type="button">
          Next
        </button>
      </div>
    </>
  );
}

export default MonthSelect;

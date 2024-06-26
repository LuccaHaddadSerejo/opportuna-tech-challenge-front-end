import { useContext } from "react";
import "./SelectedDayDisplay.css";
import { CalendarContext } from "../../contexts/CalendarContext";

function SelectedDayDisplay() {
  const { selectedDate } = useContext(CalendarContext);

  return (
    <>
      <button className="CurrentSelectedDay">
        <>
          {selectedDate.date.toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </>
      </button>
    </>
  );
}

export default SelectedDayDisplay;

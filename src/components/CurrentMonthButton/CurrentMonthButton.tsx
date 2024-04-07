import { useContext } from "react";
import "./CurrentMonthButton.css";
import { CalendarContext } from "../../contexts/CalendarContext";

// Go to current month
function CurrentMonthButton() {
  const { goToCurrMonth } = useContext(CalendarContext);

  return (
    <>
      <button onClick={() => goToCurrMonth()} className="CurrentMonthButton">
        Current
      </button>
    </>
  );
}

export default CurrentMonthButton;

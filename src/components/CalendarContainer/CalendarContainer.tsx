import "./CalendarContainer.css";

// Mocks (Abril 2024)
const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const daysOfPrevMonth = [31];
const daysInMonth = Array.from({ length: 30 }, (_, i) => i + 1);
const daysOfNextMonth = [1, 2, 3, 4];

function Calendar() {
  return (
    <>
      <div className="CalendarApp">
        {weekDays.map((weekDayObject, weekdayindex) => {
          return (
            <div className="WeekDays" key={weekdayindex}>
              {weekDayObject}
            </div>
          );
        })}

        {daysOfPrevMonth.map((prevMonthDay) => {
          return (
            <button className="PrevMonth" key={prevMonthDay}>
              {prevMonthDay}
            </button>
          );
        })}

        {daysInMonth.map((currentDayDate) => {
          return (
            <button className={"MonthlyDay"} key={currentDayDate}>
              {currentDayDate}
            </button>
          );
        })}

        {daysOfNextMonth.map((nextMonthDay) => {
          return (
            <button className="NextMonth" key={nextMonthDay}>
              {nextMonthDay}
            </button>
          );
        })}
      </div>
    </>
  );
}

export default Calendar;

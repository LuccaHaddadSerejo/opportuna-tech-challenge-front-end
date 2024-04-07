import { useContext, useEffect } from "react";
import "./CalendarContainer.css";
import { CalendarContext } from "../../contexts/CalendarContext";

function Calendar() {
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const {
    calendarMonth,
    currMonth,
    monthData,
    setCurrMonthName,
    monthNames,
    setCalendarMonth,
    changeSelectedDate,
  } = useContext(CalendarContext);

  useEffect(() => {
    const lastDayOfCurrMonthValue = new Date(
      new Date().getFullYear(),
      currMonth,
      0
    ).getDay();
    const firstDayOfCurrMonthValue = new Date(
      new Date().getFullYear(),
      currMonth - 1,
      1
    ).getDay();

    setCalendarMonth({
      daysOfPrevMonth:
        firstDayOfCurrMonthValue === 0
          ? []
          : currMonth === 1
          ? Array.from({ length: monthData["12"] }, (_, i) => i + 1).slice(
              -firstDayOfCurrMonthValue
            )
          : Array.from(
              { length: monthData[String(currMonth - 1)] },
              (_, i) => i + 1
            ).slice(-firstDayOfCurrMonthValue),
      daysOfCurrMonth: Array.from(
        { length: monthData[String(currMonth)] },
        (_, i) => i + 1
      ),
      daysOfNextMonth: Array.from(
        { length: 6 - lastDayOfCurrMonthValue },
        (_, i) => i + 1
      ),
    });

    setCurrMonthName(monthNames[currMonth - 1]);
  }, [currMonth]);

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

        {calendarMonth.daysOfPrevMonth.map((prevMonthDay) => {
          return (
            <button
              onClick={() => changeSelectedDate(prevMonthDay)}
              className="PrevMonth"
              key={prevMonthDay}>
              {prevMonthDay}
            </button>
          );
        })}

        {calendarMonth.daysOfCurrMonth.map((currentDayDate) => {
          return (
            <button
              onClick={() => changeSelectedDate(currentDayDate)}
              className={"MonthlyDay"}
              key={currentDayDate}>
              {currentDayDate}
            </button>
          );
        })}

        {calendarMonth.daysOfNextMonth.map((nextMonthDay) => {
          return (
            <button
              onClick={() => changeSelectedDate(nextMonthDay)}
              className="NextMonth"
              key={nextMonthDay}>
              {nextMonthDay}
            </button>
          );
        })}
      </div>
    </>
  );
}

export default Calendar;

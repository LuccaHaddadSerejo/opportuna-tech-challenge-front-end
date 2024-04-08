import { useContext, useEffect } from "react";
import "./CalendarContainer.css";
import { CalendarContext } from "../../contexts/CalendarContext";
import {
  ReminderState,
  RemindersContext,
} from "../../contexts/RemindersContext";

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
    selectedDate,
    currYear,
  } = useContext(CalendarContext);

  const { filterReminders, reminders, fetchReminders } =
    useContext(RemindersContext);

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

  useEffect(() => {
    fetchReminders();
  }, []);

  useEffect(() => {
    filterReminders(selectedDate.date);
  }, [selectedDate]);

  const changeDateAndFilterReminders = (
    day: number,
    isPrev: boolean,
    isNext: boolean
  ) => {
    changeSelectedDate(day, isPrev, isNext);
    filterReminders(selectedDate.date);
  };

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

        {calendarMonth.daysOfPrevMonth.map((prevMonthDay: number) => {
          const getCorrectDay =
            String(prevMonthDay).length === 1
              ? `0${prevMonthDay}`
              : prevMonthDay;

          const getCompleteDate =
            currMonth < 10
              ? `${currYear}-0${currMonth}-${getCorrectDay}`
              : `${currYear}-${currMonth}-${getCorrectDay}`;

          const filterReminders = reminders.filter(
            (reminder: ReminderState) =>
              reminder.date.split("T")[0] === getCompleteDate
          );

          return (
            <button
              onClick={() =>
                changeDateAndFilterReminders(prevMonthDay, true, false)
              }
              className="PrevMonth"
              key={prevMonthDay}>
              {prevMonthDay}
              <ul>
                {filterReminders.map((reminder: ReminderState) => {
                  return (
                    <li key={reminder.id}>
                      <p>{reminder.title}</p>
                    </li>
                  );
                })}
              </ul>
            </button>
          );
        })}

        {calendarMonth.daysOfCurrMonth.map((currMonthDay) => {
          const getCorrectDay =
            String(currMonthDay).length === 1
              ? `0${currMonthDay}`
              : currMonthDay;

          const getCompleteDate =
            currMonth < 10
              ? `${currYear}-0${currMonth}-${getCorrectDay}`
              : `${currYear}-${currMonth}-${getCorrectDay}`;

          const filterReminders = reminders.filter(
            (reminder: ReminderState) =>
              reminder.date.split("T")[0] === getCompleteDate
          );

          return (
            <button
              onClick={() =>
                changeDateAndFilterReminders(currMonthDay, false, false)
              }
              className="MonthlyDay"
              key={currMonthDay}>
              {currMonthDay}
              <ul>
                {filterReminders.map((reminder: ReminderState) => {
                  return (
                    <li
                      className="ReminderInCalendar"
                      style={{
                        backgroundColor: reminder.color,
                      }}
                      key={reminder.id}>
                      <p>{reminder.title}</p>
                    </li>
                  );
                })}
              </ul>
            </button>
          );
        })}

        {calendarMonth.daysOfNextMonth.map((nextMonthDay) => {
          const getCorrectDay =
            String(nextMonthDay).length === 1
              ? `0${nextMonthDay}`
              : nextMonthDay;

          const getCompleteDate =
            currMonth < 10
              ? `${currYear}-0${currMonth + 1}-${getCorrectDay}`
              : `${currYear}-${currMonth + 1}-${getCorrectDay}`;

          const filterReminders = reminders.filter(
            (reminder: ReminderState) =>
              reminder.date.split("T")[0] === getCompleteDate
          );

          return (
            <button
              onClick={() =>
                changeDateAndFilterReminders(nextMonthDay, false, true)
              }
              className="NextMonth"
              key={nextMonthDay}>
              {nextMonthDay}
              <ul>
                {filterReminders.map((reminder: ReminderState) => {
                  return (
                    <li key={reminder.id}>
                      <p>{reminder.title}</p>
                    </li>
                  );
                })}
              </ul>
            </button>
          );
        })}
      </div>
    </>
  );
}

export default Calendar;

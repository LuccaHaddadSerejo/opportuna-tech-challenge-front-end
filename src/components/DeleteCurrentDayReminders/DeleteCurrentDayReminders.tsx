import { useContext } from "react";
import "./DeleteCurrentDayReminders.css";
import { CalendarContext } from "../../contexts/CalendarContext";
import { RemindersContext } from "../../contexts/RemindersContext";

function ReminderDeleteByDate() {
  const { selectedDate } = useContext(CalendarContext);
  const { deleteReminderByDay } = useContext(RemindersContext);

  return (
    <>
      <button
        onClick={() => {
          deleteReminderByDay(selectedDate.date);
        }}
        type="button"
        className="DeleteCDRButton">
        Delete All Reminders
      </button>
    </>
  );
}

export default ReminderDeleteByDate;

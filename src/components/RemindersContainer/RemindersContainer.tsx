import "./RemindersContainer.css";
import ReminderDelete from "../ReminderDelete/ReminderDelete";
import WeatherWidget from "../WeatherWidget/WeatherWidget";
import ReminderEdit from "../ReminderEdit/ReminderEdit";
import { useContext, useEffect } from "react";
import {
  ReminderState,
  RemindersContext,
} from "../../contexts/RemindersContext";
import { CalendarContext } from "../../contexts/CalendarContext";

function Reminders() {
  const {
    filteredReminders,
    filterReminders,
    fetchReminders,
    editedReminderDate,
  } = useContext(RemindersContext);
  const { selectedDate } = useContext(CalendarContext);

  useEffect(() => {
    fetchReminders();
  }, []);

  useEffect(() => {
    filterReminders(selectedDate.date);
  }, [selectedDate, editedReminderDate]);

  return (
    <>
      <ul>
        {filteredReminders.map((reminder: ReminderState) => (
          <li className="Reminder" key={reminder.id}>
            <div className="ReminderTime" style={{ backgroundColor: "" }}>
              {reminder.time}
            </div>
            <div
              className="ReminderTitle"
              style={{
                backgroundColor: reminder.color || "",
                color: "white",
              }}>
              {reminder.title}
            </div>
            <div
              className="ReminderDescription"
              style={{
                backgroundColor: reminder.color || "",
                color: "white",
              }}>
              {reminder.description}
            </div>
            <ReminderEdit
              id={reminder.id}
              time={reminder.time}
              date={reminder.date.split("T")[0]}
              city={reminder.city}
              defaultColor={reminder.color}
            />
            <WeatherWidget
              city={reminder.city.toLowerCase()}
              date={selectedDate.date.toISOString().split("T")[0]}
            />
            <ReminderDelete id={reminder.id} />
          </li>
        ))}
      </ul>
    </>
  );
}

export default Reminders;

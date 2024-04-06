import "./RemindersContainer.css";
import ReminderDelete from "../ReminderDelete/ReminderDelete";
import WeatherWidget from "../WeatherWidget/WeatherWidget";
import ReminderEdit from "../ReminderEdit/ReminderEdit";

function Reminders() {
  return (
    <>
      <ul>
        <li className="Reminder">
          <div className="ReminderTime" style={{ backgroundColor: "" }}>
            12:00
          </div>
          <div
            className="ReminderTitle"
            style={{
              backgroundColor: "blue",
              color: "white",
            }}
          >
            Reminder Title
          </div>
          <div
            className="ReminderDescription"
            style={{
              backgroundColor: "whitesmoke",
              color: "black",
            }}
          >
            Reminder Description
          </div>
          <ReminderEdit />
          <WeatherWidget />
          <ReminderDelete />
        </li>
      </ul>
    </>
  );
}

export default Reminders;

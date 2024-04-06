import { useState } from "react";
import "./ReminderAdd.css";

function ReminderAdd() {
  const [reminderAddPopUp, setReminderAddPopUp] = useState(false);

  return (
    <>
      <button className="AddReminderContainer">Add a reminder</button>
      {reminderAddPopUp && (
        <div className="OutsideContainer">
          <div className="AddReminderPopUp">
            <form id="ReminderAddForm">
              <input
                type="text"
                name="title"
                maxLength={15}
                required
                placeholder="Reminder Title"
              />
              <textarea
                name="description"
                maxLength={30}
                required
                placeholder="Reminder Description"
              />
              <input id="TimeInput" type="time" name="time" required />
              <input
                type="text"
                name="city"
                maxLength={15}
                required
                placeholder="City"
              />
              <div id="ColorPicker">
                {["blue", "red", "green", "yellow", "purple", "orange"].map(
                  (color) => (
                    <label
                      key={color}
                      style={{
                        display: "inline-block",
                        width: "30px",
                        height: "30px",
                        margin: "5px",
                        borderRadius: "50%",
                        cursor: "pointer",
                        backgroundColor: color,
                      }}
                    >
                      <input
                        type="radio"
                        name="color"
                        value={color}
                        required
                        style={{ display: "none" }}
                      />
                    </label>
                  )
                )}
              </div>
              <button type="submit">Confirm</button>
              <button type="button" onClick={() => setReminderAddPopUp(false)}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default ReminderAdd;

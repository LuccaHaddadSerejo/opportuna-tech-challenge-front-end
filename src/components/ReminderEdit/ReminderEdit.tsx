import {
  useState,
  // useContext
} from "react";
import "./ReminderEdit.css";

function ReminderEdit() {
  const [reminderEditPopUp, setReminderEditPopUp] = useState(false);

  return (
    <>
      <button
        className="ReminderEditButton"
        onClick={() => setReminderEditPopUp(true)}
      >
        Edit
      </button>
      {reminderEditPopUp && (
        <div className="OutsideContainer">
          <div className="EditReminderPopUp">
            <form>
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
              <input type="time" name="time" required />
              <input type="date" name="date" required />
              <input
                type="text"
                name="city"
                maxLength={15}
                required
                placeholder="City"
              />
              <div className="ColorPicker">
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
              <button
                type="button"
                onClick={() => {
                  setReminderEditPopUp(false);
                }}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default ReminderEdit;

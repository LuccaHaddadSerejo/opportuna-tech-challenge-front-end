import { useContext, useState } from "react";
import "./ReminderAdd.css";
import { CreateReminder, schema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CalendarContext } from "../../contexts/CalendarContext";
import { RemindersContext } from "../../contexts/RemindersContext";

function ReminderAdd() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateReminder>({
    resolver: zodResolver(schema),
  });

  const { selectedDate } = useContext(CalendarContext);
  const { createReminder } = useContext(RemindersContext);

  const [reminderAddPopUp, setReminderAddPopUp] = useState(false);

  const onSubmit = (data: CreateReminder) => {
    createReminder(data, selectedDate.date);
    setReminderAddPopUp(false);
  };

  return (
    <>
      <button
        onClick={() => setReminderAddPopUp(true)}
        type="button"
        className="AddReminderContainer">
        Add a reminder
      </button>
      {reminderAddPopUp && (
        <div className="OutsideContainer">
          <div className="AddReminderPopUp">
            <form id="ReminderAddForm" onSubmit={handleSubmit(onSubmit)}>
              <input
                {...register("title")}
                type="text"
                maxLength={30}
                required
                placeholder="Reminder Title"
              />
              {errors.title && <span>{errors.title.message}</span>}
              <textarea
                {...register("description")}
                maxLength={30}
                required
                placeholder="Reminder Description"
              />
              {errors.description && <span>{errors.description.message}</span>}
              <input
                {...register("time")}
                id="TimeInput"
                type="time"
                required
              />
              {errors.time && <span>{errors.time.message}</span>}
              <input
                {...register("city")}
                type="text"
                maxLength={15}
                required
                placeholder="City"
              />
              {errors.city && <span>{errors.city.message}</span>}
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
                      }}>
                      <input
                        type="radio"
                        {...register("color")}
                        value={color}
                        style={{ display: "none" }}
                      />
                    </label>
                  )
                )}
              </div>
              {errors.color && <span>{errors.color.message}</span>}
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

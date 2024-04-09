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
    let correctDate = {} as Date;

    if (!selectedDate) {
      correctDate = new Date();
    } else {
      correctDate = selectedDate.date;
    }

    createReminder(data, correctDate);
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
            <form
              data-testid="ReminderAddForm"
              id="ReminderAddForm"
              onSubmit={handleSubmit(onSubmit)}>
              <input
                {...register("title")}
                type="text"
                maxLength={30}
                required
                placeholder="Reminder Title"
                data-testid="title"
              />
              {errors.title && <span>{errors.title.message}</span>}
              <textarea
                {...register("description")}
                maxLength={30}
                required
                placeholder="Reminder Description"
                data-testid="description"
              />
              {errors.description && <span>{errors.description.message}</span>}
              <input
                {...register("time")}
                id="TimeInput"
                type="time"
                required
                data-testid="time"
              />
              {errors.time && <span>{errors.time.message}</span>}
              <input
                {...register("city")}
                type="text"
                maxLength={15}
                required
                placeholder="City"
                data-testid="city"
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
                        data-testid={`color-${color}`}
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

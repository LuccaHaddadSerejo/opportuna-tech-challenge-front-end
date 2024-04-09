import { useContext, useState } from "react";
import "./ReminderEdit.css";
import { UpdateReminder, schema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { RemindersContext } from "../../contexts/RemindersContext";
import { CalendarContext } from "../../contexts/CalendarContext";

interface ReminderEditProps {
  id: number;
  time: string;
  date: string;
  city: string;
  defaultColor: string | null;
}

function ReminderEdit({
  id,
  time,
  date,
  city,
  defaultColor,
}: ReminderEditProps) {
  const checkColor = defaultColor || "";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateReminder>({
    resolver: zodResolver(schema),
  });

  const { updateReminder } = useContext(RemindersContext);

  const { selectedDate } = useContext(CalendarContext);

  const [reminderEditPopUp, setReminderEditPopUp] = useState(false);

  const onSubmit = (data: UpdateReminder) => {
    updateReminder(id, data, selectedDate.date);
    setReminderEditPopUp(false);
  };

  return (
    <>
      <button
        className="ReminderEditButton"
        onClick={() => setReminderEditPopUp(true)}>
        Edit
      </button>
      {reminderEditPopUp && (
        <div className="OutsideContainer">
          <div className="EditReminderPopUp">
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                {...register("time")}
                type="time"
                name="time"
                defaultValue={time}
              />
              {errors.time && <span>{errors.time.message}</span>}
              <input
                {...register("date")}
                type="date"
                name="date"
                defaultValue={date}
              />
              {errors.date && <span>{errors.date.message}</span>}
              <input
                {...register("city")}
                type="text"
                name="city"
                maxLength={15}
                placeholder="City"
                defaultValue={city}
              />
              {errors.city && <span>{errors.city.message}</span>}
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
                      }}>
                      <input
                        {...register("color")}
                        type="radio"
                        name="color"
                        style={{ display: "none" }}
                        value={color}
                        defaultChecked={color === checkColor}
                      />
                    </label>
                  )
                )}
              </div>
              {errors.color && <span>{errors.color.message}</span>}
              <button type="submit">Confirm</button>
              <button
                type="button"
                onClick={() => {
                  setReminderEditPopUp(false);
                }}>
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

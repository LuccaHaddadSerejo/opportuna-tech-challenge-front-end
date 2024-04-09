import { useContext } from "react";
import "./ReminderDelete.css";
import { RemindersContext } from "../../contexts/RemindersContext";

interface ReminderDeleteProps {
  id: number;
}

function ReminderDelete({ id }: ReminderDeleteProps) {
  const { deleteReminder } = useContext(RemindersContext);

  return (
    <>
      <button
        onClick={() => deleteReminder(id)}
        type="button"
        className="ReminderDeleteButton">
        Delete
      </button>
    </>
  );
}

export default ReminderDelete;

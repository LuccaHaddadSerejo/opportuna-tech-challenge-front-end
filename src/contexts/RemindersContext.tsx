import { createContext, useState } from "react";
import { remindersApi } from "../api/reminders";

export interface ReminderState {
  id: number;
  date: string;
  time: string;
  title: string;
  description: string;
  city: string;
  color: string;
}

interface RemindersContextProps {
  reminders: ReminderState[];
  setReminders: (value: ReminderState[]) => void;
}

export const RemindersContext = createContext({} as RemindersContextProps);

export default function RemindersProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [reminders, setReminders] = useState<ReminderState[]>([]);
  const [filteredReminders, setFilteredReminders] = useState<ReminderState[]>(
    []
  );
  const [globalLoading, setGlobalLoading] = useState<boolean>(false);

  const colorArr = ["blue", "green", "orange", "red", "pink"];

  reminders.sort((a, b) => {
    if (a.time < b.time) {
      return -1;
    }
    if (a.time > b.time) {
      return 1;
    }
    return 0;
  });

  const createReminder = async (formData: unknown) => {
    try {
      setGlobalLoading(true);
      const res = await remindersApi.post<ReminderState>(
        "/reminders",
        formData
      );

      setFilteredReminders((prevState: ReminderState[]) => [
        ...prevState,
        res.data,
      ]);
    } catch (error) {
      console.error(error);
    } finally {
      setGlobalLoading(false);
    }
  };

  const fetchReminders = async () => {
    try {
      setGlobalLoading(true);
      const res = await remindersApi.get<ReminderState[]>("/reminders");
      setReminders(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setGlobalLoading(false);
    }
  };

  const filterReminders = async (date: string) => {
    try {
      setGlobalLoading(true);
      const res = await remindersApi.get<ReminderState[]>("/reminders");
      setFilteredReminders(
        res.data.filter((reminder: ReminderState) => {
          reminder.date === date;
        })
      );
    } catch (error) {
      console.error(error);
    } finally {
      setGlobalLoading(false);
    }
  };

  const updateReminder = async (id: number, formData: ReminderState) => {
    try {
      setGlobalLoading(true);
      const res = await remindersApi.patch<ReminderState>(
        `/reminders/${id}`,
        formData
      );

      const updatedReminders = filteredReminders.map(
        (reminder: ReminderState) => {
          if (reminder.id === id) {
            reminder = res.data;
            return reminder;
          } else {
            return reminder;
          }
        }
      );

      setFilteredReminders(() => [...updatedReminders]);
    } catch (error) {
      console.error(error);
    } finally {
      setGlobalLoading(false);
    }
  };

  const deleteReminder = async (id: number) => {
    try {
      setGlobalLoading(true);
      await remindersApi.delete<void>(`/reminders/${id}`);

      const updatedReminders = filteredReminders.filter(
        (reminder: ReminderState) => reminder.id !== id
      );

      setFilteredReminders(() => [...updatedReminders]);
    } catch (error) {
      console.error(error);
    } finally {
      setGlobalLoading(false);
    }
  };

  return (
    <RemindersContext.Provider value={{ reminders, setReminders }}>
      {children}
    </RemindersContext.Provider>
  );
}

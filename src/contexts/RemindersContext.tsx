import { createContext, useEffect, useState } from "react";
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

type CreateReminderState = Omit<ReminderState, "id" | "date">;

interface RemindersContextProps {
  reminders: ReminderState[];
  setReminders: (value: ReminderState[]) => void;
  filteredReminders: ReminderState[];
  createReminder: (valueOne: CreateReminderState, valueTwo: Date) => void;
  fetchReminders: () => void;
  filterReminders: (value: Date) => void;
  updateReminder: (
    valueOne: number,
    valueTwo: CreateReminderState,
    valueThree: Date
  ) => void;
  deleteReminder: (value: number) => void;
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

  reminders.sort((a, b) => {
    if (a.time < b.time) {
      return -1;
    }
    if (a.time > b.time) {
      return 1;
    }
    return 0;
  });

  filteredReminders.sort((a, b) => {
    if (a.time < b.time) {
      return -1;
    }
    if (a.time > b.time) {
      return 1;
    }
    return 0;
  });

  const createReminder = async (
    formData: CreateReminderState,
    date: Date
  ): Promise<void> => {
    function setTimeInDate(date: Date, hours: string, minutes: string) {
      const newDate = new Date(date);
      newDate.setHours(Number(hours) - 3);
      newDate.setMinutes(Number(minutes));
      return newDate.toISOString();
    }

    const formatData = {
      ...formData,
      date: date.toISOString(),
      time: setTimeInDate(
        date,
        formData.time.slice(0, 2),
        formData.time.slice(3)
      ),
    };

    try {
      const res = await remindersApi.post<ReminderState>(
        "/reminders",
        formatData
      );

      const formatRes = { ...res.data, time: res.data.time.slice(11, 16) };

      setFilteredReminders((prevState: ReminderState[]) => [
        ...prevState,
        formatRes,
      ]);
      setReminders((prevState: ReminderState[]) => [...prevState, formatRes]);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchReminders = async () => {
    try {
      const res = await remindersApi.get<ReminderState[]>("/reminders");

      const formatData = res.data.map((reminder: ReminderState) => ({
        ...reminder,
        time: reminder.time.slice(11, 16),
      }));

      setReminders(formatData);
      setFilteredReminders(
        formatData.filter(
          (reminder: ReminderState) =>
            reminder.date.slice(0, 10) === new Date().toISOString().slice(0, 10)
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const filterReminders = async (date: Date) => {
    try {
      setFilteredReminders(() =>
        reminders.filter(
          (reminder: ReminderState) =>
            reminder.date.slice(0, 10) === date.toISOString().slice(0, 10)
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const updateReminder = async (
    id: number,
    formData: CreateReminderState,
    date: Date
  ) => {
    try {
      const formatData = {
        ...formData,
        date: date.toISOString(),
        time: date.toISOString(),
      };

      const res = await remindersApi.patch<ReminderState>(
        `/reminders/${id}`,
        formatData
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
    }
  };

  const deleteReminder = async (id: number) => {
    try {
      await remindersApi.delete<void>(`/reminders/${id}`);

      const updatedReminders = reminders.filter(
        (reminder: ReminderState) => reminder.id !== id
      );

      const updatedFilteredReminders = filteredReminders.filter(
        (reminder: ReminderState) => reminder.id !== id
      );

      setReminders(() => [...updatedReminders]);
      setFilteredReminders(() => [...updatedFilteredReminders]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <RemindersContext.Provider
      value={{
        reminders,
        setReminders,
        createReminder,
        deleteReminder,
        fetchReminders,
        filteredReminders,
        filterReminders,
        updateReminder,
      }}>
      {children}
    </RemindersContext.Provider>
  );
}

import { createContext, useState } from "react";

interface CalendarMonthProps {
  date: Date;
}

interface SelectedDateProps {
  date: Date;
}

interface CalendarContextProps {
  calendarMonth: CalendarMonthProps;
  setCalendarMonth: (value: CalendarMonthProps) => void;
  selectedDate: SelectedDateProps;
  setSelectedDate: (value: SelectedDateProps) => void;
}

export const CalendarContext = createContext({} as CalendarContextProps);

export default function CalendarProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [calendarMonth, setCalendarMonth] = useState<CalendarMonthProps>({
    date: new Date(),
  });

  const [selectedDate, setSelectedDate] = useState<SelectedDateProps>({
    date: new Date(),
  });

  return (
    <CalendarContext.Provider
      value={{
        calendarMonth,
        setCalendarMonth,
        selectedDate,
        setSelectedDate,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
}

import { createContext, useState } from "react";

interface CalendarMonthProps {
  daysOfPrevMonth: Array<number>;
  daysOfCurrMonth: Array<number>;
  daysOfNextMonth: Array<number>;
}

interface SelectedDateProps {
  date: Date;
}

interface MonthData {
  [key: string]: number;
}

interface CalendarContextProps {
  calendarMonth: CalendarMonthProps;
  setCalendarMonth: (value: CalendarMonthProps) => void;
  selectedDate: SelectedDateProps;
  setSelectedDate: (value: SelectedDateProps) => void;
  goToNextMonth: () => void;
  goToPreviousMonth: () => void;
  goToCurrMonth: () => void;
  changeSelectedDate: (
    valueOne: number,
    valueTwo: boolean,
    valueThree: boolean
  ) => void;
  currMonthName: string;
  currMonth: number;
  monthData: MonthData;
  setCurrMonthName: (value: string) => void;
  monthNames: Array<string>;
  currYear: number;
}

export const CalendarContext = createContext({} as CalendarContextProps);

export default function CalendarProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectedDate, setSelectedDate] = useState<SelectedDateProps>({
    date: new Date(),
  });

  const [currMonth, setcurrMonth] = useState<number>(new Date().getMonth() + 1);
  const [currYear, setCurrYear] = useState<number>(new Date().getFullYear());

  const isLeapYear = (year: number): boolean => {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  };

  const monthData: MonthData = {
    "1": 31,
    "2": isLeapYear(currYear) ? 29 : 28,
    "3": 31,
    "4": 30,
    "5": 31,
    "6": 30,
    "7": 31,
    "8": 31,
    "9": 30,
    "10": 31,
    "11": 30,
    "12": 31,
  };

  const monthNames: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "Setember",
    "October",
    "November",
    "December",
  ];

  const [currMonthName, setCurrMonthName] = useState<string>(
    monthNames[currMonth - 1]
  );

  const [calendarMonth, setCalendarMonth] = useState<CalendarMonthProps>({
    daysOfPrevMonth: [],
    daysOfCurrMonth: [],
    daysOfNextMonth: [],
  });

  const goToNextMonth = (): void => {
    if (currMonth === 12) {
      setCurrYear((prevYear) => prevYear + 1);
      setcurrMonth(1);
      return;
    }
    setcurrMonth((prevMonth) => prevMonth + 1);
  };

  const goToPreviousMonth = (): void => {
    if (currMonth === 1) {
      setCurrYear((prevYear) => prevYear - 1);
      setcurrMonth(12);
      return;
    }
    setcurrMonth((prevMonth) => prevMonth - 1);
  };

  const goToCurrMonth = (): void => {
    setCurrYear(new Date().getFullYear());
    setcurrMonth(new Date().getMonth() + 1);
  };

  const changeSelectedDate = (
    day: number,
    isPrev: boolean,
    isNext: boolean
  ) => {
    let correctMonth = currMonth - 1;

    if (isPrev) {
      correctMonth = currMonth - 2;
    }

    if (isNext) {
      correctMonth = currMonth;
    }

    const selectedDateObj: SelectedDateProps = {
      date: new Date(currYear, correctMonth, day),
    };
    setSelectedDate(selectedDateObj);
  };

  return (
    <CalendarContext.Provider
      value={{
        calendarMonth,
        setCalendarMonth,
        selectedDate,
        setSelectedDate,
        goToNextMonth,
        goToPreviousMonth,
        goToCurrMonth,
        changeSelectedDate,
        currMonthName,
        monthData,
        setCurrMonthName,
        monthNames,
        currMonth,
        currYear,
      }}>
      {children}
    </CalendarContext.Provider>
  );
}

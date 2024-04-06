import { createContext, useState } from "react";

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
  const [reminders, setReminders] = useState<ReminderState[]>([
    {
      id: 1,
      date: "2024-04-04",
      time: "09:00",
      title: "Exercício",
      description: "Fazer exercícios físicos",
      city: "São Paulo",
      color: "blue",
    },
    {
      id: 2,
      date: "2024-04-05",
      time: "15:30",
      title: "Reunião",
      description: "Reunião de equipe",
      city: "Rio de Janeiro",
      color: "green",
    },
    {
      id: 3,
      date: "2024-04-06",
      time: "18:00",
      title: "Compras",
      description: "Comprar mantimentos",
      city: "Belo Horizonte",
      color: "orange",
    },
    {
      id: 4,
      date: "2024-04-07",
      time: "10:00",
      title: "Dentista",
      description: "Consulta com o dentista",
      city: "Porto Alegre",
      color: "red",
    },
    {
      id: 5,
      date: "2024-04-08",
      time: "14:00",
      title: "Aniversário",
      description: "Festa de aniversário",
      city: "Curitiba",
      color: "pink",
    },
  ]);

  reminders.sort((a, b) => {
    if (a.time < b.time) {
      return -1;
    }
    if (a.time > b.time) {
      return 1;
    }
    return 0;
  });

  return (
    <RemindersContext.Provider value={{ reminders, setReminders }}>
      {children}
    </RemindersContext.Provider>
  );
}

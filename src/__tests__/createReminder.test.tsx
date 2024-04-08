import { remindersApi } from "@/api/reminders";
import ReminderAdd from "@/components/ReminderAdd/ReminderAdd";
import { RemindersContext } from "@/contexts/RemindersContext";
import { render } from "@testing-library/react";
import { ReminderState } from "@/contexts/RemindersContext";

describe("createReminder", () => {
  it("should create a reminder", async () => {
    const mockApiResponse = {
      data: {
        id: 1,
        date: "2024-04-09T00:00:00Z",
        time: "15:30",
        title: "Test Reminder",
        description: "This is a test reminder",
        city: "brasília",
        color: "purple",
      },
    };

    jest.spyOn(remindersApi, "post").mockResolvedValueOnce(mockApiResponse);

    const formData = {
      city: "brasília",
      color: "purple",
      description: "Lembrete teste",
      time: "15:30",
      title: "Para teste",
    };
    const mockDate = new Date("2024-04-25T14:00:00");

    const createReminder = jest.fn();
    const reminders: ReminderState[] = [];
    const setReminders = jest.fn();
    const deleteReminder = jest.fn();
    const fetchReminders = jest.fn();
    const filteredReminders: ReminderState[] = [];
    const filterReminders = jest.fn();
    const updateReminder = jest.fn();
    const editedReminderDate = false;
    const deleteReminderByDay = jest.fn();

    render(
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
          editedReminderDate,
          deleteReminderByDay,
        }}>
        <ReminderAdd />
      </RemindersContext.Provider>
    );

    const newReminder = createReminder(formData, mockDate);

    expect(remindersApi.post).toHaveBeenCalledWith(formData, mockDate);
    expect(createReminder).toHaveBeenCalledWith(formData, mockDate);
    expect(newReminder).toEqual(mockApiResponse);
  });
});

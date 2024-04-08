import ReminderAdd from "@/components/ReminderAdd/ReminderAdd";
import { RemindersContext } from "@/contexts/RemindersContext";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { ReminderState } from "@/contexts/RemindersContext";

describe("createReminder", () => {
  it("should create a reminder", async () => {
    const formData = {
      city: "brasília",
      color: "purple",
      description: "Lembrete teste",
      time: "15:30",
      title: "Para teste",
    };

    const createReminder = jest.fn(() => Promise.resolve());
    const reminders: ReminderState[] = [];
    const setReminders = jest.fn();
    const deleteReminder = jest.fn();
    const fetchReminders = jest.fn();
    const filteredReminders: ReminderState[] = [];
    const filterReminders = jest.fn();
    const updateReminder = jest.fn();
    const editedReminderDate = false;
    const deleteReminderByDay = jest.fn();

    const { getByText, getByTestId } = render(
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

    fireEvent.click(getByText("Add a reminder"));

    fireEvent.change(getByTestId("title"), {
      target: { value: formData.title },
    });
    fireEvent.change(getByTestId("description"), {
      target: { value: formData.description },
    });
    fireEvent.change(getByTestId("time"), {
      target: { value: formData.time },
    });
    fireEvent.change(getByTestId("city"), {
      target: { value: formData.city },
    });
    fireEvent.click(getByTestId(`color-${formData.color}`));

    fireEvent.submit(getByTestId("ReminderAddForm"));

    await waitFor(() => expect(createReminder).toHaveBeenCalled());
    await waitFor(() =>
      expect(createReminder).toHaveBeenCalledWith(formData, expect.any(Date))
    );
  });
});

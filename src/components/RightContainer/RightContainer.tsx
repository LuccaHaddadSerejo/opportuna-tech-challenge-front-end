import ReminderDeleteByDate from '../DeleteCurrentDayReminders/DeleteCurrentDayReminders';
import HeaderRightContainer from '../HeaderRightContainer/HeaderRightContainer';
import ReminderAdd from '../ReminderAdd/ReminderAdd';
import Reminders from '../RemindersContainer/RemindersContainer';
import SelectedDayDisplay from '../SelectedDayDisplay/SelectedDayDisplay';
import './RightContainer.css';

function RightContainer() {
  return (
    <>
      <div  className='RightContainer'>
        <HeaderRightContainer />
        <div className='SubHeaderRightContainer'>
          <SelectedDayDisplay />
          <ReminderAdd />
        </div>
        <div className='RemindersContainer'>
          <Reminders />
        </div>
        <div className='DeleteCurrentDayRemindersContainer'>
          <ReminderDeleteByDate />
        </div>
      </div>
    </>
  );
}

export default RightContainer

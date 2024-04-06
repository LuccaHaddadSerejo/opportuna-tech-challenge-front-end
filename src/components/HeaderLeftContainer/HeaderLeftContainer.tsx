import CurrentMonthButton from '../CurrentMonthButton/CurrentMonthButton';
import MonthSelect from '../MonthSelect/MonthSelect';
import './HeaderLeftContainer.css'

function HeaderLeftContainer() {
  return (
    <>
      <div className='CalendarTitle'>
        <h1><a href='/'>Calendar</a></h1>
      </div>
      <div className='MonthSelect'>
        <MonthSelect />
      </div>
      <div className='CurrentMonthButtonContainer'>
        <CurrentMonthButton />
      </div>
    </>
  );
}

export default HeaderLeftContainer

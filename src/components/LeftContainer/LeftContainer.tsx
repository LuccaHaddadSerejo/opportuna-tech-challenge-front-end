import Calendar from '../CalendarContainer/CalendarContainer';
import HeaderLeftContainer from '../HeaderLeftContainer/HeaderLeftContainer';
import './LeftContainer.css'

function LeftContainer() {
  return (
    <>
      <div className='LeftContainer'>
        <div className='HeaderLeftContainer'>
          <HeaderLeftContainer />
        </div>
        <div className='Calendar'>
          <div className='CalendarBody'>
            <Calendar />
          </div>
        </div>
      </div>
    </>
  );
}

export default LeftContainer

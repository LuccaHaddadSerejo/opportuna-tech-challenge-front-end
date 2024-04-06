import './Home.css';
import CalendarProvider from "../../contexts/CalendarContext";
import RemindersProvider from "../../contexts/RemindersContext";
import RightContainer from '../../components/RightContainer/RightContainer';
import LeftContainer from '../../components/LeftContainer/LeftContainer';

function Home() {
  return (
    <>
      <div className="Screen">
        <CalendarProvider>
          <RemindersProvider>
            <LeftContainer />
            <RightContainer />
          </RemindersProvider>
        </CalendarProvider>
      </div>
    </>
  )
}

export default Home

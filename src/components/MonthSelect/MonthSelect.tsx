import "./MonthSelect.css";

function MonthSelect() {
  return (
    <>
      <div className="SubMonthsContainer">
        <button>Prev</button>
      </div>

      <div className="CalendarMonth">Abril</div>

      <div className="AddMonthsContainer">
        <button>Next</button>
      </div>
    </>
  );
}

export default MonthSelect;

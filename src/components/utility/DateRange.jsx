const DateRange = ({startYear, endYear, id}) => {
  if (!startYear) {
    return <p id={id} className="sub-content"></p>;
  }

  const start = new Date(startYear);
  const startStr = start.getFullYear().toString();
  const end = new Date(endYear);
  let endStr = 'Present'

  if (end != "Invalid Date") {
    endStr = end.getFullYear().toString();
  }

  return (
    <p id={id} className="sub-content">
      {startStr} — {endStr}
    </p>
  );
};

export default DateRange;

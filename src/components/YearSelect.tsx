type YearSelectProps = {
  setYear: React.Dispatch<React.SetStateAction<string>>;
};

function YearSelect({ setYear }: YearSelectProps) {
  const availableYears: string[] = [];
  for (let i = 2023; i > 1940; i--) {
    availableYears.push("" + i);
  }

  return (
    <div className="text-white w-[150px]">
      <label htmlFor="year-select" className="block">
        Choose A Year
      </label>
      <select
        name="years"
        id="year-select"
        onChange={(e) => setYear(e.target.value)}
        className="w-full bg-slate-900 p-2"
      >
        {availableYears.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
}

export default YearSelect;

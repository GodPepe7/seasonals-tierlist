type SeasonSelectProps = {
  setSeason: React.Dispatch<React.SetStateAction<string>>;
};

function SeasonSelect({ setSeason }: SeasonSelectProps) {
  return (
    <div className="text-white w-[150px]">
      <label htmlFor="season-select" className="block">
        Season
      </label>
      <select
        name="seasons"
        id="season-select"
        onChange={(e) => setSeason(e.target.value)}
        className="w-full bg-slate-900 p-2"
      >
        <option value="WINTER">Winter</option>
        <option value="SPRING">Spring</option>
        <option value="SUMMER">Summer</option>
        <option value="FALL">Fall</option>
      </select>
    </div>
  );
}

export default SeasonSelect;

import { useState } from "react";

function Filters({ onFilterChange }) {
  const [minMag, setMinMag] = useState(0);
  const [timeframe, setTimeframe] = useState("all_day");

  const handleApply = () => {
    onFilterChange({ minMag, timeframe });
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 mb-4">
      <h2 className="text-xl font-semibold mb-3">Filters</h2>

      {/* Magnitude Filter */}
      <div className="mb-3">
        <label className="block text-sm font-medium">Minimum Magnitude</label>
        <input
          type="number"
          step="0.1"
          value={minMag}
          onChange={(e) => setMinMag(parseFloat(e.target.value))}
          className="mt-1 w-full border rounded p-2"
        />
      </div>

      {/* Timeframe Filter */}
      <div className="mb-3">
        <label className="block text-sm font-medium">Timeframe</label>
        <select
          value={timeframe}
          onChange={(e) => setTimeframe(e.target.value)}
          className="mt-1 w-full border rounded p-2"
        >
          <option value="all_hour">Past Hour</option>
          <option value="all_day">Past Day</option>
          <option value="all_week">Past Week</option>
          <option value="all_month">Past Month</option>
        </select>
      </div>

      <button
        onClick={handleApply}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Apply Filters
      </button>
    </div>
  );
}

export default Filters;

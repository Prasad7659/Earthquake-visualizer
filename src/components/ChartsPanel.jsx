import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function ChartsPanel({ earthquakes }) {
  // Group earthquakes by magnitude ranges
  const magnitudeBins = [
    { range: "0-2", count: 0 },
    { range: "2-4", count: 0 },
    { range: "4-6", count: 0 },
    { range: "6-8", count: 0 },
    { range: "8+", count: 0 },
  ];

  earthquakes.forEach((eq) => {
    const mag = eq.properties.mag;
    if (mag < 2) magnitudeBins[0].count++;
    else if (mag < 4) magnitudeBins[1].count++;
    else if (mag < 6) magnitudeBins[2].count++;
    else if (mag < 8) magnitudeBins[3].count++;
    else magnitudeBins[4].count++;
  });

  return (
    <div className="p-4 bg-white shadow rounded-2xl w-full md:w-1/3 border border-amber-200">
      <h2 className="text-xl font-bold mb-4">Magnitude Distribution</h2>

      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={magnitudeBins}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="range" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#ef4444" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

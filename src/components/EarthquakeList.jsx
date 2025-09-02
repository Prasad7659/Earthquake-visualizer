function EarthquakeList({ earthquakes }) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 max-h-[500px] overflow-y-auto">
      <h2 className="text-xl font-semibold mb-2">Recent Earthquakes</h2>
      <ul className="space-y-2">
        {earthquakes.map((eq) => (
          <li
            key={eq.id}
            className="border-b pb-2 last:border-none text-sm"
          >
            <strong>{eq.properties.place}</strong>
            <br />
            Mag: {eq.properties.mag} | Depth: {eq.geometry.coordinates[2]} km
            <br />
            <span className="text-gray-500">
              {new Date(eq.properties.time).toLocaleString()}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EarthquakeList;

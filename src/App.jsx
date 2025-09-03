import "./App.css";
import { useEffect, useState } from "react";
import MapView from "./components/MapView";
import EarthquakeList from "./components/EarthquakeList";
import Filters from "./components/Filters";
import ChartsPanel from "./components/ChartsPanel";
import { FaUserCircle } from "react-icons/fa";

function App() {
  const [earthquakes, setEarthquakes] = useState([]);
  const [filters, setFilters] = useState({ minMag: 0, timeframe: "all_day" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    const fetchEarthquakes = async () => {
      setLoading(true);
      setError("");
      setNoResults(false);

      const url = `https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/${filters.timeframe}.geojson`;

      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to fetch data from USGS API");

        const data = await res.json();
        const filtered = data.features.filter(
          (eq) => eq.properties.mag >= filters.minMag
        );

        if (filtered.length === 0) setNoResults(true);

        setEarthquakes(filtered);
      } catch (err) {
        console.error(err);
        setError(err.message || "Something went wrong while fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchEarthquakes();
  }, [filters]);

  return (
    <>
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-200 via-blue-100 to-white shadow border border-gray-200">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          <h1 className="flex items-center text-2xl md:text-3xl font-extrabold tracking-wide text-gray-800" style={{ fontFamily: "'Playfair Display', serif" }}>
            <span>🌍</span> Earthquake Visualizer
          </h1>
          <div className="flex items-center space-x-3 cursor-pointer hover:opacity-80">
            <span className="font-medium text-gray-700 hidden sm:block">Casey</span>
            <FaUserCircle className="text-3xl sm:text-4xl text-blue-600" />
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="min-h-screen bg-gray-50 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {/* Map + Charts */}
          <div className="col-span-2 bg-white shadow-lg rounded-2xl p-4">
            {loading ? (
              <p className="text-gray-500 italic">Loading earthquakes...</p>
            ) : error ? (
              <p className="text-red-500 font-medium">{error}</p>
            ) : noResults ? (
              <p className="text-gray-600 italic">No earthquakes found for selected filters.</p>
            ) : (
              <>
                <MapView earthquakes={earthquakes} />
                <p className="text-sm text-gray-500 mt-2 italic">
                  *Click on dots to see details
                </p>
                <div className="mt-4">
                  <ChartsPanel earthquakes={earthquakes} />
                </div>
              </>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <div className="bg-white shadow-md rounded-2xl p-4">
              <Filters onFilterChange={setFilters} />
            </div>
            <div className="bg-white shadow-md rounded-2xl p-4 max-h-[75vh] overflow-y-auto no-scrollbar">
              {!loading && !error && !noResults && (
                <EarthquakeList earthquakes={earthquakes} />
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 text-center py-4 mt-6 shadow-inner">
        <p className="text-sm">
          © {new Date().getFullYear()} Earthquake Visualizer by{" "}
          <span className="font-semibold text-white">Prasad</span> for Casey. All rights reserved.
        </p>
      </footer>
    </>
  );
}

export default App;

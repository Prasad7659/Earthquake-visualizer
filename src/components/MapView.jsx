
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function MapView({ earthquakes }) {
  // Function to style markers based on magnitude
  const getMarkerStyle = (magnitude) => {
    let color = "green";
    if (magnitude >= 3 && magnitude < 5) color = "orange";
    else if (magnitude >= 5) color = "red";

    return {
      radius: magnitude * 3, // Bigger for higher magnitude
      fillColor: color,
      color: "#000",
      weight: 1,
      opacity: 1,
      fillOpacity: 0.7,
    };
  };

  return (
    <MapContainer
      center={[20, 0]} // global view
      zoom={2}
      style={{ height: "500px", width: "100%" }}
    >
      
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
      />

     
      {earthquakes.map((eq) => {
        const [lng, lat, depth] = eq.geometry.coordinates;
        const { mag, place, time, url } = eq.properties;

        return (
          <CircleMarker
            key={eq.id}
            center={[lat, lng]}
            pathOptions={getMarkerStyle(mag)}
          >
            <Popup>
              <div>
                <h3 className="font-bold">M {mag} — {place}</h3>
                <p><strong>Depth:</strong> {depth} km</p>
                <p><strong>Time:</strong> {new Date(time).toLocaleString()}</p>
                <a
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-500 underline"
                >
                  More details
                </a>
              </div>
            </Popup>
          </CircleMarker>
        );
      })}
    </MapContainer>
  );
}

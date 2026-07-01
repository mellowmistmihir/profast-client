import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";

// Center of Bangladesh
const position = [23.6850, 90.3563];

// Custom marker icon
const customIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  shadowSize: [41, 41],
});

// 🔥 FIXED: FlyToDistrict (useEffect added)
function FlyToDistict({ coords }) {
  const map = useMap();

  useEffect(() => {
    if (coords) {
      map.flyTo(coords,10, { duration: 1.5 });
    }
  }, [coords, map]);

  return null;
}

const BangladeshMap = ({ warehouse }) => {
  const [searchText, setSearchText] = useState("");
  const [activeCoords, setActiveCoords] = useState(null);
  const [activeDistrict, setActiveDistrict] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();

    const district = warehouse.find((d) =>
      d.district.toLowerCase().includes(searchText.toLowerCase())
    );

    if (district) {
      setActiveCoords([district.latitude, district.longitude]);
      setActiveDistrict(district.district);
    }
  };

  return (
    <div className="relative  w-full rounded-lg overflow-hidden">
      {/* 🔍 Search Form */}
      <form
        onSubmit={handleSearch}
        className="absolute top-4 left-1/2 transform -translate-x-1/2 z-[1000]
                   flex w-[90%] max-w-xl bg-white rounded-lg shadow-md"
      >
        <input
          type="text"
          placeholder="Search district"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="flex-1 px-4 py-2 text-black text-sm border border-r-0
                     border-gray-300 rounded-l-lg outline-none"
        />

        <button
          type="submit"
          className="px-5 py-2 bg-blue-600 text-white text-sm
                     rounded-r-lg hover:bg-blue-700 transition"
        >
          Search
        </button>
      </form>

      {/* 🗺️ Map */}
      <MapContainer
        center={position}
        zoom={10}
        scrollWheelZoom={false}
        style={{ height: "600px", width: "100%" }}
      >
        <TileLayer
          attribution="© OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* 🔥 Auto zoom handler */}
        <FlyToDistict coords={activeCoords} />

        {/* 📍 Markers */}
        {warehouse.map((house, idx) => (
          <Marker
            key={idx}
            position={[house.latitude, house.longitude]}
            icon={customIcon}
          >
            <Popup autoPlay={house.district===activeDistrict}> 
              <strong>{house.district}</strong>
              <br />
              {house.covered_area.join(", ")}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default BangladeshMap;

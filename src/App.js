import './App.css';
import React from 'react';
import TrackData from './mountsi_geojson.json'
import { MapContainer, TileLayer, GeoJSON} from 'react-leaflet'

function App() {
  const polylinecolor = {color: 'red', weight: '3', opacity: '0.75'};
  return (
    <MapContainer
        center={[47.4966, -121.733]} zoom={14} scrollWheelZoom={false} style={{ height: "400px" }}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
      />
      <GeoJSON 
        data={TrackData} pathOptions={polylinecolor}
      />
    </MapContainer>
  );
}

export default App;

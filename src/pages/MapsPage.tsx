import React from 'react';
import MapViewer from '../maps/MapViewer';

const MapsPage: React.FC = () => (
  <div className="p-8 text-white">
    <h1 className="text-2xl font-bold mb-4">Maps</h1>
    <MapViewer />
  </div>
);

export default MapsPage;

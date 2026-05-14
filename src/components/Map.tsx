'use client';

import { Map as MapLibreMap } from 'react-map-gl/maplibre';

import {
  MAP_CENTER,
  MAP_MAX_BOUNDS,
  MAP_ZOOM,
} from '@/constants/MAP';

const Map = () => {
  return (
    <MapLibreMap
      mapStyle='https://tiles.openfreemap.org/styles/bright'
      initialViewState={{
        zoom: MAP_ZOOM,
        longitude: MAP_CENTER.lng,
        latitude: MAP_CENTER.lat,
      }}
      maxBounds={MAP_MAX_BOUNDS}
    />
  );
};

export default Map;

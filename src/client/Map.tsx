'use client';

import { Map as MapLibreMap } from 'react-map-gl/maplibre';

import MapControls from '@/client/MapControls';
import { LAYERS } from '@/constants/LAYERS';
import {
  MAP_CENTER,
  MAP_MAX_BOUNDS,
  MAP_ZOOM,
} from '@/constants/MAP';
import useMapStore from '@/stores/useMapStore';

const Map = () => {
  const visibleLayers = useMapStore(s => s.visibleLayers);

  return (
    <MapLibreMap
      mapStyle='https://tiles.openfreemap.org/styles/bright'
      initialViewState={{
        zoom: MAP_ZOOM,
        longitude: MAP_CENTER.lng,
        latitude: MAP_CENTER.lat,
      }}
      maxBounds={MAP_MAX_BOUNDS}
    >
      <MapControls />
      {LAYERS.map(({ component: Component, id }) =>
        visibleLayers[id] ? <Component key={id} /> : null
      )}
    </MapLibreMap>
  );
};

export default Map;

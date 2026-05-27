'use client';

import { Map as MapLibreMap } from 'react-map-gl/maplibre';

import BuildingsLayer from '@/client/BuildingsLayer';
import MapControls from '@/client/MapControls';
import { LAYERS } from '@/constants/LAYERS';
import { SOURCES } from '@/constants/SOURCES';
import {
  MAP_CENTER,
  MAP_MAX_BOUNDS,
  MAP_STYLE,
  MAP_ZOOM,
} from '@/constants/MAP';
import useMapStore from '@/stores/useMapStore';

const Map = () => {
  const visibleLayers = useMapStore(s => s.visibleLayers);

  return (
    <MapLibreMap
      mapStyle={MAP_STYLE}
      initialViewState={{
        zoom: MAP_ZOOM,
        longitude: MAP_CENTER.lng,
        latitude: MAP_CENTER.lat,
      }}
      maxBounds={MAP_MAX_BOUNDS}
      maxPitch={60}
      dragRotate
      touchPitch
    >
      <MapControls />
      <BuildingsLayer />
      {SOURCES.map(({ component: SourceComponent, id }) => (
        <SourceComponent key={id} />
      ))}
      {LAYERS.map(({ component: LayerComponent, id }) =>
        visibleLayers[id] ?
          <LayerComponent key={id} />
        : null
      )}
    </MapLibreMap>
  );
};

export default Map;

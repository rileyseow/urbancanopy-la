'use client';

import {
  GeolocateControl,
  Map as MapLibreMap,
  NavigationControl,
  ScaleControl,
} from 'react-map-gl/maplibre';

import SiteLogo from '@/components/SiteLogo';
import {
  MAP_CENTER,
  MAP_MAX_BOUNDS,
  MAP_ZOOM,
} from '@/constants/MAP';

const Map = () => {
  const handleOutOfMaxBounds = () => {
    alert('You are outside the maximum bounds of the map.');
  };

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
      <SiteLogo />
      <NavigationControl
        position='top-right'
        showZoom
        showCompass
        visualizePitch
        visualizeRoll
      />
      <GeolocateControl
        position='top-right'
        positionOptions={{ enableHighAccuracy: true }}
        onOutOfMaxBounds={handleOutOfMaxBounds}
      />
      <ScaleControl
        position='bottom-right'
        unit='imperial'
      />
    </MapLibreMap>
  );
};

export default Map;

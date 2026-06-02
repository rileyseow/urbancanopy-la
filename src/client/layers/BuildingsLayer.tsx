import { useEffect } from 'react';
import { Layer, useMap } from 'react-map-gl/maplibre';

import { BUILDINGS_MIN_ZOOM } from '@/constants/MAP';
import { MAP_LAYER_IDS } from '@/constants/MAP_LAYER_IDS';

const BuildingsLayer = () => {
  const { current: mapRef } = useMap();

  // Effect to avoid z-fighting / transparent fill extrusions when
  // simultaneously enabled with 'buildings' and 'buildings-top' layers
  useEffect(() => {
    const map = mapRef?.getMap();

    if (!map) {
      return;
    }

    const updateVisibility = () => {
      const zoom = map.getZoom();
      const vis =
        zoom >= BUILDINGS_MIN_ZOOM ? 'none' : 'visible';

      if (map.getLayer('building')) {
        map.setLayoutProperty(
          'building',
          'visibility',
          vis
        );
      }
      if (map.getLayer('building-top')) {
        map.setLayoutProperty(
          'building-top',
          'visibility',
          vis
        );
      }
    };

    updateVisibility();
    map.on('zoomend', updateVisibility);

    return () => {
      map.off('zoomend', updateVisibility);
    };
  }, [mapRef]);

  return (
    <Layer
      id={MAP_LAYER_IDS.buildings}
      source='openmaptiles' // see basemap `https://tiles.openfreemap.org/styles/bright`
      source-layer='building'
      type='fill-extrusion'
      minzoom={BUILDINGS_MIN_ZOOM}
      paint={{
        'fill-extrusion-color': '#c9d1d9',
        'fill-extrusion-height': [
          'interpolate',
          ['linear'],
          ['zoom'],
          14,
          0,
          16,
          [
            'coalesce',
            ['get', 'render_height'],
            ['get', 'height'],
            8,
          ],
        ],
        'fill-extrusion-base': [
          'case',
          ['>=', ['get', 'zoom'], 16],
          [
            'coalesce',
            ['get', 'render_height'],
            ['get', 'height'],
            8,
          ],
          0,
        ],
      }}
    />
  );
};

export default BuildingsLayer;

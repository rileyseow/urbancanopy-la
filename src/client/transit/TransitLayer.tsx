import { Layer } from 'react-map-gl/maplibre';

import { TRANSIT_STOPS_MIN_ZOOM } from '@/constants/MAP';
import { MAP_LAYER_IDS } from '@/constants/MAP_LAYER_IDS';

const TransitLayer = () => {
  return (
    <>
      <Layer
        id={MAP_LAYER_IDS.transitRoutes}
        source='transit-routes-source'
        type='line'
        beforeId={MAP_LAYER_IDS.bicycleParking}
        filter={['==', ['geometry-type'], 'LineString']}
        layout={{
          'line-cap': 'round',
          'line-join': 'round',
        }}
        paint={{
          'line-color': [
            'case',
            ['has', 'route_color'],
            ['concat', '#', ['get', 'route_color']],
            '#5b6b7c',
          ],
          'line-width': [
            'case',
            ['==', ['get', 'route_type'], 3],
            1,
            3,
          ],
        }}
      />
      <Layer
        id={MAP_LAYER_IDS.transitStops}
        source='transit-stops-source'
        type='circle'
        minzoom={TRANSIT_STOPS_MIN_ZOOM}
        filter={['==', ['geometry-type'], 'Point']}
        paint={{
          'circle-radius': 3,
          'circle-color': '#d5dade',
          'circle-stroke-width': 1,
          'circle-stroke-color': '#5b6b7c',
        }}
      />
    </>
  );
};

export default TransitLayer;

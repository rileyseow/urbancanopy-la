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
        beforeId={MAP_LAYER_IDS.drinkingWater}
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
        beforeId={MAP_LAYER_IDS.drinkingWater}
        minzoom={TRANSIT_STOPS_MIN_ZOOM}
        filter={[
          'all',
          ['==', ['geometry-type'], 'Point'],
          [
            '!',
            [
              'in',
              ['get', 'route_type'],
              ['literal', [0, 1]],
            ],
          ],
        ]}
        paint={{
          'circle-radius': 3,
          'circle-color': '#5b6b7c',
          'circle-stroke-width': 1,
          'circle-stroke-color': '#000',
        }}
      />
      <Layer
        id={MAP_LAYER_IDS.transitMetroStops}
        source='transit-stops-source'
        type='symbol'
        beforeId={MAP_LAYER_IDS.drinkingWater}
        filter={[
          'all',
          ['==', ['geometry-type'], 'Point'],
          [
            'in',
            ['get', 'route_type'],
            ['literal', [0, 1]],
          ],
        ]}
        layout={{
          'icon-image': 'metro-stop-icon',
          'icon-size': 0.2,
          'icon-allow-overlap': true,
        }}
      />
    </>
  );
};

export default TransitLayer;

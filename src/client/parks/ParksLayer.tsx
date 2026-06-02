import { Layer } from 'react-map-gl/maplibre';

import { MAP_LAYER_IDS } from '@/constants/MAP_LAYER_IDS';

const ParksLayer = () => {
  return (
    <Layer
      id={MAP_LAYER_IDS.parks}
      source='parks-source'
      type='fill'
      filter={[
        'any',
        ['==', ['geometry-type'], 'Polygon'],
        ['==', ['geometry-type'], 'MultiPolygon'],
        ['==', ['geometry-type'], 'LineString'],
      ]}
      paint={{
        'fill-color': '#3e8e5a',
        'fill-opacity': 0.4,
      }}
    />
  );
};

export default ParksLayer;

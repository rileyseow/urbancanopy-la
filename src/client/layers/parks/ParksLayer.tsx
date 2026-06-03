import { Layer } from 'react-map-gl/maplibre';

import { MAP_LAYER_IDS } from '@/constants/MAP_LAYER_IDS';

const ParksLayer = ({
  isLayerVisible,
}: {
  isLayerVisible: boolean;
}) => {
  return (
    <Layer
      id={MAP_LAYER_IDS.parks}
      source='parks-source'
      type='fill'
      beforeId='label_other' // see basemap style spec
      filter={[
        'any',
        ['==', ['geometry-type'], 'Polygon'],
        ['==', ['geometry-type'], 'MultiPolygon'],
        ['==', ['geometry-type'], 'LineString'],
      ]}
      layout={{
        visibility: isLayerVisible ? 'visible' : 'none',
      }}
      paint={{
        'fill-color': '#3e8e5a',
        'fill-opacity': 0.4,
      }}
    />
  );
};

export default ParksLayer;

import { Layer } from 'react-map-gl/maplibre';

import { MAP_LAYER_IDS } from '@/constants/MAP_LAYER_IDS';

const ToiletsLayer = () => {
  return (
    <Layer
      id={MAP_LAYER_IDS.toilets}
      source='toilets-source'
      type='symbol'
      filter={[
        'all',
        ['==', ['geometry-type'], 'Point'],
        ['==', ['get', 'amenity_type'], 'toilets'],
      ]}
      layout={{
        'icon-image': 'toilet-icon',
        'icon-size': 0.3,
        'icon-allow-overlap': true,
      }}
    />
  );
};

export default ToiletsLayer;

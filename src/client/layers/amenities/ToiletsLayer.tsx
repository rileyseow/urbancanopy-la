import { Layer } from 'react-map-gl/maplibre';

import { MAP_LAYER_IDS } from '@/constants/MAP_LAYER_IDS';
import { MAP_SOURCE_IDS } from '@/constants/MAP_SOURCE_IDS';

const ToiletsLayer = ({
  isLayerVisible,
}: {
  isLayerVisible: boolean;
}) => {
  return (
    <Layer
      id={MAP_LAYER_IDS.toilets}
      source={MAP_SOURCE_IDS.toilets}
      type='symbol'
      filter={[
        'all',
        ['==', ['geometry-type'], 'Point'],
        ['==', ['get', 'amenity_type'], 'toilets'],
      ]}
      layout={{
        visibility: isLayerVisible ? 'visible' : 'none',
        'icon-image': 'toilet-icon',
        'icon-size': 0.3,
        'icon-allow-overlap': true,
      }}
    />
  );
};

export default ToiletsLayer;

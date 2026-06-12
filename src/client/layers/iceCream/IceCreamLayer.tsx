import { Layer } from 'react-map-gl/maplibre';

import { MAP_LAYER_IDS } from '@/constants/MAP_LAYER_IDS';
import { MAP_SOURCE_IDS } from '@/constants/MAP_SOURCE_IDS';

const IceCreamLayer = ({
  isLayerVisible,
}: {
  isLayerVisible: boolean;
}) => {
  return (
    <Layer
      id={MAP_LAYER_IDS.iceCream}
      source={MAP_SOURCE_IDS.iceCream}
      type='symbol'
      filter={['==', ['geometry-type'], 'Point']}
      layout={{
        visibility: isLayerVisible ? 'visible' : 'none',
        'icon-image': 'ice-cream-icon',
        'icon-size': 0.3,
        'icon-allow-overlap': true,
      }}
    />
  );
};

export default IceCreamLayer;

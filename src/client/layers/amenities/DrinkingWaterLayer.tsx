import { Layer } from 'react-map-gl/maplibre';

import { MAP_LAYER_IDS } from '@/constants/MAP_LAYER_IDS';
import { MAP_SOURCE_IDS } from '@/constants/MAP_SOURCE_IDS';

const DrinkingWaterLayer = ({
  isLayerVisible,
}: {
  isLayerVisible: boolean;
}) => {
  return (
    <Layer
      id={MAP_LAYER_IDS.drinkingWater}
      source={MAP_SOURCE_IDS.drinkingWater}
      type='symbol'
      filter={[
        'all',
        ['==', ['geometry-type'], 'Point'],
        ['==', ['get', 'amenity_type'], 'drinking_water'],
      ]}
      layout={{
        visibility: isLayerVisible ? 'visible' : 'none',
        'icon-image': 'drinking-water-icon',
        'icon-size': 0.3,
        'icon-allow-overlap': true,
      }}
    />
  );
};

export default DrinkingWaterLayer;

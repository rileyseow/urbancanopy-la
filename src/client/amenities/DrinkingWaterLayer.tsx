import { Layer } from 'react-map-gl/maplibre';

import { MAP_LAYER_IDS } from '@/constants/MAP_LAYER_IDS';

const DrinkingWaterLayer = () => {
  return (
    <Layer
      id={MAP_LAYER_IDS.drinkingWater}
      source='amenities-source'
      type='symbol'
      filter={[
        'all',
        ['==', ['geometry-type'], 'Point'],
        ['==', ['get', 'amenity_type'], 'drinking_water'],
      ]}
      layout={{
        'icon-image': 'drinking-water-icon',
        'icon-size': 0.3,
        'icon-allow-overlap': true,
      }}
    />
  );
};

export default DrinkingWaterLayer;

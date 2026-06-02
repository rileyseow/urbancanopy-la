import { Layer } from 'react-map-gl/maplibre';

import { MAP_LAYER_IDS } from '@/constants/MAP_LAYER_IDS';

const BicycleParkingLayer = () => {
  return (
    <Layer
      id={MAP_LAYER_IDS.bicycleParking}
      source='bicycle-parking-source'
      type='symbol'
      filter={[
        'all',
        ['==', ['geometry-type'], 'Point'],
        ['==', ['get', 'amenity_type'], 'bicycle_parking'],
      ]}
      layout={{
        'icon-image': 'bicycle-parking-icon',
        'icon-size': 0.3,
        'icon-allow-overlap': true,
      }}
    />
  );
};

export default BicycleParkingLayer;

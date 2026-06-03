import { Layer } from 'react-map-gl/maplibre';

import { MAP_LAYER_IDS } from '@/constants/MAP_LAYER_IDS';

const BicycleParkingLayer = ({
  isLayerVisible,
}: {
  isLayerVisible: boolean;
}) => {
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
        visibility: isLayerVisible ? 'visible' : 'none',
        'icon-image': 'bicycle-parking-icon',
        'icon-size': 0.3,
        'icon-allow-overlap': true,
      }}
    />
  );
};

export default BicycleParkingLayer;

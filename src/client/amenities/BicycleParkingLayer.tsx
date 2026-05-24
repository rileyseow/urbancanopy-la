import { Layer } from 'react-map-gl/maplibre';

const BicycleParkingLayer = () => {
  return (
    <Layer
      id='bicycle-parking-layer'
      source='amenities-source'
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

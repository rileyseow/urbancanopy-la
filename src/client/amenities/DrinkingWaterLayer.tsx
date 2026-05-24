import { Layer } from 'react-map-gl/maplibre';

const DrinkingWaterLayer = () => {
  return (
    <Layer
      id='drinking-water-layer'
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

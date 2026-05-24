import { Layer } from 'react-map-gl/maplibre';

const ToiletsLayer = () => {
  return (
    <Layer
      id='toilets-layer'
      source='amenities-source'
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

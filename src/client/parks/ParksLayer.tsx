import { Layer } from 'react-map-gl/maplibre';

const ParksLayer = () => {
  return (
    <>
      <Layer
        id='parks-points-layer'
        source='parks-points-source'
        type='symbol'
        filter={['==', ['geometry-type'], 'Point']}
        layout={{
          'icon-image': 'park-icon',
          'icon-size': 0.3,
          'icon-allow-overlap': true,
        }}
      />
      <Layer
        id='parks-polygons-layer'
        source='parks-polygons-source'
        type='fill'
        filter={[
          'any',
          ['==', ['geometry-type'], 'Polygon'],
          ['==', ['geometry-type'], 'MultiPolygon'],
          ['==', ['geometry-type'], 'LineString'],
        ]}
        paint={{
          'fill-color': '#3e8e5a',
          'fill-opacity': 0.3,
        }}
      />
    </>
  );
};

export default ParksLayer;

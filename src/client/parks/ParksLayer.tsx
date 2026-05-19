import { Source, Layer } from 'react-map-gl/maplibre';

import useParks from '@/client/parks/useParks';

const ParksLayer = () => {
  const { data } = useParks();

  if (!data) {
    return null;
  }

  return (
    <Source id='parks' type='geojson' data={data}>
      <Layer
        id='parks-fill'
        type='fill'
        filter={[
          'any',
          ['==', ['geometry-type'], 'Polygon'],
          ['==', ['geometry-type'], 'MultiPolygon'],
          ['==', ['geometry-type'], 'LineString'],
        ]}
        paint={{
          'fill-color': '#de4acd',
          'fill-opacity': 0.3,
        }}
      />
      <Layer
        id='parks-point'
        type='circle'
        filter={['==', ['geometry-type'], 'Point']}
        paint={{
          'circle-color': '#de4acd',
          'circle-radius': 6,
        }}
      />
    </Source>
  );
};

export default ParksLayer;

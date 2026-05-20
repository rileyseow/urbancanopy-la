import { Source, Layer } from 'react-map-gl/maplibre';

import useMapImage from '@/client/hooks/useMapImage';
import useParks from '@/client/parks/useParks';

const ParksLayer = () => {
  const { data } = useParks();

  const isImageLoaded = useMapImage({
    id: 'park-icon',
    src: '/icons/park.svg',
  });

  if (!data || !isImageLoaded) {
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
          'fill-color': '#3e8e5a',
          'fill-opacity': 0.3,
        }}
      />
      <Layer
        id='parks-symbol'
        type='symbol'
        filter={['==', ['geometry-type'], 'Point']}
        layout={{
          'icon-image': 'park-icon',
          'icon-size': 0.3,
          'icon-allow-overlap': true,
        }}
      />
    </Source>
  );
};

export default ParksLayer;

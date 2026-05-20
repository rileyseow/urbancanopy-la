import { Source, Layer } from 'react-map-gl/maplibre';

import parkIconUrl from '@/assets/park.svg?url';
import useMapImage from '@/client/hooks/useMapImage';
import useParks from '@/client/parks/useParks';

const ParksLayer = () => {
  const { data } = useParks();

  const isImageLoaded = useMapImage({
    id: 'park-icon',
    src: parkIconUrl,
  });

  if (!data || !isImageLoaded) {
    return null;
  }

  return (
    <>
      <Source
        id='parks-polygons'
        type='geojson'
        data={data.polygons}
      >
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
      </Source>
      <Source
        id='parks-points'
        type='geojson'
        data={data.points}
      >
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
    </>
  );
};

export default ParksLayer;

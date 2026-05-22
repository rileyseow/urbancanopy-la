import { Source, Layer } from 'react-map-gl/maplibre';

import parkIconUrl from '@/assets/park.svg?url';
import useMapImage from '@/client/hooks/useMapImage';
import useTooltip from '@/client/hooks/useTooltip';
import ParksTooltip from '@/client/parks/ParksTooltip';
import {
  useParksPoints,
  useParksPolygons,
} from '@/client/parks/useParks';

const ParksPointLayer = () => {
  const { data } = useParksPoints();

  const isImageLoaded = useMapImage({
    id: 'park-icon',
    src: parkIconUrl,
  });

  if (!data || !isImageLoaded) {
    return null;
  }

  return (
    <Source id='parks-point' type='geojson' data={data}>
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

const ParksPolygonLayer = () => {
  const { data } = useParksPolygons();

  if (!data) {
    return null;
  }

  return (
    <Source id='parks-polygon' type='geojson' data={data}>
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
  );
};

const ParksLayer = () => {
  const { hoveredFeature } = useTooltip({
    layerIds: ['parks-fill', 'parks-symbol'],
  });

  return (
    <>
      <ParksPolygonLayer />
      <ParksPointLayer />
      {hoveredFeature && (
        <ParksTooltip f={hoveredFeature} />
      )}
    </>
  );
};

export default ParksLayer;

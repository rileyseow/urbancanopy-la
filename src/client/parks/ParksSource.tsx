import { Source } from 'react-map-gl/maplibre';

import parkIconUrl from '@/assets/park.svg?url';
import useMapImage from '@/client/hooks/useMapImage';
import useTooltip from '@/client/hooks/useTooltip';
import ParksTooltip from '@/client/parks/ParksTooltip';
import {
  useParksPoints,
  useParksPolygons,
} from '@/client/parks/useParks';

const ParksSource = () => {
  const { data: pointsData } = useParksPoints();
  const { data: polygonsData } = useParksPolygons();

  const isImageLoaded = useMapImage([
    {
      id: 'park-icon',
      src: parkIconUrl,
    },
  ]);

  const { hoveredFeature } = useTooltip({
    layerIds: [
      'parks-polygons-layer',
      'parks-points-layer',
    ],
  });

  if (!pointsData || !polygonsData || !isImageLoaded) {
    return null;
  }

  return (
    <>
      <Source
        id='parks-points-source'
        type='geojson'
        data={pointsData}
      />
      <Source
        id='parks-polygons-source'
        type='geojson'
        data={polygonsData}
      />
      {hoveredFeature && (
        <ParksTooltip f={hoveredFeature} />
      )}
    </>
  );
};

export default ParksSource;

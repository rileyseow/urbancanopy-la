import { Source } from 'react-map-gl/maplibre';

import parkIconUrl from '@/assets/park.svg?url';
import useMapImage from '@/client/hooks/useMapImage';
import useTooltip from '@/client/hooks/useTooltip';
import ParksTooltip from '@/client/parks/ParksTooltip';
import {
  useParksPoints,
  useParksPolygons,
} from '@/client/parks/useParks';
import { MAP_LAYER_IDS } from '@/constants/MAP_LAYER_IDS';

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
      MAP_LAYER_IDS.parksPolygons,
      MAP_LAYER_IDS.parksPoints,
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

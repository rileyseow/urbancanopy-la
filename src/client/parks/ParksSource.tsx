import { Source } from 'react-map-gl/maplibre';

import parkIconUrl from '@/assets/park.svg?url';
import useMapImage from '@/client/hooks/useMapImage';
import useTooltip from '@/client/hooks/useTooltip';
import ParksTooltip from '@/client/parks/ParksTooltip';
import { useParks } from '@/client/parks/useParks';
import { MAP_LAYER_IDS } from '@/constants/MAP_LAYER_IDS';

const ParksSource = () => {
  const { data } = useParks();

  const isImageLoaded = useMapImage([
    {
      id: 'park-icon',
      src: parkIconUrl,
    },
  ]);

  const { hoveredFeature } = useTooltip({
    layerIds: [
      MAP_LAYER_IDS.parks,
      MAP_LAYER_IDS.parksSymbol,
    ],
  });

  if (!data || !isImageLoaded) {
    return null;
  }

  return (
    <>
      <Source
        id='parks-source'
        type='geojson'
        data={data}
        tolerance={0}
      />
      {hoveredFeature && (
        <ParksTooltip f={hoveredFeature} />
      )}
    </>
  );
};

export default ParksSource;

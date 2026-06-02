import { Source } from 'react-map-gl/maplibre';

import toiletIconUrl from '@/assets/toilet.svg?url';
import AmenitiesTooltip from '@/client/layers/amenities/AmenitiesTooltip';
import { useToilets } from '@/client/hooks/useLayerData';
import useTooltip from '@/client/hooks/useTooltip';
import useMapImage from '@/client/hooks/useMapImage';
import { MAP_LAYER_IDS } from '@/constants/MAP_LAYER_IDS';

const ToiletsSource = () => {
  const { data } = useToilets();

  const isImageLoaded = useMapImage([
    {
      id: 'toilet-icon',
      src: toiletIconUrl,
    },
  ]);

  const { hoveredFeature } = useTooltip({
    layerIds: [MAP_LAYER_IDS.toilets],
  });

  if (!data || !isImageLoaded) {
    return null;
  }

  return (
    <>
      <Source
        id='toilets-source'
        type='geojson'
        data={data}
      />
      {hoveredFeature && (
        <AmenitiesTooltip f={hoveredFeature} />
      )}
    </>
  );
};

export default ToiletsSource;

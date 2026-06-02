import { Source } from 'react-map-gl/maplibre';

import drinkingWaterIconUrl from '@/assets/drinkingWater.svg?url';
import AmenitiesTooltip from '@/client/layers/amenities/AmenitiesTooltip';
import { useDrinkingWater } from '@/client/hooks/useLayerData';
import useTooltip from '@/client/hooks/useTooltip';
import useMapImage from '@/client/hooks/useMapImage';
import { MAP_LAYER_IDS } from '@/constants/MAP_LAYER_IDS';

const DrinkingWaterSource = () => {
  const { data } = useDrinkingWater();

  const isImageLoaded = useMapImage([
    {
      id: 'drinking-water-icon',
      src: drinkingWaterIconUrl,
    },
  ]);

  const { hoveredFeature } = useTooltip({
    layerIds: [MAP_LAYER_IDS.drinkingWater],
  });

  if (!data || !isImageLoaded) {
    return null;
  }

  return (
    <>
      <Source
        id='drinking-water-source'
        type='geojson'
        data={data}
      />
      {hoveredFeature && (
        <AmenitiesTooltip f={hoveredFeature} />
      )}
    </>
  );
};

export default DrinkingWaterSource;

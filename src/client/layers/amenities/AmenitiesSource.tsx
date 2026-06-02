import { Source } from 'react-map-gl/maplibre';

import bicycleParkingIconUrl from '@/assets/bicycleParking.svg?url';
import drinkingWaterIconUrl from '@/assets/drinkingWater.svg?url';
import toiletIconUrl from '@/assets/toilet.svg?url';
import AmenitiesTooltip from '@/client/layers/amenities/AmenitiesTooltip';
import useAmenities from '@/client/layers/amenities/useAmenities';
import useTooltip from '@/client/hooks/useTooltip';
import useMapImage from '@/client/hooks/useMapImage';
import { MAP_LAYER_IDS } from '@/constants/MAP_LAYER_IDS';

const AmenitiesSource = () => {
  const { data } = useAmenities();

  const areImagesLoaded = useMapImage([
    {
      id: 'bicycle-parking-icon',
      src: bicycleParkingIconUrl,
    },
    {
      id: 'drinking-water-icon',
      src: drinkingWaterIconUrl,
    },
    {
      id: 'toilet-icon',
      src: toiletIconUrl,
    },
  ]);

  const { hoveredFeature } = useTooltip({
    layerIds: [
      MAP_LAYER_IDS.bicycleParking,
      MAP_LAYER_IDS.drinkingWater,
      MAP_LAYER_IDS.toilets,
    ],
  });

  if (!data || !areImagesLoaded) {
    return null;
  }

  return (
    <>
      <Source
        id='amenities-source'
        type='geojson'
        data={data}
      />
      {hoveredFeature && (
        <AmenitiesTooltip f={hoveredFeature} />
      )}
    </>
  );
};

export default AmenitiesSource;

import { Source } from 'react-map-gl/maplibre';

import bicycleParkingIconUrl from '@/assets/bicycleParking.svg?url';
import drinkingWaterIconUrl from '@/assets/drinkingWater.svg?url';
import toiletIconUrl from '@/assets/toilet.svg?url';
import AmenitiesTooltip from '@/client/amenities/AmenitiesTooltip';
import useAmenities from '@/client/amenities/useAmenities';
import useTooltip from '@/client/hooks/useTooltip';
import useMapImage from '@/client/hooks/useMapImage';

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
      'bicycle-parking-layer',
      'drinking-water-layer',
      'toilets-layer',
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

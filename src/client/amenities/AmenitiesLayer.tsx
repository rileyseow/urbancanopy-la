import { Source, Layer } from 'react-map-gl/maplibre';

import bicycleParkingIconUrl from '@/assets/bicycleParking.svg?url';
import drinkingWaterIconUrl from '@/assets/drinkingWater.svg?url';
import toiletIconUrl from '@/assets/toilet.svg?url';
import AmenitiesTooltip from '@/client/amenities/AmenitiesTooltip';
import useAmenities from '@/client/amenities/useAmenities';
import useMapImage from '@/client/hooks/useMapImage';
import useTooltip from '@/client/hooks/useTooltip';

const AmenitiesLayer = () => {
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
      'bicycle-parking',
      'drinking-water',
      'toilets',
    ],
  });

  if (!data || !areImagesLoaded) {
    return null;
  }

  return (
    <>
      <Source id='amenities' type='geojson' data={data}>
        <Layer
          id='bicycle-parking'
          type='symbol'
          filter={[
            'all',
            ['==', ['geometry-type'], 'Point'],
            [
              '==',
              ['get', 'amenity_type'],
              'bicycle_parking',
            ],
          ]}
          layout={{
            'icon-image': 'bicycle-parking-icon',
            'icon-size': 0.3,
            'icon-allow-overlap': true,
          }}
        />
        <Layer
          id='drinking-water'
          type='symbol'
          filter={[
            'all',
            ['==', ['geometry-type'], 'Point'],
            [
              '==',
              ['get', 'amenity_type'],
              'drinking_water',
            ],
          ]}
          layout={{
            'icon-image': 'drinking-water-icon',
            'icon-size': 0.3,
            'icon-allow-overlap': true,
          }}
        />
        <Layer
          id='toilets'
          type='symbol'
          filter={[
            'all',
            ['==', ['geometry-type'], 'Point'],
            ['==', ['get', 'amenity_type'], 'toilets'],
          ]}
          layout={{
            'icon-image': 'toilet-icon',
            'icon-size': 0.3,
            'icon-allow-overlap': true,
          }}
        />
      </Source>
      {hoveredFeature && (
        <AmenitiesTooltip f={hoveredFeature} />
      )}
    </>
  );
};

export default AmenitiesLayer;

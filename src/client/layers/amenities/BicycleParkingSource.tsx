import { Source } from 'react-map-gl/maplibre';

import bicycleParkingIconUrl from '@/assets/bicycleParking.svg?url';
import AmenitiesTooltip from '@/client/layers/amenities/AmenitiesTooltip';
import { useBicycleParking } from '@/client/hooks/useLayerData';
import useTooltip from '@/client/hooks/useTooltip';
import useMapImage from '@/client/hooks/useMapImage';
import { MAP_LAYER_IDS } from '@/constants/MAP_LAYER_IDS';

const BicycleParkingSource = () => {
  const { data } = useBicycleParking();

  const isImageLoaded = useMapImage([
    {
      id: 'bicycle-parking-icon',
      src: bicycleParkingIconUrl,
    },
  ]);

  const { hoveredFeature } = useTooltip({
    layerIds: [MAP_LAYER_IDS.bicycleParking],
  });

  if (!data || !isImageLoaded) {
    return null;
  }

  return (
    <>
      <Source
        id='bicycle-parking-source'
        type='geojson'
        data={data}
      />
      {hoveredFeature && (
        <AmenitiesTooltip f={hoveredFeature} />
      )}
    </>
  );
};

export default BicycleParkingSource;

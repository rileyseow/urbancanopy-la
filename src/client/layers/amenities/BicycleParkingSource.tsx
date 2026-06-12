import { Source } from 'react-map-gl/maplibre';

import bicycleParkingIconUrl from '@/assets/bicycleParking.svg?url';
import { useBicycleParking } from '@/client/hooks/useLayerData';
import useMapImage from '@/client/hooks/useMapImage';
import { MAP_SOURCE_IDS } from '@/constants/MAP_SOURCE_IDS';

const BicycleParkingSource = () => {
  const { data } = useBicycleParking();

  const isImageLoaded = useMapImage([
    {
      id: 'bicycle-parking-icon',
      src: bicycleParkingIconUrl,
    },
  ]);

  if (!data || !isImageLoaded) {
    return null;
  }

  return (
    <Source
      id={MAP_SOURCE_IDS.bicycleParking}
      type='geojson'
      data={data}
    />
  );
};

export default BicycleParkingSource;

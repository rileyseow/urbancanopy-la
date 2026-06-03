import { Source } from 'react-map-gl/maplibre';

import bicycleParkingIconUrl from '@/assets/bicycleParking.svg?url';
import { useBicycleParking } from '@/client/hooks/useLayerData';
import useMapImage from '@/client/hooks/useMapImage';

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
      id='bicycle-parking-source'
      type='geojson'
      data={data}
    />
  );
};

export default BicycleParkingSource;

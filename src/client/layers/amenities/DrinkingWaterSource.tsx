import { Source } from 'react-map-gl/maplibre';

import drinkingWaterIconUrl from '@/assets/drinkingWater.svg?url';
import { useDrinkingWater } from '@/client/hooks/useLayerData';
import useMapImage from '@/client/hooks/useMapImage';

const DrinkingWaterSource = () => {
  const { data } = useDrinkingWater();

  const isImageLoaded = useMapImage([
    {
      id: 'drinking-water-icon',
      src: drinkingWaterIconUrl,
    },
  ]);

  if (!data || !isImageLoaded) {
    return null;
  }

  return (
    <Source
      id='drinking-water-source'
      type='geojson'
      data={data}
    />
  );
};

export default DrinkingWaterSource;

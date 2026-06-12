import { Source } from 'react-map-gl/maplibre';

import iceCreamIconUrl from '@/assets/iceCream.svg?url';
import { useIceCream } from '@/client/hooks/useLayerData';
import useMapImage from '@/client/hooks/useMapImage';
import { MAP_SOURCE_IDS } from '@/constants/MAP_SOURCE_IDS';

const IceCreamSource = () => {
  const { data } = useIceCream();

  const isImageLoaded = useMapImage([
    {
      id: 'ice-cream-icon',
      src: iceCreamIconUrl,
    },
  ]);

  if (!data || !isImageLoaded) {
    return null;
  }

  return (
    <Source
      id={MAP_SOURCE_IDS.iceCream}
      type='geojson'
      data={data}
    />
  );
};

export default IceCreamSource;

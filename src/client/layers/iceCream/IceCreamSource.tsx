import { Source } from 'react-map-gl/maplibre';

import iceCreamIconUrl from '@/assets/iceCream.svg?url';
import IceCreamTooltip from '@/client/layers/iceCream/IceCreamTooltip';
import { useIceCream } from '@/client/hooks/useLayerData';
import useTooltip from '@/client/hooks/useTooltip';
import useMapImage from '@/client/hooks/useMapImage';
import { MAP_LAYER_IDS } from '@/constants/MAP_LAYER_IDS';

const IceCreamSource = () => {
  const { data } = useIceCream();

  const isImageLoaded = useMapImage([
    {
      id: 'ice-cream-icon',
      src: iceCreamIconUrl,
    },
  ]);

  const { hoveredFeature } = useTooltip({
    layerIds: [MAP_LAYER_IDS.iceCream],
  });

  if (!data || !isImageLoaded) {
    return null;
  }

  return (
    <>
      <Source
        id='ice-cream-source'
        type='geojson'
        data={data}
      />
      {hoveredFeature && (
        <IceCreamTooltip f={hoveredFeature} />
      )}
    </>
  );
};

export default IceCreamSource;

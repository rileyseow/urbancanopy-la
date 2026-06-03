import { Source } from 'react-map-gl/maplibre';

import toiletIconUrl from '@/assets/toilet.svg?url';
import { useToilets } from '@/client/hooks/useLayerData';
import useMapImage from '@/client/hooks/useMapImage';

const ToiletsSource = () => {
  const { data } = useToilets();

  const isImageLoaded = useMapImage([
    {
      id: 'toilet-icon',
      src: toiletIconUrl,
    },
  ]);

  if (!data || !isImageLoaded) {
    return null;
  }

  return (
    <Source
      id='toilets-source'
      type='geojson'
      data={data}
    />
  );
};

export default ToiletsSource;

import { Source } from 'react-map-gl/maplibre';

import parkIconUrl from '@/assets/park.svg?url';
import useMapImage from '@/client/hooks/useMapImage';
import { useParks } from '@/client/hooks/useLayerData';
import { MAP_SOURCE_IDS } from '@/constants/MAP_SOURCE_IDS';

const ParksSource = () => {
  const { data } = useParks();

  const isImageLoaded = useMapImage([
    {
      id: 'park-icon',
      src: parkIconUrl,
    },
  ]);

  if (!data || !isImageLoaded) {
    return null;
  }

  return (
    <Source
      id={MAP_SOURCE_IDS.parks}
      type='geojson'
      data={data}
    />
  );
};

export default ParksSource;

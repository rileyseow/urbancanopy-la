import { Source } from 'react-map-gl/maplibre';

import metroStopIconUrl from '@/assets/metroStop.svg?url';
import useMapImage from '@/client/hooks/useMapImage';
import { useTransitStops } from '@/client/hooks/useLayerData';
import { MAP_SOURCE_IDS } from '@/constants/MAP_SOURCE_IDS';

const TransitStopsSource = () => {
  const { data: stopsData } = useTransitStops();

  const isImageLoaded = useMapImage([
    {
      id: 'metro-stop-icon',
      src: metroStopIconUrl,
    },
  ]);

  if (!stopsData || !isImageLoaded) {
    return null;
  }

  return (
    <Source
      id={MAP_SOURCE_IDS.transitStops}
      type='geojson'
      data={stopsData}
    />
  );
};

export default TransitStopsSource;

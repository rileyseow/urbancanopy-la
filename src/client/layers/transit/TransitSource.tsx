import { Source } from 'react-map-gl/maplibre';

import metroStopIconUrl from '@/assets/metroStop.svg?url';
import useMapImage from '@/client/hooks/useMapImage';
import {
  useTransitRoutes,
  useTransitStops,
} from '@/client/hooks/useLayerData';

const TransitSource = () => {
  const { data: routesData } = useTransitRoutes();
  const { data: stopsData } = useTransitStops();

  const isImageLoaded = useMapImage([
    {
      id: 'metro-stop-icon',
      src: metroStopIconUrl,
    },
  ]);

  if (!routesData || !stopsData || !isImageLoaded) {
    return null;
  }

  return (
    <>
      <Source
        id='transit-routes-source'
        type='geojson'
        data={routesData}
      />
      <Source
        id='transit-stops-source'
        type='geojson'
        data={stopsData}
      />
    </>
  );
};

export default TransitSource;

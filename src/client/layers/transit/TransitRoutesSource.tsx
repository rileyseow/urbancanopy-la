import { Source } from 'react-map-gl/maplibre';

import { useTransitRoutes } from '@/client/hooks/useLayerData';
import { MAP_SOURCE_IDS } from '@/constants/MAP_SOURCE_IDS';

const TransitRoutesSource = () => {
  const { data: routesData } = useTransitRoutes();

  if (!routesData) {
    return null;
  }

  return (
    <Source
      id={MAP_SOURCE_IDS.transitRoutes}
      type='geojson'
      data={routesData}
    />
  );
};

export default TransitRoutesSource;

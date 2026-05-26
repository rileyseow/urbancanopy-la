import { Source } from 'react-map-gl/maplibre';

import useTooltip from '@/client/hooks/useTooltip';
import {
  TransitRoutesTooltip,
  TransitStopsTooltip,
} from '@/client/transit/TransitTooltip';
import {
  useTransitRoutes,
  useTransitStops,
} from '@/client/transit/useTransit';
import { MAP_LAYER_IDS } from '@/constants/MAP_LAYER_IDS';

const TransitSource = () => {
  const { data: routesData } = useTransitRoutes();
  const { data: stopsData } = useTransitStops();

  const { hoveredFeature } = useTooltip({
    layerIds: [
      MAP_LAYER_IDS.transitRoutes,
      MAP_LAYER_IDS.transitStops,
    ],
  });

  if (!routesData || !stopsData) {
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
      {hoveredFeature ?
        (
          Object.hasOwn(
            hoveredFeature.feature.properties,
            'route_id'
          )
        ) ?
          <TransitRoutesTooltip f={hoveredFeature} />
        : <TransitStopsTooltip f={hoveredFeature} />
      : null}
    </>
  );
};

export default TransitSource;

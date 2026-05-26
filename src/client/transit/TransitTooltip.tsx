import type { MapLibreFeature } from '@/types/map.types';

import Tooltip from '@/client/Tooltip';

export const TransitRoutesTooltip = ({
  f,
}: {
  f: MapLibreFeature;
}) => {
  const { agency_id, route_long_name, route_short_name } =
    f.feature.properties;

  const name =
    route_short_name && route_long_name ?
      `${route_short_name} ${route_long_name}`
    : route_short_name || route_long_name;

  return (
    <Tooltip lng={f.lng} lat={f.lat}>
      <span>{`${agency_id} - ${name}`}</span>
    </Tooltip>
  );
};

export const TransitStopsTooltip = ({
  f,
}: {
  f: MapLibreFeature;
}) => {
  const { agency_id, stop_name } = f.feature.properties;

  return (
    <Tooltip lng={f.lng} lat={f.lat}>
      <span>{`${agency_id} - ${stop_name}`}</span>
    </Tooltip>
  );
};

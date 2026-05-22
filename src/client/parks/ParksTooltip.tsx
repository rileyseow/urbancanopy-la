import type { MapLibreFeature } from '@/types/map.types';

import Tooltip from '@/client/components/Tooltip';

const ParksTooltip = ({ f }: { f: MapLibreFeature }) => {
  return (
    <Tooltip lng={f.lng} lat={f.lat}>
      <span>{f.feature.properties.name}</span>
    </Tooltip>
  );
};

export default ParksTooltip;

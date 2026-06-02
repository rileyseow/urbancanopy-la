import type { MapLibreFeature } from '@/types/map.types';

import Tooltip from '@/client/Tooltip';

const IceCreamTooltip = ({ f }: { f: MapLibreFeature }) => {
  const { name, opening_hours } = f.feature.properties;

  return (
    <Tooltip lng={f.lng} lat={f.lat}>
      <span>{name || 'Unnamed Ice Cream Shop'}</span>
      {opening_hours && (
        <span className='small'>
          Opening Hours: {opening_hours}
        </span>
      )}
    </Tooltip>
  );
};

export default IceCreamTooltip;

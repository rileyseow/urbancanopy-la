import type { MapLibreFeature } from '@/types/map';

import Tooltip from '@/client/components/Tooltip';

const AmenitiesTooltip = ({
  f,
}: {
  f: MapLibreFeature;
}) => {
  const { name, amenity_type } = f.feature.properties;

  const amenityDefault =
    amenity_type === 'bicycle_parking' ?
      ' Unnamed Bicycle Parking'
    : amenity_type === 'drinking_water' ?
      'Unnamed Drinking Water'
    : 'Unnamed Toilet';

  return (
    <Tooltip lng={f.lng} lat={f.lat}>
      <span>{name ?? amenityDefault}</span>
    </Tooltip>
  );
};

export default AmenitiesTooltip;

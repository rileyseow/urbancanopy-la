import { Popup } from 'react-map-gl/maplibre';

import type { MapLibreFeature } from '@/types/map';

import './AmenitiesTooltip.scss';

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
    <Popup
      className='AmenitiesTooltip'
      longitude={f.lng}
      latitude={f.lat}
      anchor='bottom'
      closeButton={false}
      closeOnClick={false}
    >
      <span>{name ?? amenityDefault}</span>
    </Popup>
  );
};

export default AmenitiesTooltip;

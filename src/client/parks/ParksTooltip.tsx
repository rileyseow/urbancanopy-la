import { Popup } from 'react-map-gl/maplibre';

import type { MapLibreFeature } from '@/types/map';

import './ParksTooltip.scss';

const ParksTooltip = ({ f }: { f: MapLibreFeature }) => {
  return (
    <Popup
      className='ParksTooltip'
      longitude={f.lng}
      latitude={f.lat}
      anchor='bottom'
      closeButton={false}
      closeOnClick={false}
    >
      <span>{f.feature.properties.name}</span>
    </Popup>
  );
};

export default ParksTooltip;

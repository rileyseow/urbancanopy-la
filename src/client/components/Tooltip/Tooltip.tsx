import type { ReactNode } from 'react';
import { Popup } from 'react-map-gl/maplibre';

import './Tooltip.scss';

const Tooltip = ({
  children,
  lng,
  lat,
}: {
  children: ReactNode;
  lng: number;
  lat: number;
}) => {
  return (
    <Popup
      className='Tooltip'
      longitude={lng}
      latitude={lat}
      anchor='bottom'
      closeButton={false}
      closeOnClick={false}
    >
      {children}
    </Popup>
  );
};

export default Tooltip;

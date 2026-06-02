import type { MapLibreFeature } from '@/types/map.types';
import type { ParkProperties } from '@/types/parks.types';
import Tooltip from '@/client/Tooltip';

const normalizeParkAgency = (
  agency: NonNullable<ParkProperties['managing_agency']>
): string => {
  const splitIdx = [
    agency.indexOf(', City of'),
    agency.indexOf(', County of'),
  ].reduce((acc, idx) => (idx !== -1 ? idx : acc), -1);

  return splitIdx === -1 ? agency : (
      `${agency.slice(splitIdx + 2)} ${agency.slice(0, splitIdx)}`
    );
};

const ParksTooltip = ({ f }: { f: MapLibreFeature }) => {
  const { managing_agency, name } = f.feature.properties;

  return (
    <Tooltip lng={f.lng} lat={f.lat}>
      <span>{name || 'Unnamed Park'}</span>
      <span className='small'>
        {normalizeParkAgency(managing_agency!)}
      </span>
    </Tooltip>
  );
};

export default ParksTooltip;

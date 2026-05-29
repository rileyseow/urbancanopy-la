import AmenitiesSource from '@/client/amenities/AmenitiesSource';
import ParksSource from '@/client/parks/ParksSource';
import TemperatureSource from '@/client/temperature/TemperatureSource';
import TransitSource from '@/client/transit/TransitSource';

/**
 * @constant
 * @description Map source configurations
 *
 * @property {string} id - Unique identifier for the source
 * @property {any} component - MapLibre source component that renders the source data
 */
export const SOURCES = [
  {
    id: 'amenitiesSource',
    component: AmenitiesSource,
  },
  {
    id: 'parksSource',
    component: ParksSource,
  },
  {
    id: 'temperatureSource',
    component: TemperatureSource,
  },
  {
    id: 'transitSource',
    component: TransitSource,
  },
] as const;

export type SourceConfig = (typeof SOURCES)[number];

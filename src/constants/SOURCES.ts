import AmenitiesSource from '@/client/amenities/AmenitiesSource';
import ParksSource from '@/client/parks/ParksSource';

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
] as const;

export type SourceConfig = (typeof SOURCES)[number];

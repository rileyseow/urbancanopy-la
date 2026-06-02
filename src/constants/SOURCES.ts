import AmenitiesSource from '@/client/layers/amenities/AmenitiesSource';
import IceCreamSource from '@/client/layers/iceCream/IceCreamSource';
import ParksSource from '@/client/layers/parks/ParksSource';
import TemperatureSource from '@/client/layers/temperature/TemperatureSource';
import TransitSource from '@/client/layers/transit/TransitSource';
import TreeDensitySource from '@/client/layers/treeDensity/TreeDensitySource';

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
    id: 'iceCreamSource',
    component: IceCreamSource,
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
  {
    id: 'treeDensitySource',
    component: TreeDensitySource,
  },
] as const;

export type SourceConfig = (typeof SOURCES)[number];

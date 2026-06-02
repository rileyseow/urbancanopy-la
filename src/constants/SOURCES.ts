import BicycleParkingSource from '@/client/layers/amenities/BicycleParkingSource';
import DrinkingWaterSource from '@/client/layers/amenities/DrinkingWaterSource';
import ToiletsSource from '@/client/layers/amenities/ToiletsSource';
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
    id: 'bicycleParkingSource',
    component: BicycleParkingSource,
  },
  {
    id: 'drinkingWaterSource',
    component: DrinkingWaterSource,
  },
  {
    id: 'toiletsSource',
    component: ToiletsSource,
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

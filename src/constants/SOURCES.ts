import type { FC } from 'react';

import BicycleParkingSource from '@/client/layers/amenities/BicycleParkingSource';
import DrinkingWaterSource from '@/client/layers/amenities/DrinkingWaterSource';
import ToiletsSource from '@/client/layers/amenities/ToiletsSource';
import IceCreamSource from '@/client/layers/iceCream/IceCreamSource';
import ParksSource from '@/client/layers/parks/ParksSource';
import TemperatureSource from '@/client/layers/temperature/TemperatureSource';
import TransitSource from '@/client/layers/transit/TransitSource';
import TreeDensitySource from '@/client/layers/treeDensity/TreeDensitySource';

type SourceConfig = {
  id: string;
  component: FC;
};

/**
 * @constant
 * @description Map source configurations
 */
export const SOURCES: SourceConfig[] = [
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

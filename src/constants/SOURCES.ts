import BicycleParkingSource from '@/client/layers/amenities/BicycleParkingSource';
import DrinkingWaterSource from '@/client/layers/amenities/DrinkingWaterSource';
import ToiletsSource from '@/client/layers/amenities/ToiletsSource';
import IceCreamSource from '@/client/layers/iceCream/IceCreamSource';
import ParksSource from '@/client/layers/parks/ParksSource';
import ShadeCoverageSource from '@/client/layers/shadeCoverage/ShadeCoverageSource';
import TemperatureSource from '@/client/layers/temperature/TemperatureSource';
import TransitRoutesSource from '@/client/layers/transit/TransitRoutesSource';
import TransitStopsSource from '@/client/layers/transit/TransitStopsSource';
import TreeDensitySource from '@/client/layers/treeDensity/TreeDensitySource';
import { MAP_SOURCE_IDS } from '@/constants/MAP_SOURCE_IDS';

/**
 * @constant
 * @description Map source configurations
 */
export const SOURCES = [
  {
    id: MAP_SOURCE_IDS.bicycleParking,
    component: BicycleParkingSource,
  },
  {
    id: MAP_SOURCE_IDS.drinkingWater,
    component: DrinkingWaterSource,
  },
  {
    id: MAP_SOURCE_IDS.toilets,
    component: ToiletsSource,
  },
  {
    id: MAP_SOURCE_IDS.iceCream,
    component: IceCreamSource,
  },
  {
    id: MAP_SOURCE_IDS.parks,
    component: ParksSource,
  },
  {
    id: MAP_SOURCE_IDS.temperature,
    component: TemperatureSource,
  },
  {
    id: MAP_SOURCE_IDS.transitRoutes,
    component: TransitRoutesSource,
  },
  {
    id: MAP_SOURCE_IDS.transitStops,
    component: TransitStopsSource,
  },
  {
    id: MAP_SOURCE_IDS.treeDensity,
    component: TreeDensitySource,
  },
  {
    id: MAP_SOURCE_IDS.shadeCoverage,
    component: ShadeCoverageSource,
  },
] as const;

type SourceConfig = (typeof SOURCES)[number];
export type SourceId = SourceConfig['id'];

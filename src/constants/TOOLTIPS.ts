import type { FC } from 'react';

import AmenitiesTooltip from '@/client/layers/amenities/AmenitiesTooltip';
import IceCreamTooltip from '@/client/layers/iceCream/IceCreamTooltip';
import ParksTooltip from '@/client/layers/parks/ParksTooltip';
import ShadeCoverageTooltip from '@/client/layers/shadeCoverage/ShadeCoverageTooltip';
import {
  TransitRoutesTooltip,
  TransitStopsTooltip,
} from '@/client/layers/transit/TransitTooltip';
import TreeDensityTooltip from '@/client/layers/treeDensity/TreeDensityTooltip';
import {
  MAP_LAYER_IDS,
  type MapLayerId,
} from '@/constants/MAP_LAYER_IDS';
import type { MapLibreFeature } from '@/types/map.types';

type TooltipComponent = FC<{
  f: MapLibreFeature;
}>;

/**
 * @constant
 * @description Map from MapLibre layer IDs to tooltip components
 */
export const TOOLTIPS: Partial<
  Record<MapLayerId, TooltipComponent>
> = {
  [MAP_LAYER_IDS.parks]: ParksTooltip,
  [MAP_LAYER_IDS.shadeCoverage]: ShadeCoverageTooltip,
  [MAP_LAYER_IDS.transitRoutes]: TransitRoutesTooltip,
  [MAP_LAYER_IDS.transitMetroStops]: TransitStopsTooltip,
  [MAP_LAYER_IDS.transitStops]: TransitStopsTooltip,
  [MAP_LAYER_IDS.bicycleParking]: AmenitiesTooltip,
  [MAP_LAYER_IDS.drinkingWater]: AmenitiesTooltip,
  [MAP_LAYER_IDS.toilets]: AmenitiesTooltip,
  [MAP_LAYER_IDS.iceCream]: IceCreamTooltip,
  [MAP_LAYER_IDS.treeDensity]: TreeDensityTooltip,
};

import BicycleParkingLayer from '@/client/amenities/BicycleParkingLayer';
import DrinkingWaterLayer from '@/client/amenities/DrinkingWaterLayer';
import ToiletsLayer from '@/client/amenities/ToiletsLayer';
import ParksLayer from '@/client/parks/ParksLayer';

import ParkSvg from '@/assets/park.svg';
import ToiletSvg from '@/assets/toilet.svg';
import DrinkingWaterSvg from '@/assets/drinkingWater.svg';
import BicycleParkingSvg from '@/assets/bicycleParking.svg';

/**
 * @constant
 * @description Map layer configurations
 *
 * @property {string} id - Unique identifier for the layer
 * @property {string} label - Display name for the layer
 * @property {any} icon - SVG icon for the layer
 * @property {any} component - MapLibre component that renders the layer
 * @property {boolean} isVisibleByDefault - Whether the layer is toggled on and visible on map load
 */
export const LAYERS = [
  {
    id: 'bicycleParking',
    label: 'Bicycle Parking',
    icon: BicycleParkingSvg,
    component: BicycleParkingLayer,
    isVisibleByDefault: true,
  },
  {
    id: 'parks',
    label: 'Parks',
    icon: ParkSvg,
    component: ParksLayer,
    isVisibleByDefault: true,
  },
  {
    id: 'toilets',
    label: 'Public Restrooms',
    icon: ToiletSvg,
    component: ToiletsLayer,
    isVisibleByDefault: true,
  },
  {
    id: 'drinkingWater',
    label: 'Water Refill',
    icon: DrinkingWaterSvg,
    component: DrinkingWaterLayer,
    isVisibleByDefault: true,
  },
] as const;

export type LayerConfig = (typeof LAYERS)[number];

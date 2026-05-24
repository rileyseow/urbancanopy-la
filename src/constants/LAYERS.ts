import ParksLayer from '@/client/parks/ParksLayer';
import AmenitiesLayer from '@/client/amenities/AmenitiesLayer';

import ParkSvg from '@/assets/park.svg';
import ToiletSvg from '@/assets/toilet.svg';
import DrinkingWaterSvg from '@/assets/drinkingWater.svg';
import BicycleParkingSvg from '@/assets/bicycleParking.svg';

/**
 * @constant
 * @description Map layer configurations
 *
 * @todo Separate amenitieslayer into separate layers for each amenity type
 * so that they can be toggled on/off separately
 */
export const LAYERS = [
  {
    id: 'bicycleParking',
    label: 'Bicycle Parking',
    icon: BicycleParkingSvg,
    component: AmenitiesLayer, //BicycleParkingLayer,
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
    component: AmenitiesLayer, //ToiletsLayer,
    isVisibleByDefault: true,
  },
  {
    id: 'drinkingWater',
    label: 'Water Refill',
    icon: DrinkingWaterSvg,
    component: AmenitiesLayer, //DrinkingWaterLayer,
    isVisibleByDefault: true,
  },
] as const;

export type LayerConfig = (typeof LAYERS)[number];
export type LayerId = LayerConfig['id'];

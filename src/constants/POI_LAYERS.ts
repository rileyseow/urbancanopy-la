import BicycleParkingSvg from '@/assets/bicycleParking.svg';
import BusSvg from '@/assets/bus.svg';
import DrinkingWaterSvg from '@/assets/drinkingWater.svg';
import IceCreamSvg from '@/assets/iceCream.svg';
import ParkSvg from '@/assets/park.svg';
import ToiletSvg from '@/assets/toilet.svg';
import BicycleParkingLayer from '@/client/layers/amenities/BicycleParkingLayer';
import DrinkingWaterLayer from '@/client/layers/amenities/DrinkingWaterLayer';
import ToiletsLayer from '@/client/layers/amenities/ToiletsLayer';
import IceCreamLayer from '@/client/layers/iceCream/IceCreamLayer';
import ParksLayer from '@/client/layers/parks/ParksLayer';
import TransitLayer from '@/client/layers/transit/TransitLayer';

/**
 * @constant
 * @description Points of interest map layer configurations
 */
export const POI_LAYERS = [
  {
    id: 'parks',
    label: 'Parks',
    icon: ParkSvg,
    component: ParksLayer,
    isVisibleByDefault: true,
  },
  {
    id: 'transit',
    label: 'Transit',
    icon: BusSvg,
    component: TransitLayer,
    isVisibleByDefault: true,
  },
  {
    id: 'drinkingWater',
    label: 'Water Refill',
    icon: DrinkingWaterSvg,
    component: DrinkingWaterLayer,
    isVisibleByDefault: true,
  },
  {
    id: 'bicycleParking',
    label: 'Bicycle Parking',
    icon: BicycleParkingSvg,
    component: BicycleParkingLayer,
    isVisibleByDefault: false,
  },
  {
    id: 'toilets',
    label: 'Public Restrooms',
    icon: ToiletSvg,
    component: ToiletsLayer,
    isVisibleByDefault: false,
  },
  {
    id: 'iceCream',
    label: 'Ice Cream',
    icon: IceCreamSvg,
    component: IceCreamLayer,
    isVisibleByDefault: false,
  },
] as const;

export type POILayerId = (typeof POI_LAYERS)[number]['id'];

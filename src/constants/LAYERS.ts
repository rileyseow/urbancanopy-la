import type { FC } from 'react';

import BicycleParkingSvg from '@/assets/bicycleParking.svg';
import BusSvg from '@/assets/bus.svg';
import DrinkingWaterSvg from '@/assets/drinkingWater.svg';
import HexagonGreenSvg from '@/assets/hexagonGreen.svg';
import IceCreamSvg from '@/assets/iceCream.svg';
import ParkSvg from '@/assets/park.svg';
import TemperatureRasterSvg from '@/assets/temperatureRaster.svg';
import ToiletSvg from '@/assets/toilet.svg';
import BicycleParkingLayer from '@/client/layers/amenities/BicycleParkingLayer';
import DrinkingWaterLayer from '@/client/layers/amenities/DrinkingWaterLayer';
import ToiletsLayer from '@/client/layers/amenities/ToiletsLayer';
import IceCreamLayer from '@/client/layers/iceCream/IceCreamLayer';
import ParksLayer from '@/client/layers/parks/ParksLayer';
import TransitLayer from '@/client/layers/transit/TransitLayer';
import TreeDensityLayer from '@/client/layers/treeDensity/TreeDensityLayer';
import TemperatureLayer from '@/client/layers/temperature/TemperatureLayer';

type LayerConfig = {
  id: string;
  label: string;
  icon: any;
  component: FC;
  isVisibleByDefault: boolean;
};

/**
 * @constant
 * @description Map layer configurations
 */
export const LAYERS: LayerConfig[] = [
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
  {
    id: 'treeDensity',
    label: 'Tree Density',
    icon: HexagonGreenSvg,
    component: TreeDensityLayer,
    isVisibleByDefault: false,
  },
  {
    id: 'temperature',
    label: 'Temperature',
    icon: TemperatureRasterSvg,
    component: TemperatureLayer,
    isVisibleByDefault: false,
  },
] as const;

export type LayerId = (typeof LAYERS)[number]['id'];

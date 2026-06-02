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
    id: 'drinkingWater',
    label: 'Water Refill',
    icon: DrinkingWaterSvg,
    component: DrinkingWaterLayer,
    isVisibleByDefault: true,
  },
  {
    id: 'iceCream',
    label: 'Ice Cream',
    icon: IceCreamSvg,
    component: IceCreamLayer,
    isVisibleByDefault: false,
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
    id: 'transit',
    label: 'Transit',
    icon: BusSvg,
    component: TransitLayer,
    isVisibleByDefault: true,
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

export type LayerConfig = (typeof LAYERS)[number];

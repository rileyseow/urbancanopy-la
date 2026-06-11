import HexagonGraySvg from '@/assets/hexagonGray.svg';
import HexagonGreenSvg from '@/assets/hexagonGreen.svg';
import TemperatureRasterSvg from '@/assets/temperatureRaster.svg';
import ShadeCoverageLayer from '@/client/layers/shadeCoverage/ShadeCoverageLayer';
import TreeDensityLayer from '@/client/layers/treeDensity/TreeDensityLayer';
import TemperatureLayer from '@/client/layers/temperature/TemperatureLayer';

/**
 * @constant
 * @description Environment map layer configurations.
 * Not visible by default.
 */
export const ENVIRONMENT_LAYERS = [
  {
    id: 'treeDensity',
    label: 'Tree Density',
    icon: HexagonGreenSvg,
    component: TreeDensityLayer,
    isVisibleByDefault: false,
  },
  {
    id: 'shadeCoverage',
    label: 'Shade Coverage',
    icon: HexagonGraySvg,
    component: ShadeCoverageLayer,
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

export type EnvironmentLayerId =
  (typeof ENVIRONMENT_LAYERS)[number]['id'];

export const DEFAULT_VISIBLE_ENVIRONMENT_LAYER: EnvironmentLayerId =
  'treeDensity';

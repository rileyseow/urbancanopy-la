import { POI_LAYERS } from '@/constants/POI_LAYERS';
import { ENVIRONMENT_LAYERS } from '@/constants/ENVIRONMENT_LAYERS';

/**
 * @constant
 * @description Map layer configurations
 */
export const LAYERS = [
  ...POI_LAYERS,
  ...ENVIRONMENT_LAYERS,
] as const;

type LayerConfig = (typeof LAYERS)[number];
export type LayerId = LayerConfig['id'];

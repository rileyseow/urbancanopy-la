/**
 * @constant
 * @description MapLibre layer IDs used across the application.
 * Ensures consistency and avoids hardcoding extra strings.
 */
export const MAP_LAYER_IDS = {
  bicycleParking: 'bicycle-parking-layer',
  drinkingWater: 'drinking-water-layer',
  parksPolygons: 'parks-polygons-layer',
  parksPoints: 'parks-points-layer',
  toilets: 'toilets-layer',
  transitRoutes: 'transit-routes-layer',
  transitStops: 'transit-stops-layer',
  transitMetroStops: 'transit-metro-stops-layer',
} as const;

export type MapLayerId =
  (typeof MAP_LAYER_IDS)[keyof typeof MAP_LAYER_IDS];

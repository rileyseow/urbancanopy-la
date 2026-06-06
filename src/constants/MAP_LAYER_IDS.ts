/**
 * @constant
 * @description MapLibre layer IDs used across the application.
 * Ensures consistency and avoids hardcoding extra strings.
 */
export const MAP_LAYER_IDS = {
  bicycleParking: 'bicycle-parking-layer',
  buildings: 'buildings-layer',
  drinkingWater: 'drinking-water-layer',
  hillshade: 'hillshade-layer',
  iceCream: 'ice-cream-layer',
  parks: 'parks-layer',
  shadeCoverage: 'shade-coverage-layer',
  temperature: 'temperature-layer',
  temperatureLabels: 'temperature-labels-layer',
  treeDensity: 'tree-density-layer',
  toilets: 'toilets-layer',
  transitRoutes: 'transit-routes-layer',
  transitStops: 'transit-stops-layer',
  transitMetroStops: 'transit-metro-stops-layer',
} as const;

export type MapLayerId =
  (typeof MAP_LAYER_IDS)[keyof typeof MAP_LAYER_IDS];

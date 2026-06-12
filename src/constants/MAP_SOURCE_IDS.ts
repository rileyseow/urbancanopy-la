/**
 * @constant
 * @description MapLibre source IDs used across the application.
 * Ensures consistency and avoids hardcoding extra strings.
 */
export const MAP_SOURCE_IDS = {
  bicycleParking: 'bicycle-parking-source',
  drinkingWater: 'drinking-water-source',
  iceCream: 'ice-cream-source',
  parks: 'parks-source',
  shadeCoverage: 'shade-coverage-source',
  temperature: 'temperature-source',
  toilets: 'toilets-source',
  transitRoutes: 'transit-routes-source',
  transitStops: 'transit-stops-source',
  treeDensity: 'tree-density-source',
} as const;

export type MapSourceId =
  (typeof MAP_SOURCE_IDS)[keyof typeof MAP_SOURCE_IDS];

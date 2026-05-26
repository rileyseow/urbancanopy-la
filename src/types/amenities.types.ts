import type { FeatureCollection, Point } from 'geojson';

export type AmenityProperties = {
  /**
   * Unique identifier for the amenity
   * @example 'node/4313185129'
   */
  id: string;

  /**
   * Enum for type of the amenity
   * @example 'bicycle_parking'
   */
  amenity_type:
    | 'bicycle_parking'
    | 'drinking_water'
    | 'toilets';

  /**
   * Name of the amenity
   * @example 'Bicycle Compound B3'
   */
  name?: string;
};

export type AmenityFC = FeatureCollection<
  Point,
  AmenityProperties
>;

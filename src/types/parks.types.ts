import type {
  FeatureCollection,
  MultiPolygon,
  Point,
  Polygon,
} from 'geojson';

export type ParkPointProperties = {
  /**
   * Unique identifier for the park point
   * @example 'node/358781017'
   */
  id: string;

  /**
   * Name of the park
   * @example 'Boulder Hill Park'
   */
  name: string;
};

export type ParkPolygonProperties = {
  /**
   * Unique identifier for the park polygon
   * @example 'way/56229293'
   */
  id: string;

  /**
   * Name of the park
   * @example 'Jack Nichol Park'
   */
  name: string;
};

export type ParkPointFC = FeatureCollection<
  Point,
  ParkPointProperties
>;

export type ParkPolygonFC = FeatureCollection<
  Polygon | MultiPolygon,
  ParkPolygonProperties
>;

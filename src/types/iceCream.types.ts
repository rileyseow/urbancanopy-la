import type { FeatureCollection, Point } from 'geojson';

export type IceCreamProperties = {
  /**
   * Unique identifier for the ice cream shop
   * @example '7276249462'
   */
  id: string;

  /**
   * Name of the ice cream shop
   * @example 'Moo Moo Mia'
   */
  name?: string;

  /**
   * Opening hours of the ice cream shop
   * @example 'Mo-Th 00:00-22:00; Fr,Sa 11:00-23:00; Su 11:00-22:00'
   */
  opening_hours?: string;
};

export type IceCreamFC = FeatureCollection<
  Point,
  IceCreamProperties
>;

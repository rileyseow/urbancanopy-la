import type {
  FeatureCollection,
  MultiPolygon,
  Polygon,
} from 'geojson';

export type ShadeCoverageProperties = {
  /**
   * Unique identifier for the shade coverage polygon cell.
   * @example '8929124800bffff'
   */
  id: string;

  /**
   * Average building height in meters for the polygon cell.
   * @example 4.097274
   */
  avg_building_height_m: number;

  /**
   * Proportion of square area covered by building footprint
   * in the polygon cell.
   * @example 0.0251088758245022
   */
  building_coverage_ratio: number;

  /**
   * Aggregated score representing a weighted computation between
   * tree density, building coverage, and building height in the
   * polygon cell.
   */
  shade_score: number;

  /**
   * Number of estimated trees in the polygon cell.
   * @example 0
   */
  tree_count: number;
};

export type ShadeCoverageFC = FeatureCollection<
  Polygon | MultiPolygon,
  ShadeCoverageProperties
>;
